const source = $("#wonders-template").html()
const template = Handlebars.compile(source)
const dairyIngredients = $('#dairyIngredients')
const glutenIngredients = $('#glutenIngredients')

// console.log(dairyIngredients).is(':checked')
const render = function(wonders) {
    $("#wonders").empty()
    let newHtml = template({ wonders })
    $("#wonders").append(newHtml)
}

const fetch = function() {
    // $.get("/wonders", function(response) {
    //     render(response)
    // })
}

const getData = function() {
    const DairyIsCheck = dairyIngredients.is(':checked')
    const GlutenIsCheck = glutenIngredients.is(':checked')
    let searchFood = $("#Key-Food").val()
    if (searchFood) {
        $.get(`/wonder/${searchFood}/?dairy=${DairyIsCheck}&gluten=${GlutenIsCheck}`, function(response) {
            // console.log(response)
            render(response)
        })
    }

}
const Alert = function(ID) {

    const NEWID = $(ID).closest('div').children('ul').find("li:first").text()
    alert(NEWID);
    console.log(NEWID)
}



fetch() //load the data on page load