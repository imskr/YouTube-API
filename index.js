const express = require('express');
const Youtube = require('./src/models/youtube');
const axios = require('axios');
const app = express();

const { YT_SEARCH, YOUTUBE_API_KEY, YOUTUBE_URL } = require('./config');
const dbConnection = require('./src/db/index');

// connect with our youtube database
dbConnection();

// define variable for pagination
let counter = 0, page = 0;
const perPage = 5;
const keys = YOUTUBE_API_KEY.split(' ');

// fetch async with some seconds of interval
const populateInterval = setInterval(async () => {
  try {
    if (!keys) throw Error('No keys found');
    const idx = counter % keys.length;
    counter++;
    const currentKey = keys[idx];

    const {
      data: { items: videos },
    } = await axios.get(YOUTUBE_URL, {
        // use youtube search params
        params: {
            part: YT_SEARCH.part,
            maxResults: YT_SEARCH.maxResults,
            key: currentKey,
            q: YT_SEARCH.q,
            type: YT_SEARCH.type,
            order: YT_SEARCH.order,
            publishedAfter: YT_SEARCH.publishedAfter
        },
    });

    // fetch and insert one by one
    videos.forEach(
      async ({
        id: { videoId },
        snippet: { publishTime, title, description, thumbnails },
      }) => {
        const preVideo = await Youtube.findOne({
          title: title,
        });

        if (!preVideo) {
          const newVideo = new Youtube({
            videoId: videoId,
            title: title,
            description: description,
            thumbnails: thumbnails.default.url,
            publishTime: publishTime,
          });

          const video = await newVideo.save();
        }
      }
    );
  } catch (err) {
    console.error(err);
  }
}, 10000);


// define route for fetching videos
app.get('/', async (req, res) => {
    try {
      const videos = await Youtube.find()
        .limit(perPage)
        .skip(perPage * page)
      page++;
      res.json(videos);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error Happened!');
    }   
});

let port = 5000 || process.env.PORT;
app.listen(port, () => console.log(`listening on ${port}`));
