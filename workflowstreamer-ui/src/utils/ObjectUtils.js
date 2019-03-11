export function removeNull(obj) {
    let newObj = {};
    for (var propName in obj) {
        if (obj[propName] !== null || obj[propName] !== undefined) {
            newObj[propName] = obj[propName];
        }
    }
    return newObj;
}

export function removeElementByKey(obj, key) {
    const clone = {...obj};
    delete clone[key];
    return clone;
}
