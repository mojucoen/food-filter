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
let newData = []
let data
let gifURL = []
const filterFun = function(arrCcomp, dataComp1) {
    newData = []
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
const searchFUN = function(DATAs) {
    for (let index in DATAs) {
        const Data = DATAs[index]
        S_TITLE = Data.title
        getGIF(S_TITLE)
        console.log(x)
        newData.push({ idMeal: Data.idMeal, ingredients: Data.ingredients, title: Data.title, thumbnail: Data.title, href: Data.href })


    }
}


const getGIF = function(S_TITLE) {
    axios.get(`https://api.giphy.com/v1/gifs/search?api_key=MIaDJvzjhpZAh2WmmW7hPvWW5t10WFci&q=${S_TITLE}&limit=1&offset=0&rating=g&lang=en&bundle=messaging_non_clips`).then(resp => {

        return axios.get(`https://api.giphy.com/v1/gifs/search?api_key=MIaDJvzjhpZAh2WmmW7hPvWW5t10WFci&q=${S_TITLE}&limit=1&offset=0&rating=g&lang=en&bundle=messaging_non_clips`)

    })




}

router.get('/wonder/:name', function(req, res) {
    const wonder = req.params.name
    const DAIRY = req.query.dairy
    const GLUTEN = req.query.gluten

    if (wonder) {
        axios.get(`https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/${wonder}`).then(resp => {
            data = resp.data.results

            // console.log(data)
            newData = []
            if (GLUTEN == 'false' && DAIRY == 'true') {
                filterFun(dairyIngredientsToLowCase, data)
                res.send(newData)

            } else if (GLUTEN == 'true' && DAIRY == 'false') {
                filterFun(glutenIngredientsToLowCase, data)
                res.send(newData)

            } else if (GLUTEN == 'true' && DAIRY == 'true') {
                let dataComp1 = filterFun(glutenIngredientsToLowCase, data)
                newData = []
                filterFun(dairyIngredientsToLowCase, dataComp1)
                res.send(newData)

            } else if (GLUTEN != 'true' && DAIRY != 'true') {
                searchFUN(data)
                res.send(newData)



            }

        })
    }
})
module.exports = router