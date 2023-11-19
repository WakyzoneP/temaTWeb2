/**
 * the function renders an object to a tagged string and performs token substitution
 * @param {object} input - a javascript object representing a hierachycal structure  
 * @param {object} values - a list of key value pairs where the key is a token to be replaced with the value in strings present in input
 */

function render(input, values){
    if (typeof input !== 'object' || typeof values !== 'object') {
        throw new Error('InvalidType');
    }
    if (Object.keys(input).length === 0) {
        return '';
    }
    let result = '';
    for (let key in input) {
        if (typeof input[key] === 'object') {
            result += `<${key}>${render(input[key], values)}</${key}>`;
        } else {
            let value = input[key];
            for (let token in values) {
                value = value.replace('${' + token + '}', values[token]);
            }
            result += `<${key}>${value}</${key}>`;
        }
    }
    return result;
    
}

module.exports = {
    render
}