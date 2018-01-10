//global var
const animals = ["zebra", "giraffe", "squirrel", "robin"];
const url = "";

//get new animal buttons
let renderButtons = function(animals){
    animals.forEach(function(val){
        let animalButton = $("<button>");
        animalButton.addClass("abtn");
        animalButton.attr("data", val);
        animalButton.text(val);
        $("#animal-buttons").append(animalButton);
    });
};

//load initial animal buttons
renderButtons(animals);

// add new animal button
$("#add-animal").on("click", function(event){
    event.preventDefault();
    let input = $("#animal-input").val();
    animals.push(input);
    $("#animal-buttons").empty();
    $("#animal-input").val("");
    renderButtons(animals);
})

// get animal pictures
// event delegation learned via James Winkle
$("#animal-buttons").on("click", ".abtn", function(){
    $("#animals").empty();
    let clickedVal = $(this).attr("data");
    let apiKey = "3qFIQ5u6fV7RysfU647X93j41TB8iLYo";
    let baseURL = `https://api.giphy.com/v1/gifs/search?q=${clickedVal}&api_key=${apiKey}&limit=10`;

    $.ajax({
        method: "get",
        url: baseURL,
        success: function (response) {
            console.log(response);
            response.data.forEach(function(val, index){
                let rating = response.data[index].rating;
                let newDiv = $("<div>");
                newDiv.addClass("imgDiv");
                newDiv.html(`Rating: ${rating}<br>`);
                let newImg = $("<img>");
                newImg.addClass("giphy");
                newImg.attr("src", response.data[index].images.original_still.url);
                newImg.attr("still", response.data[index].images.fixed_height.url);
                newImg.attr("alt", response.data[index].title)
                newDiv.append(newImg);
                $("#animals").prepend(newDiv);
            });
        },
        error: function (error) {
            alert("Sorry - something has gone wrong.");
        } 
    });
});

// Swap URLs (play and stop gif)
// images not present at time of page load - so had to use event delegation
$('body').on('click','img.giphy',function(event){
    let swapURL = $(this).attr("still");
    $(this).attr("still", $(this).attr("src"));
    $(this).attr("src", swapURL);
});


