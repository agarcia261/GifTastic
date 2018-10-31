$(document).ready(function() {

    var queryURL="https://api.giphy.com/v1/gifs/search?api_key=qlZbX0Qs6D9ngOxm7MgasFYS41eu86s7&q=monkey&limit=25&offset=0&rating=G&lang=en"
    //var apiKey="qlZbX0Qs6D9ngOxm7MgasFYS41eu86s7"

    var apiReady=false;


    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        apiReady=true
        console.log(response)
        for (var i=0; i<response.data.length; i++){
            var imagesDiv = $("<div>");
            var rating=$("<p>");
            rating.text("Rating: "+ response.data[i].rating)
            imagesDiv.append(rating)
            var images = $("<img>");
            images.attr("src",response.data[i].images.fixed_height.url)
            images.addClass("gif-img")
            imagesDiv.append(images)
            $(".gif-space").append(imagesDiv)

        }

    });

    $(document).on("click", ".answerbtn", ansFunction);

    function ansFunction(){
        stopwatch.inBetQuestions=true
        questionObj.verifyAnswer(this)
    }

    $(document).on("click", ".restart-questions", restartGame);

    function restartGame(){

        questionObj.restartQuestions()
    }

   $(document).on("mouseover", ".button", mouseOverFunction);
   $(document).on("mouseleave", ".button", mouseLeaveFunction);

    function mouseOverFunction(){
        $(this).css("background-color", "gray");
    }
    function mouseLeaveFunction(){
        $(this).css("background-color", "white");
    }


});