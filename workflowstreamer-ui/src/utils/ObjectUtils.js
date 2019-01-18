export function removeNull(obj) {
    let newObj = {};
    for (var propName in obj) {
        if (obj[propName] !== null || obj[propName] !== undefined) {
            newObj[propName] = obj[propName];
        }
    }
    return newObj;
}
