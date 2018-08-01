
    var topics = ["AH! Real Monsters",
                "Tales from the Crypt",
                "The Comeback",
                "Seinfeld",
                "Married With Children",
                "Daria",
                "South Park",
                "American Dad",
                "Family Guy",
                "Keenan and Kel",
                "Strangers With Candy",
                ];

    var images = ['./assets/images/AH_Real_Monsters.jpg',
                './assets/images/Tales_from_the_Crypt.jpg',
                './assets/images/The_Comeback.jpg',
                './assets/images/Seinfeld.jpg',
                './assets/images/Married_with_Children.jpg',
                './assets/images/Daria.jpg',
                './assets/images/South_Park.jpg',
                './assets/images/American_Dad.png',
                './assets/images/Family_Guy.jpg',
                './assets/images/Kenan_&_Kel.jpg',
                './assets/images/Strangers_with_candy.jpg'


    ];

    function addButton() {       
        $('#goingBack').hide();
        $('#buttons').empty();
        
        
        for(i=0; i < topics.length; i++) {

            var _buttons = $('<button>')
            _buttons.attr('class', 'btn') 
                .attr('data-name', topics[i])
                .attr({'data-index': i , 'id' : "animate" + i})
                .css('backgroundImage', `url(${ images[i]})`)
                
                $("#buttons").append(_buttons);
        }   
    }

    

    var favGifs = JSON.parse(localStorage.getItem('favGifs'));
    console.log(favGifs)
    

    // is object is not in the array push is to favorites array
    if (!Array.isArray(favGifs)) {
        favGifs = [];
    } 

    function fetchTopicGifs() {
        $('#hideMe').hide();
        $("#buttons").hide();
        $('#goingBack').show();
        $('.info').empty()
        
        console.log($(this).attr('data-name'));
        var allTogetherNow = $(this).attr('data-name')
        var topicStr = allTogetherNow.split(" ").join("+");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            topicStr + "&limit=21&api_key=XAXqTAuxc8P2yIRLmR7qZ5yjXFjjnE6x";
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            
            for(i=0; i < response.data.length; i++) {
                // $('.info').show();

                var _rating = response.data[i].rating
                var _title = response.data[i].title
                var _trendingDateTime = response.data[i].trending_datetime

                var _starGif = $('<button type="button" class="starGif"><i class="fas fa-star"></i></button>')
                var _dataDiv = $('<div>')
                var _image = $('<img>').addClass('images')
                var _paragraph = $('<p>Rating: ' + _rating + '--Title: ' + _title + '--Trending datetime: ' + _trendingDateTime + '</p>').addClass('words')

                _dataDiv.addClass('gifs')
                _dataDiv.append(_image, _paragraph, _starGif)
                _image.attr('src', response.data[i].images.fixed_height_still.url)
                        .attr('data-still', response.data[i].images.fixed_height_still.url)
                        .attr({'data-index': i , 'id' : "animateImage" + i , 'data-animate': response.data[i].images.fixed_height.url})
                        .attr("data-state", "still");
                _starGif.attr('data-still', response.data[i].images.fixed_height_still.url)
                        .attr('data-animate',response.data[i].images.fixed_height.url)

                $('.info').append(_dataDiv)
            }
        })
    }

    $(document).on('click', '.starGif', function() {
        newFav = {'data-still': $(this).attr('data-still'), 'data-animate':$(this).attr('data-animate')}
        console.log($(this).attr('data-still'))
        favGifs.push(newFav)
        localStorage.setItem('favGifs',JSON.stringify(favGifs))
    });

    $('#favorites').on('click', function() {
        $('#hideMe').hide();
        $("#buttons").hide();
        $('#goingBack').show();
        console.log("clicked")
        $('.info').empty()
        for(var j=0; j < favGifs.length; j++ ) {
            console.log(favGifs[j])
            console.log(j)
            var _dataDiv = $('<div>')
            var _image = $('<img>').addClass('images')

            _dataDiv.append(_image)

            _image.attr('src', favGifs[j]['data-still'])
                            .attr('data-still', favGifs[j]['data-still'])
                            .attr('data-animate', favGifs[j]['data-animate'])
                            .attr("data-state", "still");
            $('.info').append(_image) 
        }
    })

    function animateTopicGifs() {

        var state = $(this).find('img').attr('data-state');

        if(state === "still") {
            $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
            $(this).find("img").attr("data-state", "animate");
        } else {
            $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
            $(this).find("img").attr("data-state", "still");
        }
    }

    $('.changeNow').on('click', function() {
        event.preventDefault();

        var userGuess = $('.whatDoYouGot').val().trim();
        hideMe.reset();
        topics.push(userGuess);
        $('#buttons').empty();

         for(i=0; i < topics.length; i++) {

            var _buttons = $('<button>')
            _buttons.attr('class', 'btn') 
                .attr('data-name', topics[i])
                .attr({'data-index': i , 'id' : "animate" + i})
                .css('backgroundImage', `url("${images[i]}")`)

                if (i == topics.length-1) { 
            

                var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                userGuess + "&limit=12&api_key=XAXqTAuxc8P2yIRLmR7qZ5yjXFjjnE6x";


                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function(response) {

                    console.log("line 112 " + response.data[3].images.fixed_height_still.url);

                    var urlI = response.data[0].images.fixed_height_still.url;
                    images.push(urlI);
                    
                    _buttons.css("background", `url("${urlI}")`);
                        
                });
            }

        $("#buttons").append(_buttons);
            

    }
        return false;  
    })

  
    addButton();
    $(document).on('click', '.btn', fetchTopicGifs);
    $(document).on('click', '.gifs', animateTopicGifs);
    $(document).on('click', '#goingBack', function() {
        // window.history.back(-1);
        $('#buttons').show(3000);
        $('.gifs').addClass('animated flipOutY').hide(1500);
        $('.gifs').show();
        $('#goingBack').hide();
        $('#hideMe').show(); 
        $('.images').hide(2000);  
    })

    
    

    
    


// create an array called topics holding strings of topics im interested in
// 10 buttons need to be created
// gifs are displayed when button is clicked
// button displays 10 gifs according to what the button says
// gifs are paused when loaded and when clicked, animate, and then clicked again, pause
// images are cleared when you click new button 
// $(document).ready(function() {




            