// youtube api key
const YOUTUBE_API_KEY = "AIzaSyBwcmHrZ4ipOCac-l4jmAG7Lwi6IESXbTg";

// mongodb cluster URI
const MONGO_URI = "mongodb+srv://shubham:shubham@youtube.hzxb4.mongodb.net/?retryWrites=true&w=majority";

// base url for search api
const YOUTUBE_URL = 'https://www.googleapis.com/youtube/v3/search';

// youtube search params
const YT_SEARCH = {
    "part": "snippet", // comma separated search resource
    "maxResults": 10, // default is 5
    "order": "date", // sorted in reverse chronological order based on the date
    "type": "video",
    "publishedAfter": "2022-01-01T00:00:00Z",
    "q": "OPENSOURCE" // query term to search for
}

module.exports = {
    YOUTUBE_API_KEY,
    MONGO_URI,
    YT_SEARCH,
    YOUTUBE_URL
};
