const api = 'http://localhost:8080/api/directories';

export function findRootDir(fn) {
    return fetch(`${api}/findRoot`)
        .then(r => r.json())
        .then(resp => fn(resp));
}

export function refresh() {
    return fetch(`${api}/refresh`);
}


