
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

$(document).ready(function () {
  loadTweets();
  
  $('#button').on('click', (evt) => {
  //$('form').on('submit', (evt) => {  //alternative option. whatever event you use. The idea is to catch POST request and pass it to AJAX 
     // console.log($("#tweet-text").serialize());
      evt.preventDefault();
      $.post("/tweets", $('#tweet-text').serialize())
      .then(() =>{
        $('textarea').val('');

        loadTweets();
      })
  });     
});