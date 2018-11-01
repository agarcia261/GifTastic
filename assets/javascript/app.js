$(document).ready(function() {

    var animalList=["monkey", "cats", "dogs"]
    var objresponse={}
    addNewButton();

    function addNewButton(){
        $(".buttons").empty()

        for (var i= 0; i<animalList.length; i++){

            var button = $("<button>")
            button.addClass("buttonsClass btn btn-default")
            button.attr("animal",animalList[i])
            button.text(animalList[i])
            $(".buttons").append(button)
        }
    }

    $(document).on("click", ".buttonsClass", clickFunction);

    function clickFunction(event){
        var animal=$(this).attr("animal")
        var queryURL="https://api.giphy.com/v1/gifs/search?api_key=qlZbX0Qs6D9ngOxm7MgasFYS41eu86s7&q="+animal+"&limit=10&offset=0&rating=G&lang=en"
        //var apiKey="qlZbX0Qs6D9ngOxm7MgasFYS41eu86s7"
    
        var apiReady=false;
    
    
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {

            objresponse=response
            apiReady=true

            $(".gif-space").empty()

            for (var i=0; i<response.data.length; i++){

                var imagesDiv = $("<div>");
                var rating=$("<p>");
                rating.text("Rating: "+ response.data[i].rating)
                imagesDiv.append(rating)

                var images = $("<img>");
                images.attr("src",response.data[i].images.fixed_height_still.url)
                images.attr("index",i)
                images.attr("status","still")
                images.addClass("gif-img")
                imagesDiv.append(images)
                $(".gif-space").append(imagesDiv)
    
            }
    
        });
    }

    $(document).on("click", "#submit-button", addButton);

    function addButton(event){
        event.preventDefault()
        if (animalList.indexOf($("#form-input").val().trim())==-1){
        animalList.push($("#form-input").val().trim())
        addNewButton();
        }
        else{
            alert($("#form-input").val() + " already exist")
        }
        $("#form-input").val("")

    }

    $(document).on("click", ".gif-img", gifControl);

    function gifControl(event){

        var index=Number($(this).attr("index"))
        if($(this).attr("status")=="still"){
            $(this).attr("src",objresponse.data[index].images.fixed_height.url)
            $(this).attr("status","animated")

        }
        else{
            $(this).attr("src",objresponse.data[index].images.fixed_height_still.url)
            $(this).attr("status","still")


        }

    }


   $(document).on("mouseover", ".btn", mouseOverFunction);
   $(document).on("mouseleave", ".btn", mouseLeaveFunction);

    function mouseOverFunction(){
        $(this).css("background-color", "gray");
    }
    function mouseLeaveFunction(){
        $(this).css("background-color", "white");
    }


});