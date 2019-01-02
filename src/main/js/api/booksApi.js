const api = '/api';

export function findAllBooks(fn) {
    return fetch(`${api}/books/findAll`)
        .then(r => r.json())
        .then(booksResponse => fn(booksResponse));
}

export function findBooksWithPaging(fn, page, size) {
    return fetch(`${api}/books/findAll/${page - 1}/${size}`)
        .then(r => r.json())
        .then(booksPageResponse => fn(booksPageResponse.content, booksPageResponse.totalElements));
}

export function findBookById(fn, id) {
    return fetch(`${api}/books/findById/${id}`)
        .then(r => r.json())
        .then(bookResponse => fn(bookResponse));
}

export function deleteBookById(id, okFn, errFn) {
    return fetch(`${api}/books/deleteById/${id}`, {method: 'DELETE'})
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


