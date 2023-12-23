const express = require('express')
const router = express.Router()
const axios = require('axios');
const dairyIngredients = ["Cream", "Cheese", "Milk", "Butter", "Creme", "Ricotta", "Mozzarella", "Custard", "Cream Cheese"]
const glutenIngredients = ["Flour", "Bread", "spaghetti", "Biscuits", "Beer"]
const dairyIngredientsToLowCase = dairyIngredients.map(element => {
    return element.toLowerCase();
});
const glutenIngredientsToLowCase = glutenIngredients.map(element => {

    return element.toLowerCase();
});

router.get('/wonder/:name', function(req, res) {
    const wonder = req.params.name
    const DAIRY = req.query.dairy
    const GLUTEN = req.query.gluten
    if (wonder) {
        axios.get(`https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/${wonder}`).then(resp => {
            let data = resp.data.results
            let newData = []

            const filterFun = function(arrCcomp, dataComp1) {
                newData = []
                console.log(dataComp1)
                for (let index in dataComp1) {
                    const Data = dataComp1[index]

                    let found
                    let count = true

                    arrCcomp.forEach((e) => {

                        found = Data.ingredients.map(element => {

                            return element.toLowerCase();
                        });
                        found = found.find((el) => el == e);
                        if (found) {
                            count = false
                        }
                    })
                    if (count) {
                        newData.push({ idMeal: Data.idMeal, ingredients: Data.ingredients, title: Data.title, thumbnail: Data.thumbnail, href: Data.href })

                    }


                }
                return newData
            }


            if (GLUTEN == 'false' && DAIRY == 'true') {
                filterFun(dairyIngredientsToLowCase, data)
                res.send(newData)

            } else if (GLUTEN == 'true' && DAIRY == 'false') {
                filterFun(glutenIngredientsToLowCase, data)
                res.send(newData)

            } else if (GLUTEN == 'true' && DAIRY == 'true') {
                let dataComp1 = filterFun(glutenIngredientsToLowCase, data)
                newData = []
                    // console.log(newData)
                console.log(dataComp1)
                filterFun(dairyIngredientsToLowCase, dataComp1)
                res.send(newData)

            } else if (GLUTEN != 'true' && DAIRY != 'true') {
                for (let index in data) {
                    const Data = data[index]
                    newData.push({ idMeal: Data.idMeal, ingredients: Data.ingredients, title: Data.title, thumbnail: Data.thumbnail, href: Data.href })
                }
                res.send(newData)

            }



            // console.log(newData)


        })
    }
})
module.exports = router