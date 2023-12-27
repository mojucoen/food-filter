const render = function(wonders) {
    $("#wonders").empty()
    let newHtml = template({ wonders })
    $("#wonders").append(newHtml)


}