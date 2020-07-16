/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Test / driver code (temporary). Eventually will get this from the server.
// Fake data taken from initial-tweets.json
const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]


 const renderTweets = function(tweets) {
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
  
  $(document).ready(function () {
    const $tweet = renderTweets (data);      
 });

