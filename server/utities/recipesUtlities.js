// // const { consts } = require('../../config')
// const dummyData = consts.dummyDataRecipesOil.results
// const sensitivesMap = consts.sensitives

// class SenstivityUltities {

//     static filterRecipesBySensitivites(arrSenstivities, recipes) {
//         return recipes.filter((recipe) => !this.isContainingSensntivites(arrSenstivities, recipe))
//     }

//     static isContainingSensntivites = (arrSenstivities, recipe) => {

//         for (let ingredient of recipe.ingredients) {
//             if (this.isIngredientContainSensntivity(ingredient, arrSenstivities)) {
//                 return true
//             }
//         }
//         return false
//     }

//     static isIngredientContainSensntivity = (ingredient, arrSenstivities) => {
//         for (let sesntivity of arrSenstivities) {
//             if (sensitivesMap[sesntivity].includes(ingredient)) {
//                 return true
//             }
//         }
//         return false
//     }

// }

// module.exports = SenstivityUltities