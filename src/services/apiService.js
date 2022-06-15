const axios = require('axios');
const { google } = require('googleapis');
const { YT_SEARCH, YOUTUBE_API_KEY } = require('../../config');
const Youtube = require('../models/youtube');
const dbConnection = require('../db/index');
const cron = require('node-cron');

// connect with our youtube database
dbConnection();

// fetch videos
export const fetchVideo = async (key, param) => {
    try {
        // initialize YT service
        const service = google.youtube({
            version: "v3",
            auth: key,
        });

        const { data } = await service.search.list(YT_SEARCH);
        // object extraction and returning the object
        const { items } = data;
        return items
    }
    catch (error) {
        console.log('Error on fetching videos', error);
        throw error
    }
}

// save video results fetched
// run cron job every 1 minute  and save details
cron.schedule("*/1 * * * *", async () => {
    console.log("running a task every minute");
    let once = false;

    const apiKeys = YOUTUBE_API_KEY.split(',');
    try {
        for (let i = 0; i < apiKeys.length; i++) {
            try {
                if (once === true) {
                    break;
                }
                const key = apiKeys[i];
                const param = YT_SEARCH;
                const items = await fetchVideo(key, param);
                console.log(items);

                once = true;
                await items.map(async (i) => {
                    const { title, description, publishTime } = i.snippet;
                    const _default = i.snippet.thumbnails.default;
                    const { medium, high } = i.snippet.thumbnails;
                    const { videoId } = i.id;
                    const { channelTitle, channelId } = i.snippet;
                    const youtube = {
                        videoId, title, description, publishTime,
                        thumbnail: {
                            default: _default,
                            medium,
                            high
                        },
                        channel: {
                            channelId,
                            channelTitle
                        }
                    };
                    console.log(youtube);
                    const videoExist = await Youtube.findOne({ videoId: videoId });
                    console.log(videoExist);
                    if (!videoExist) await Youtube.create(youtube);
                    return youtube;
                })

            } catch (error) {
                console.log('Exceeded limit', error);
            }
        }
    }
    catch (error) {
        console.log('Exceeded limit for all keys', error);
    }
});

