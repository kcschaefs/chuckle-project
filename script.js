const splashButtons = $('.splash-buttons');
const splashContainer = $('.container');
const btnContainer = $('button-container');
const displayContainer = $('.display-container');
let favoriteIcon = $('<button class="favorite"><i class="fa-regular fa-heart favoriting-item">');
let emptyHeart;
let savedData = [];
let riddleContainer = $('.monica');
let modal = $('.modal');
let submitButton = $('.submit-button')


$("#fade").modal({
  fadeDuration: 1000
});

$(document).ready(function () {

  $(".monica").monica();



  /* Riddle API */
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
        emptyHeart = $('<a href="#ex1" rel="modal:open"> <img src="./assets/images/empty-heart.png">').attr('class', 'heart-empty')

        let apiQuestion = result[0].question;
        let apiAnswer = result[0].answer;

        let riddleObject = {};
        riddleObject["Question"] = apiQuestion;
        riddleObject["Answer"] = apiAnswer;

        // console.log(riddleObject);


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
        // console.log("got here");
        // console.log(newQuestion);
        // console.log(newAnswer);

        newQuestion.text("Question: " + apiQuestion);
        newAnswer.text("Answer: " + apiAnswer);

        savedData.push(apiQuestion + apiAnswer)
        // console.log(savedData);


      },
      error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
      }
    });


  }




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
        emptyHeart = $('<a href="#ex1" rel="modal:open"> <img src="./assets/images/empty-heart.png">').attr('class', 'heart-empty')
        const apiBucketItem = result.item
        let bucketGenerate = newBucketListItem.text(apiBucketItem)


        displayContainer.append(textContEl);
        textContEl.append(newDiv);
        newDiv.append(newBucketListItem);
        newBucketListItem.append(bucketGenerate);
        newBucketListItem.append(newParagraph);
        newParagraph.append(emptyHeart);

        savedData.push(apiBucketItem)

      },
      error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
      }
    });

  }

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
        emptyHeart = $('<a href="#ex1" rel="modal:open"> <img src="./assets/images/empty-heart.png">').attr('class', 'heart-empty')
        let apiJoke = result[randomJoke].joke;
        let jokeDisplay = newJoke.text(apiJoke);


        displayContainer.append(textContEl);
        textContEl.append(newDiv);
        newDiv.append(newJoke);
        newJoke.append(jokeDisplay);
        newJoke.append(emptyHeart);

        savedData.push(apiJoke);
        console.log(savedData);

      },
      error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
      }
    });

  }

  function removeContent () {
    displayContainer.empty();
  }

  splashContainer.on('click', splashButtons, function (e) {

    console.log(e.target.innerHTML)
    
    if (e.target.innerHTML === 'Riddle') {
      removeContent();
      generateRiddle();
    }

    else if (e.target.innerHTML === 'Bucket List') {
      removeContent();
      generateBucketListItem();
    }
    else if (e.target.innerHTML === 'Joke') {
      removeContent();
      generateJoke();
    }
  })

  submitButton.on('submit', function (e) {
    e.preventDefault();
    let inputField = $('#nameoffavorite');
    let saveID = inputField.val();
    localStorage = localStorage.setItem(saveID, (savedData.slice(-1)))
    console.log(localStorage);

    console.log(saveID);
  })



});