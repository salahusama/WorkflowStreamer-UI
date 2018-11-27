export function getHello(name) {
    const url = name ? `http://localhost/hello?name=${name}` : 'http://localhost/hello';
    return fetch(url);
}