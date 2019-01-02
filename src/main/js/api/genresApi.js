const api = '/api';

export function findAllGenres(fn) {
    return fetch(`${api}/genres/findAll`)
        .then(r => r.json())
        .then(genresResponse => fn(genresResponse));
}


