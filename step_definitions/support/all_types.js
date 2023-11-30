// This file contains definitions for custom parameter types used in step definitions.
// Parameter type definitions have been consolidated here for easier reference and to avoid duplication.
// This should also make it easier to identify when refactoring/merging is appropriate.
// Comments indicate where the parameter type is used.

function transformToRegExp(keys){
    const escapedKeys = keys.map(key => key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    return new RegExp(`|${escapedKeys.join('|')}`)
}

function optionalRegExp(keys){
    const escapedKeys = keys.map(key => key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    return new RegExp(`(?: (${escapedKeys.join('|')}||))?`)
}

//Add any parameterTypes that are optional to this array
const optional_parameters = [ 'ordinal' ]

for (const key in window.parameterTypes) {

    if(optional_parameters.includes(key)) {
        defineParameterType({
            name: key,
            regexp: optionalRegExp(window.parameterTypes[key]),
        })
    } else {
        defineParameterType({
            name: key,
            regexp: transformToRegExp(window.parameterTypes[key]),
        })
    }
}