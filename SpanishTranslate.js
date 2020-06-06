var url = require("url");
var urlRequest = require("request-promise");
const googleTranslateClient = require('@vitalets/google-translate-api');
console.log("This is SpanishTranslate made in Node JS by @ethaniccc!");
console.log("These are the arguments: " + process.argv);
var website = process.argv[2];

function isWebsite(link){
    var test = url.parse(link);
    return test.hostname;
}

function endOfStory(string){
    return string.split("<!-- Chapter Ends -->")[0];
}

function startOfStory(string){
    var await = string.split("<!-- Content section -->")[1];
    return await.split("</h1>")[1];
}

if(isWebsite(website)){
    console.log("The argument passed is an instance of a url, checking if url is instance of spanish story...");
    if(isWebsite(website) != "flangoo.com"){
        console.log("This is not a spanish story!");
    } else {
        urlRequest(website).then(function(html){
            var storyEnd = endOfStory(html);
            var storyBase = startOfStory(storyEnd);
            var originalStory = storyBase.split('<p>').join('').split('</p>').join('').split('<i>').join('').split('</i>').join('');
            googleTranslateClient(originalStory, {to: 'en'}).then(translatedStory => {
                console.log("Story Translated!\nOriginal Story:\n" + originalStory + "\nTranslated Story:\n" + translatedStory.text);
            }).catch(error => {
                console.log("Something went wrong: " + error);
            });
        })
        .catch(function(error){
            console.log("Something went wrong! " + error);
        });
    }
} else {
    console.log("The argument passed is not an instance of a url!");
    return;
}