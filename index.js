PageLoad();


$(".bottom-box").on('click', '.delete-button', deleteCard);
$(".bottom-box").on('click', '.upvote', upVote);
$(".bottom-box").on('click', '.downvote', downVote);
$(".bottom-box").on('keyup', 'li .title-of-card', editTitle);
$(".bottom-box").on('keyup', 'li .body-of-card', editBody);
$('.save-btn').on('click', getCardInfo); 


 function PageLoad() {
    for (var i = 0; i < localStorage.length; i++) {
      string = localStorage.getItem(localStorage.key(i));
      object = JSON.parse(string);
      makeCard(object);
    };
  };


// var newCard = function(idea) {
//     return '<div id="${idea.id}"class="card-container"><h2 class="title-of-card">'  
//             + title +  '</h2>'
//             + '<button class="delete-button"></button>'
//             +'<p class="body-of-card">'
//             + body + '</p>'
//             + '<button class="upvote"></button>' 
//             + '<button class="downvote"></button>' 
//             + '<p class="quality">' + 'quality:' + '<span class="qualityVariable">'  '</span>' + '</p>'
//             + '<hr>' 
//             + '</div>';
// };

// function cardObject(object) {
//     return {
//         id: $.now(),
//         title: $('#title-input').val(),
//         body: $('#body-input').val(),
//         quality: qualityVariable
//     };
// }

function CardObject(object) {
  event.preventDefault();
  this.id = object.id;
  this.title = object.title;
  this.body = object.body;
  this.quality = object.quality || 'swill';
};

function getCardInfo(event) {
    event.preventDefault();
    if ($('#title-input').val() === '' || $('#body-input').val() === '') {
       return false;
    };  

    id = $.now();
    title = $('#title-input').val();
    body = $('#body-input').val();
    quality = 'swill';

    var card = new CardObject({id: id, title: title, body: body, quality: quality});

    makeCard(card);
    localStoredCard(card,id);
    clearInputFields();
    // $('form')[0].reset();
};

// var newCard = function(idea) {
//     return '<div id="${object.id}"class="card-container"><h2 class="title-of-card">'  
//             + title` ${object.title}` '</h2>'
//             + '<button class="delete-button"></button>'
//             +'<p class="body-of-card">'
//             + body + ${object.body}'</p>'
//             + '<button class="upvote"></button>' 
//             + '<button class="downvote"></button>' 
//             + '<p class="quality">' + 'quality:' + '<span class="qualityVariable">'  '</span>' + '</p>'
//             + '<hr>' 
//             + '</div>';
// };


function makeCard(object) {
    $(".bottom-box").prepend(`
    <li id=${object.id} class="card-container">
      <header class="idea-head">
        <h1 class="title-of-card"contenteditable>${object.title}</h1>
        <img src="images/delete.svg" alt="Delete" class="delete-button buttons">
      </header>
      <p class="body-of-card"contenteditable>${object.body}</p>
      <footer class="footer-of-card">
        <img src="images/upvote.svg" alt="Up Vote" class="upvote buttons">
        <img src="images/downvote.svg" alt="Down Vote" class="downvote buttons">
        <p class="quality"><span class="quality-title">quality: </span><span class="quality-judgment">${object.quality}</span></p>
      </footer>
    </li>
  `)
    // addToLocalStorage();
    // localStoreCard()
    clearInputFields();

};

// $.each(localStorage, function(key) {
//     var cardData = JSON.parse(this);
//     numCards++;
//     $( ".bottom-box" ).prepend(newCard(key, cardData.title, cardData.body, cardData.quality));
// });

// var localStoreCard = function() {
//     var cardString = JSON.stringify(CardObject());
//     localStorage.setItem('card' + numCards  , cardString);
//     // localStorage.setItem(id , cardString);
// }

function localStoredCard(card,id) {
  var cardToStore = card;
  var stringifiedCard = JSON.stringify(cardToStore);
  localStorage.setItem(id, stringifiedCard);
}

// function pullLocalStoredCard(id) {
//     var string = localStorage.getItem(id);
//     var object = JSON.parse(string);
//   };

// function makeCard(event) {
//     event.preventDefault();
//     if ($('#title-input').val() === "" || $('#body-input').val() === "") {
//        return false;
//     };  

