const api = 'http://localhost:8080/api/directories';

export function findRootDir(fn) {
    return fetch(`${api}/findRoot`)
        .then(r => r.json())
        .then(resp => fn(resp))
        .catch(() => fn(null));
}

export function refresh() {
    return fetch(`${api}/refresh`);
}

export function setRootDir(path, preloadFn, okFn, errFn) {
    const encodePath = encodeURI(path);
    preloadFn();
    return fetch(`${api}/setRoot?path=${encodePath}`,{ method: 'POST' })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                console.log(response);
                errFn();
            }
        })
        .then((result)=>{
            console.log(result);
            if(result){
                okFn();
            } else {
                errFn();
            }
        })
        .catch((err) => {
            console.log(err);
            errFn();
        });
}


