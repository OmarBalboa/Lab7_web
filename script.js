var temas = ['Soccer', 'Basketball', 'Football', 'Golf', 'Box', 'Tenis', 'UFC'];

$(document).ready(function() {
    for (var i = 0; i < temas.length ; i++){
        $("#animal-buttons").append(`<button id= ButtonTheme>${temas[i]}</button>`);
    }
});

var api = "https://api.giphy.com/v1/gifs/search?";
var apiKey = "&api_key=aAZYxW8ThNhcV2OfLXhIjATDB2FANSdL";
var limit = "&limit=10"

var animal_in = "#animal-input";
var animals = "#animals";

$("#add-animal").on("click", function(event) {
    event.preventDefault();
    if (!temas.includes($(animal_in).val()) && $(animal_in).val() != "" ){
        $("#animal-buttons").append(`<button id= ButtonTheme>${$("#animal-input").val()} </button>`);
    }

    if ($(animal_in).val() != "" ){
        $(animals).html("");
        temas.push($(animal_in).val());
        var url = api + "&q=" + $(animal_in).val() + apiKey + limit;
        $.get(url, function(giphy){
            for (var i = 0; i < giphy.data.length; i++){
                $(animals).append(`<div class= "animal-item"><p> rating: ${giphy.data[i].rating}</p><img src= ${giphy.data[i].images.fixed_height_still.url} static_url= ${giphy.data[i].images.fixed_height_still.url} moving_url= ${giphy.data[i].images.fixed_height.url} id="imgGiphy"></div>`);
            }
        });
    }
});

$(document).on("click", "#imgGiphy", function(event) {
    $(this).attr("moving_url") == $(this).attr("src") ? $(this).attr("src", $(this).attr("moving_url")) : $(this).attr("src", $(this).attr("static_url"));
});


$(document).on("click", "#ButtonTheme", function(event) {
    event.preventDefault();
    $(animals).html("");
    var url = api + "&q=" + $(this).text() + apiKey + "&limit=10";
    $.get(url, function(giphy){
        for (var i = 0; i < giphy.data.length; i++){
            $(animals).append(`<div class= "animal-item"><p> rating: ${giphy.data[i].rating}</p><img src= ${giphy.data[i].images.fixed_height_still.url} static_url= ${giphy.data[i].images.fixed_height_still.url} moving_url= ${giphy.data[i].images.fixed_height.url} id="imgGiphy"></div>`);
        }
    });
});