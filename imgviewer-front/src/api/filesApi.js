const api = 'http://localhost:8080/api/files';

export function findAllFiles(fn) {
    return fetch(`${api}/findAll`)
        .then(r => r.json())
        .then(authorsResponse => fn(authorsResponse));
}

export function findFilesWithPaging(fn, page, size) {
    return fetch(`${api}/findAll/${page - 1}/${size}`)
        .then(r => r.json())
        .then(pageResp => fn(pageResp.content, pageResp.totalElements));
}

export function findFileById(fn, id) {
    return fetch(`${api}/findById/${id}`)
        .then(r => r.json())
        .then(resp => fn(resp));
}

export function findFilesByDirectoryName(fn, name) {
    return fetch(`${api}/findByDirectoryName/${name}`)
        .then(r => r.json())
        .then(resp => fn(resp));
}

export function findAllFilesByDirectoryId(fn, id) {
    return fetch(`${api}/findByDirectoryId/${id}`)
        .then(r => r.json())
        .then(resp => fn(resp));
}

export function findFilesByDirectoryId(fn, id, page, size) {
    return fetch(`${api}/findByDirectoryId/${id}/${page - 1}/${size}`)
        .then(r => r.json())
        .then(pageResp => fn(pageResp.content, pageResp.totalElements));
}


