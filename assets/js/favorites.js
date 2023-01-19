let favoriteContainer = $('.favoriteContainer');
let storageItems = JSON.parse(localStorage.getItem('savedData'));
let clearButton = $('.clear');
let bgImage = $('.bgimg');
let createBody;


$(document).ready(function () {

  if (storageItems !== null) {
  for (let i = 0; i < storageItems.length; i++) {
    
  let createCard = $('<div class="card card-target col-lg-3 col-md-4 col-12 px-2 m-2 animate__animated animate__bounce">').attr({id: 'card' + i}).attr('style', 'width:18rem').attr('style', 'height:400px; font-size:1.5rem');
  createBody = $('<div class="card-body">').attr({id: 'body' + i}).attr('style', 'padding:50px;');
  let h5Title = $('<h5 class="card-title">').attr({id: 'title' + i});
  let cardText = $('<p class="card-text">').attr({id: 'text' + i});
  let clearButtons = $('<button class="btn btnClearItem">').text("Clear Item");
  // let cardTarget = $('.card-target');

  favoriteContainer.append(createCard);
  createCard.append(h5Title); 
  createCard.append(createBody);
   // This seems to have an issue
  createCard.append(cardText); //This seems to have an issue
  createCard.append(clearButtons);

  console.log(storageItems[i]);
  createCard.on('click', '.btnClearItem', function (e) {
    console.log(e.target);
    
    const newList = storageItems.filter((item) => item !== storageItems[i]);
    console.log(storageItems[i])
    localStorage.setItem('savedData', JSON.stringify(newList));
    console.log(newList);
    console.log(storageItems)
    createCard.remove();

     })


 if (storageItems[i].type !== "Riddle") {
  $('#title' + i).text(storageItems[i].name);
  $('#body' + i).text(storageItems[i].value)
 // $('#title' + i).text(storageItems[i].value)
}
else {
  $('#title' + i).text(storageItems[i].name);
  $('#body' + i).text(storageItems[i].value.Question);
  $('#text' + i).text(storageItems[i].value.Answer)
}}
}
  });

  clearButton.on('click', function() {
    localStorage.clear();
    favoriteContainer.empty();
  })





