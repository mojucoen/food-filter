let data
const getData = function() {
    const DairyIsCheck = dairyIngredients.is(':checked')
    const GlutenIsCheck = glutenIngredients.is(':checked')
    let searchFood = $("#Key-Food").val()

    $.get(`/wonder/${searchFood}/?dairy=${DairyIsCheck}&gluten=${GlutenIsCheck}`, function(response) {


    }).then((response) => {
        render(response)
            // Expected output: 123
    });


    return data
}