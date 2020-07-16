
const renderTweets = function(tweets) {
  $('#tweets-container').empty();
   tweets.forEach( (element) => {
       let $tweet = createTweetElement(element);
          $('#tweets-container').append($tweet);
          //console.log($tweet); // to see what it looks like   
   });
}

const createTweetElement = function(tweet) {
  let $tweet = `
  <article class = "article">
          <div class = "headers-footers-alignment">
            <header class = "header-footer-format" style = "align-items: flex-start"> ${tweet.user.name} </header>
            <header class = "header-hover" style = "align-items: flex-end;"> ${tweet.user.handle} </header>
          </div>
          <div >
            <p style = "word-wrap: break-word; margin: 40px; padding-top: 20px;">${tweet.content.text}</p>
          </div>
          <div class = "headers-footers-alignment" style = "border-top: solid grey 3px;">
            <footer class = "header-footer-format">${tweet.created_at}</footer>
            <footer class = "header-footer-format">footer 2</footer>
        </div>
  </article>
  `
  return $tweet;
};

//Get request
const loadTweets =()=>{
  $.ajax({url:'/tweets', method:'GET',}).then((response) => {
    const $tweet = renderTweets (response); 
  })
};


//const validate33 = ((data) => data.length >= 1 || data.length > 140);

const validation = ((data) => {
  let error;
  let length = data.length - 5;
  if (length === 0) {
    alert('Error: Field is empty. Type somthing!');
  } else if(length > 140) { 
    alert('Error: Too long. Our arbitary limit of 140 chars!');
  } else {
    return false;
  }
});


$(document).ready(function () {
  loadTweets(); 
  $('#button').on('click', (evt) => {
  //$('form').on('submit', (evt) => {  //alternative option. whatever event you use. The idea is to catch POST request and pass it to AJAX 
      evt.preventDefault();
      const validate = validation($('#tweet-text').serialize());
      if (validate === false) {
        $.post("/tweets", $('#tweet-text').serialize())
        .then(() =>{
          $('textarea').val('');
          loadTweets();
        })
      }
  });     
});
  //.fail(function () {
     //   alert("Error: Empty field. Type something!");
    //  })