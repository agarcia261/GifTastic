$(document).ready(function() {

    var animalList=["monkey", "cats", "dogs"]
    var objresponse={};
    var favorites=[];
    var addingPhotos=false;
    var offset=0;

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
        
        if (!addingPhotos){
        var animal=$(this).attr("animal")
        var moreButton=$("#morePhotos")
        moreButton.attr("animal",animal)
        offset=0;
        }
        else{
            var animal=$(event).attr("animal")
        }

        var queryURL="https://api.giphy.com/v1/gifs/search?api_key=qlZbX0Qs6D9ngOxm7MgasFYS41eu86s7&q="+animal+"&limit=10&offset="+offset+"&rating=&lang=en"
        //var apiKey="qlZbX0Qs6D9ngOxm7MgasFYS41eu86s7"
    
        var apiReady=false;
    
    
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
            apiReady=true

            if(!addingPhotos){
                objresponse=response

                $(".gif-space").empty()
            }
            else{
                // console.log(objresponse.data)
                // console.log(response.data)
                for (var i=0; i<response.data.length; i++){
                objresponse.data.push(response.data[i])
                }
            }
            //  console.log(objresponse)

            addingPhotos=false;

            for (var i=0; i<response.data.length; i++){

                var imagesDiv = $("<div>");
                imagesDiv.addClass("card") //test

                var images = $("<img>");
                images.attr("src",response.data[i].images.fixed_height_still.url)
                images.attr("index",offset+i)
                images.attr("status","still")
                images.addClass("gif-img card-img-top")
                imagesDiv.append(images)

                var cardBody=$("<div>")
                cardBody.addClass("card-body")
                
                var cardTitle=$("<h4>");
                cardTitle.addClass("card-title")
                cardTitle.text(response.data[i].title);
                cardBody.append(cardTitle)

                var rating=$("<p>");
                rating.text("Rating: "+ response.data[i].rating)
                cardBody.append(rating)

                var favButton=$("<button>")
                favButton.addClass("btn btn-primary btn-favorite");
                favButton.attr("index",offset+i)
                favButton.text("Add to Favorites")
                cardBody.append(favButton);

                imagesDiv.append(cardBody)
                $(".gif-space").append(imagesDiv)

                $(".container-bottom").removeClass("hide")

    
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

    $(document).on("click", "#morePhotos", morePhotos);

    function morePhotos(event){
        offset+=10;
        addingPhotos=true;
        clickFunction(this)

    }
    $(document).on("click", ".btn-favorite", favoriteFnc);

    function favoriteFnc (event){
        var fav={
            stillImg:objresponse.data[index].images.fixed_height.url
        }
        favorites.push()

        console.log(this)

    }


   $(document).on("mouseover", ".btn-default", mouseOverFunction);
   $(document).on("mouseleave", ".btn-default", mouseLeaveFunction);

    function mouseOverFunction(){
        $(this).css("background-color", "gray");
    }
    function mouseLeaveFunction(){
        $(this).css("background-color", "white");
    }


});