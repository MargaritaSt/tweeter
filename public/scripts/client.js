//Render tweets to index.html
const renderTweets = function(tweets) {
  $('#tweets-container').empty();
  const reversedTweets = tweets.reverse();
   reversedTweets.forEach( (element) => {
      let $tweet = createTweetElement(element);
      $('#tweets-container').append($tweet); 
   });
}
//render Error message to index.html
const renderErrors = function(error) {
  $('.error-text').text(error);
  $('.error-text').slideDown("slow");
  $('.error-text').css("border-color", "red");
};

//Safe text. To prevent harmful text/scripts from being loaded to the server
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

//Calculating the number of days when Tweet was created.
const getDate = function (date) {
  const currentdate = new Date();
  const tweetdate = (new Date(date));
  let diffdate = currentdate.getTime() - tweetdate.getTime();
  let tweetDateText;
  diffdate = Math.round(diffdate/1000/60/60/24);
  switch (diffdate){
    case 0:
      tweetDateText = "Today";
      break;
    case 1:
      tweetDateText = diffdate + " day ago";
      break;
    default:
      tweetDateText = diffdate + " days ago";
  }
  return tweetDateText;
}

//Creating a single tweet in HTML format. This function is used by renderTweets()
const createTweetElement = function(tweet) {
  const $tweet = `
  <article class = "article">
    <div class = "headers-footers-alignment">
      <header class = "header-footer-format" style = "align-items: flex-start;">
        <div><img src = "${tweet.user.avatars}"> </div>
        <div style = "margin-left: 10px; margin-top: 15px;">${tweet.user.name}</div>
      </header>
      <header class = "header-hover" style = "align-items: flex-end;"> ${tweet.user.handle} </header>
    </div>
    <div >
      <p style = "word-wrap: break-word; margin: 40px; padding-top: 20px; font-size: 28px;">${escape(tweet.content.text)}</p>
    </div>
    <div class = "headers-footers-alignment" style = "border-top: solid grey 3px;">
      <footer class = "header-footer-format">${getDate(tweet.created_at)}</footer>
      <footer class = "header-footer-format">
        <i class = "fa fa-flag" style = "margin-right: 5px; color: #4056A1;"></i>   
        <i class = "fa fa-retweet" style = "margin-right: 5px; color: #4056A1;"></i> 
        <i class = "fa fa-heart" style = "color: #4056A1;"></i> 
      </footer>
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

//Creating alert message when you click the "Tweet" button if text box is empty or has more than 140 chars
const validation = ((data) => {
  let error = '';
  const length = data.length;
  if (length === 0) {
    error = 'Error: Field is empty. Type somthing!'; 
  } else if(length > 140) { 
    error = 'Error: Too long. Our arbitary limit of 140 chars!';
  } 
  return error;
});

$(document).ready(function () {
  loadTweets(); 
  $('.counter').val(140);
  $('#button').on('click', (evt) => {
  evt.preventDefault();
    if (!($('.error-text').first().is(":hidden"))) {
      $('.error-text').hide();
    }
    $('.error-text').css("border-color", "transparent");
    $('.error-text').text('');
    $('.error-message').empty();
    const validate = validation($('#tweet-text').val());
    if (validate === '') {
      let tweettext = $('#tweet-text') //data
      $.post("/tweets", tweettext.serialize())
      .then(() =>{
        $('textarea').val('');
        $('.counter').val(140);
        loadTweets();
      })
    } else {
      renderErrors(validate);
    }
  });
});