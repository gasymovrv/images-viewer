const api = '/api';

export function findAllAuthors(fn) {
    return fetch(`${api}/authors/findAll`)
        .then(r => r.json())
        .then(authorsResponse => fn(authorsResponse));
}

export function findAuthorsWithPaging(fn, page, size) {
    return fetch(`${api}/authors/findAll/${page - 1}/${size}`)
        .then(r => r.json())
        .then(authorsPageResponse => fn(authorsPageResponse.content, authorsPageResponse.totalElements));
}

export function findAuthorById(fn, id) {
    return fetch(`${api}/authors/findById/${id}`)
        .then(r => r.json())
        .then(authorResponse => fn(authorResponse));
}

export function saveOrUpdateAuthor(author, okFn, errFn) {
    let options = {
        method: 'POST',//тип запроса
        headers: {
            'Content-Type': 'application/json', //отправляемый тип
            'Accept': 'application/json' //принимаемый тип (из контроллера)
        },
        body: JSON.stringify(author)//отправляемое отсюда (Request)
    };
    return fetch(`${api}/authors/save`, options)
        .then((response) => {
            if (response.status === 200) {
                okFn();
            } else {
                console.log(response);
                errFn();
            }
        })
        .catch((err) => {
            console.log(err);
            errFn();
        });
}

export function deleteAuthorById(id, okFn, errFn) {
    return fetch(`${api}/authors/deleteById/${id}`, {method: 'DELETE'})
        .then((response) => {
            if (response.status === 200) {
                okFn();
            } else {
                console.log(response);
                errFn();
            }
        })
        .catch((err) => {
            console.log(err);
            errFn();
        });
}


