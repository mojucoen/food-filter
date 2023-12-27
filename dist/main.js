const source = $("#wonders-template").html()
const template = Handlebars.compile(source)
const dairyIngredients = $('#dairyIngredients')
const glutenIngredients = $('#glutenIngredients')
const SUB_STR = 'check out this recipe: '
const BOD_STR = 'you can see the recipe in this video '
const Alert = function(ID) {

    const NEWID = $(ID).closest('div').children('ul').find("li:first").text()
    alert(NEWID);
    console.log(NEWID)
}
const getEmail = function(ID) {
    const SUBJECT = $(ID).closest('div').children('ul').find("li:first").text()
    const VID_LINK = $(ID).attr('id')
    window.open(
        `mailto:sales@sender.net?subject=${SUB_STR+SUBJECT}&body=${BOD_STR} ${VID_LINK}%0A`
    );
}