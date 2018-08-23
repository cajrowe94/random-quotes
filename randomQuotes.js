let searchUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&callback=?&format=json&search=';
let linkUrl = 'https://en.wikipedia.org/wiki/';
let tweetUrl = 'https://twitter.com/intent/tweet?related=freecodecamp&text=';

var quoteText;
var quoteAuthor;

let searchTerm;


$(document).ready(function(){
	getnewQuote();
	//get new quote
	document.getElementById("newQuoteBtn").addEventListener("click", getnewQuote);
	$('.btn, .twit').hide();
	$('.btn, .twit').fadeIn(1000, function(){
		$('.btn, .twit').show();
	});
	
});

function getnewQuote(){
	//fetch a new quote with the API
	$.getJSON("https://talaikis.com/api/quotes/random/", function(a) {
		$('#quote').fadeOut("slow", function(){
			$('#quote').text("\"" + a.quote + "\"");
		});
		$('.link').fadeOut("slow", function(){
			$('.link').text("- " + a.author + " -");
		});
  		//assign the new values to quote and author tags
		$('#quote').fadeIn("slow");
		$('.link').fadeIn("slow");

		//set quote author each time you get new quote
		quoteAuthor = a.author;
		quoteText = a.quote;
		//send name to getWiki function
		getWiki(quoteAuthor);
		tweetIt(quoteAuthor, quoteText);
	});
}

function getWiki(name){
	//reset URL
	searchUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&callback=?&format=json&search=';
	//reset URL
	linkUrl = 'https://en.wikipedia.org/wiki/';
	//remove spaces in author name
	var authorSearch = name.replace(/\s/g, '');
	//add name to end of search URL
	searchUrl+=authorSearch;
	//get JSON from URL
	$.getJSON(searchUrl, function(a){
		searchTerm = a[1][0];
		searchTerm = searchTerm.replace(/\s+/g, "_");
		linkUrl+=searchTerm;
		console.log(linkUrl);

		//change href in link
		$(".link").attr("href", linkUrl);
	});
}

function tweetIt(author, quote){
	//reset URL
	tweetUrl = 'https://twitter.com/intent/tweet?related=freecodecamp&text=';

	//add author and quote to tweet
	tweetUrl += "\"" + quote + "\"" + " " + "- " + author;

	//change image link
	$('.twitLink').attr("href", tweetUrl);

}





