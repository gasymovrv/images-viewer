const api = '/api';

export function createNewUser(user) {
    let options = {
        method: 'POST',//тип запроса
        headers: {
            'Content-Type': 'application/json', //отправляемый тип
            'Accept': 'application/json', //принимаемый тип (из контроллера)
        },
        body: JSON.stringify(user)
    };
    return fetch(`${api}/users/registration`, options);
}

export function loginUser(email, password) {
    let options = {
        method: 'GET',//тип запроса
        headers: {
            'Content-Type': 'application/json', //отправляемый тип
            'Accept': 'application/json', //принимаемый тип (из контроллера)
            'Authorization': 'Basic ' + window.btoa(email + ':' + password)
        },
    };
    return fetch(`${api}/users/login`, options)
}

export function logoutUser() {
    return fetch(`${api}/users/logout`);
}

export function getLocalCurrentUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    // consoleLogObjectStandart('user',user,getLocalCurrentUser)
    return user;
}

export function setLocalCurrentUser(user) {
    if (user == null) {
        localStorage.setItem('user', null);
    } else {
        localStorage.setItem('user', JSON.stringify(user));
    }
}

/**
 * Проверяем авторизацию для случая,
 * если на клиенте объект user имеется,
 * а на сервере он не авторизован
 */
export function checkAuthorization() {
    userIsAuthorize(respResult => {
        if (!respResult) {
            setLocalCurrentUser(null);
            logoutUser();
        }
    });
}


function userIsAuthorize(fn) {
    const user = getLocalCurrentUser();
    if (user) {
        fetch(`${api}/users/userIsAuthorize?email=${user.email}`)
            .then(r => r.json()).then((respResult=>fn(respResult)))
    }
}

export function isAdmin() {
    return findRole('ADMIN');
}

export function isAuthorizeUser() {
    return findRole('ROLE_USER') && !findRole('ADMIN');
}

function findRole(role) {
    let result = false;
    let user = getLocalCurrentUser();
    if (user) {
        if (user.roles) {
            user.roles.forEach((elem) => {
                if (elem.role === role) result = true;
            })
        }
    }
    return result;
}


