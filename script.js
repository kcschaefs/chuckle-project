const splashButtons = $('.splash-buttons');
const splashContainer = $('.container');
const btnContainer = $('button-container');
const displayContainer = $('.display-container');
let favoriteIcon = $('<button class="favorite"><i class="fa-regular fa-heart favoriting-item">');
let emptyHeart;
let savedData = [];
let riddleContainer = $('.monica');
let modal = $('.modal');
let submitButton = $('#submit-button')
let chuckButton = $('#chuckbtn');
let chuckbtnContainer = $('.chuckbtnContainer');
let currentObject;
let objectType;
let storage;
let heartimage = $('#empty-heart')


$("#fade").modal({
  fadeDuration: 1000
});

$(document).ready(function () {

  $(".monica").monica();



  // riddle api and setup for serving -----------------------------------------------

  function generateRiddle() {

    $.ajax({
      method: 'GET',
      url: 'https://api.api-ninjas.com/v1/riddles',
      headers: { 'X-Api-Key': '+0PxVJIjNF1TF+7DUSNy0Q==tE7LgHYM0D9YIVed' },
      contentType: 'application/json',
      success: function (result) {
        console.log(result);

        riddleContainer.removeClass('hide');
        textContEl = $("<div class='textContEl'>");
        const newQuestionContainer = $('<div class="monica display-item">');
        const newQuestionItem = $('<h3 class="monicaTitle">');
        let newQuestion = $('<div class="monicaContent" id="question">');
        let newAnswer = $('<p id="answer">');
        buttonEl = $('<input/>').attr({
          type: "button",
          // class: "splash-buttons",
          id: "answerBtn",
          value: "show answer",
        });
        emptyHeart = $('<a href="#ex1" rel="modal:open"> <img id="empty-heart" src="./assets/images/empty-heart.png">').attr('class', 'heart-empty')

        let apiQuestion = result[0].question;
        let apiAnswer = result[0].answer;

        let riddleObject = {};
        riddleObject["Question"] = apiQuestion;
        riddleObject["Answer"] = apiAnswer;
        currentObject = riddleObject;


        displayContainer.append(textContEl);
        textContEl.append(newQuestionContainer);

        newQuestionContainer.append(newQuestionItem);
        newQuestionContainer.append(newQuestion);
        newQuestionContainer.append(buttonEl);


        buttonEl.on('click', buttonEl, function (e) {
          newQuestionContainer.append(newAnswer);
          newQuestionContainer.append(emptyHeart);
          buttonEl.hide();
        });

        newQuestion.text(apiQuestion);
        newAnswer.text("Answer: " + apiAnswer);

        savedData.push(apiQuestion + apiAnswer)

      },
      error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
      }
    });


  }

  // bucket list api and setup for serving -----------------------------------------------

  function generateBucketListItem() {

    $.ajax({
      method: 'GET',
      url: 'https://api.api-ninjas.com/v1/bucketlist',
      headers: { 'X-Api-Key': '+0PxVJIjNF1TF+7DUSNy0Q==tE7LgHYM0D9YIVed' },
      contentType: 'application/json',
      success: function (result) {
        console.log(result);

        textContEl = $("<div class='textContEl'>");
        const newDiv = $('<div class=display-item>')
        const newBucketListItem = $('<div class=bucketlistItem>')
        const newParagraph = $('<p>');
        emptyHeart = $('<a href="#ex1" rel="modal:open"> <img id="empty-heart" src="./assets/images/empty-heart.png">').attr('class', 'heart-empty')
        const apiBucketItem = result.item
        let bucketGenerate = newBucketListItem.text(apiBucketItem)
        currentObject = apiBucketItem;


        displayContainer.append(textContEl);
        textContEl.append(newDiv);
        newDiv.append(newBucketListItem);
        newBucketListItem.append(bucketGenerate);
        newBucketListItem.append(newParagraph);
        newParagraph.append(emptyHeart);

        // savedData.push(apiBucketItem)

      },

    });

  }

  // joke api and setup for serving -----------------------------------------------

  function generateJoke() {

    var limit = 20;
    $.ajax({
      method: 'GET',
      url: 'https://api.api-ninjas.com/v1/jokes?limit=' + limit,
      headers: { 'X-Api-Key': '+0PxVJIjNF1TF+7DUSNy0Q==tE7LgHYM0D9YIVed' },
      contentType: 'application/json',
      success: function (result) {
        console.log(result);

        textContEl = $("<div class='textContEl'>");
        const newDiv = $('<div class=display-item>');
        const newJoke = $('<div class=joke-item>');
        let randomJoke = Math.floor(Math.random() * result.length)
        emptyHeart = $('<a href="#ex1" rel="modal:open"> <img id="empty-heart" src="./assets/images/empty-heart.png">').attr('class', 'heart-empty')
        let apiJoke = result[randomJoke].joke;
        let jokeDisplay = newJoke.text(apiJoke);
        currentObject = apiJoke;

        displayContainer.append(textContEl);
        textContEl.append(newDiv);
        newDiv.append(newJoke);
        newJoke.append(jokeDisplay);
        newJoke.append(emptyHeart);

      },
      error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
      }
    });

  }

  // chuckle serving --------------------------------------------------------------

  function removeContent() { // removes any served content
    displayContainer.empty();
  }

  splashContainer.on('click', splashButtons, function (e) {

    // console.log(e.target.innerHTML)
    
    if (e.target.innerHTML === 'Riddle') {  // serves riddle
      removeContent();
      generateRiddle();
      objectType = "Riddle";
    }

    else if (e.target.innerHTML === 'Bucket List') {  // serves bucket list item
      removeContent();
      generateBucketListItem();
      objectType = "Bucket List";
    }
    else if (e.target.innerHTML === 'Joke') {  //serves joke
      removeContent();
      generateJoke();
      objectType = "Joke";
    }
  })

  // local storage setting ------------------------------------------------------

  let savedData = JSON.parse(localStorage.getItem('savedData'));

  submitButton.on('click', function (e) { // adds the current fact/joke to local storage
    e.preventDefault();
    let inputField = $('#nameoffavorite');
    let saveID = inputField.val();

    storage = JSON.parse(localStorage.getItem('savedData'));

  if (!storage) { // checks to see if there is anything in local storage first
    storage = []; // creates an object for local strorage if none exists
  };


    storage.push({ // adds new favorites to local storage in the format needed to serve the favorites cards
      type: objectType,
      name: saveID,
      value: currentObject
    })
    localStorage.setItem("savedData", JSON.stringify(storage));

    $.modal.close();

  });

  // chuck norris easter egg functionality ------------------------------------------------------

  function play() {

    var audioTag = $("#audio")
    console.log(audioTag)
    audio.play();
    chuckButton.replaceWith('<img src="./assets/images/chuck-image.png">')
  }

  chuckButton.on('click', function () {
    play();

  })

  chuckbtnContainer.hover(
    function () {
      chuckButton.attr('style', 'visibility:visible');
    })


});