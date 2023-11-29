// This file contains definitions for custom parameter types used in step definitions.
// Parameter type definitions have been consolidated here for easier reference and to avoid duplication.
// This should also make it easier to identify when refactoring/merging is appropriate.
// Comments indicate where the parameter type is used.

function transformToRegExp(keys){
    const escapedKeys = keys.map(key => key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    return new RegExp(`|${escapedKeys.join('|')}`)
}

// defineParameterType({
//     name: 'ordinal',
//     regexp: /(?: (first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|last||))?/,
// })

for (const key in window.parameterTypes) {
    defineParameterType({
        name: key,
        regexp: transformToRegExp(window.parameterTypes[key]),
    })
}