//     // numCards++;
//     $( ".bottom-box" ).prepend(newCard('card' + numCards, $('#title-input').val(), $('#body-input').val(), qualityVariable)); 
//     localStoreCard();
//     $('form')[0].reset();
// };

function upVote() {
    id = $(this).closest('li').attr('id');
    var currentQuality = ($(this).siblings('p').children('span.quality-judgment').text().trim());
    console.log('id: ' + id);
    console.log('pulled object: ' + pullLocalStoredCard(id));

    pullLocalStoredCard(id);
    if (currentQuality === "swill") {
            object.quality = "plausaible";
            $($(this).siblings('p').children('span.quality-judgment').text(object.quality));
               
        } else if (currentQuality === "plausaible") {
            object.quality = "genius";
            $($(this).siblings('p').children('span.quality-judgment').text(object.quality));
    }
    updateStorage(object);
    // string = JSON.stringify(object);
    // localStorage.setItem(id, string);
}



function downVote(event) {
    id = $(this).closest('li').attr('id');
    var currentQuality = ($(this).siblings('p').children('span.quality-judgment').text().trim());
    pullLocalStoredCard(id);
    if (currentQuality === "genius") {
            object.quality = "plausaible";
            $($(this).siblings('p').children('span.quality-judgment').text(object.quality));  
        } else if (currentQuality === "plausaible") {
            object.quality = "swill";
            $($(this).siblings('p').children('span.quality-judgment').text(object.quality));
    }
    // updateStorage(object);
    string = JSON.stringify(object);
    localStorage.setItem(id, string);
}

function updateStorage(id, object) {
    string = JSON.stringify(object);
    localStorage.setItem(id, string);

};

function pullLocalStoredCard(id) {
    var string = localStorage.getItem(id);
    var object = JSON.parse(string);
    return object;
  };

function editTitle() {
    var title = $(this).text();
    var foundId = pullLocalStoredCard(object.id);
    foundId.title = title;
    console.log('edited title: ' + foundId.title);
    updateStorage(object.id, foundId);
  };

function editBody() {
    var body = $(this).text();
    var foundId = pullLocalStoredCard(object.id);
    foundId.body = body;
    console.log('edited body: ' + foundId.body);
    updateStorage(object.id, foundId);
    
    // body = $(this).text();
    // pullLocalStoredCard(this);
    // object.body = body;
    // updateStorage(object);
}

function deleteCard(event) {
    $(this).parent().parent().remove();
    var id = $(this).closest('li').attr('id');
    var cardHTML = $(this).closest('.card-container').remove();
    localStorage.removeItem(cardHTML[0].id);
 }
      
function clearInputFields() {
    $('#title-input').val('');
    $('#body-input').val('');
}






// function qualityCheck(event) {
//     var currentQuality = $($(this).siblings('p.quality').children()[0]).text().trim();
//     var qualityVariable;
// }
//         // if (event.target.className === "upvote" && currentQuality === "plausible"){
        //     qualityVariable = "genius";
        //     $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
               
        // } else if (event.target.className === "upvote" && currentQuality === "swill") {
        //     qualityVariable = "plausible";
        //     $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
               
        // } else if (event.target.className === "downvote" && currentQuality === "plausible") {
        //     qualityVariable = "swill"
        //     $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

        // } else if (event.target.className === "downvote" && currentQuality === "genius") {
        //     qualityVariable = "plausible"
        //     $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

        // } else if (event.target.className === "downvote" && currentQuality === "swill") {
        //     qualityVariable = "swill";
        
        // } else if (event.target.className === "upvote" && currentQuality === "genius") {
        //     qualityVariable = "genius";
//         }

//     var cardHTML = $(event.target).closest('.card-container');
//     var cardHTMLId = cardHTML[0].id;
//     var cardObjectInJSON = localStorage.getItem(cardHTMLId);
//     var cardObjectInJS = JSON.parse(cardObjectInJSON);

//     cardObjectInJS.quality = qualityVariable;

//     var newCardJSON = JSON.stringify(cardObjectInJS);
//     localStorage.setItem(cardHTMLId, newCardJSON);
// } 
   








