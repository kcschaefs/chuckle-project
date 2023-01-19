let favoriteContainer = $('.favoriteContainer');
let storageItems = JSON.parse(localStorage.getItem('savedData'));
let clearButton = $('.clear');

$(document).ready(function () {

  if (storageItems !== null) {
  for (i = 0; i < storageItems.length; i++) {

  let createCard = $('<div class="card col-lg-3 col-md-4 col-12 px-2 m-2">').attr({id: 'card' + i}).attr('style', 'width:18rem').attr('style', 'height:400px; font-size:1.5rem');
  let createBody = $('<div class="card-body">').attr({id: 'body' + i}).attr('style', 'padding:50px;');
  let h5Title = $('<h3 class="card-title">').attr({id: 'title' + i});
  let cardText = $('<p class="card-text">').attr({id: 'text' + i});
  
  favoriteContainer.append(createCard);
  createCard.append(createBody);
  createBody.append(h5Title);
  createBody.append(cardText);
  

  console.log(storageItems[i].value);

  console.log(storageItems[i].name)
  $('#title' + i).text(storageItems[i].name);
  $('#body' + i).text(storageItems[i].value)
 // $('#title' + i).text(storageItems[i].value)

}
}
  });

  clearButton.on('click', function() {
    localStorage.clear();
    favoriteContainer.empty();
  })
