// import schema from mongoose
const { Schema, default: mongoose } = require('mongoose');

/*define our youtube schema and enabling timestamp to get createdAt and updatedAt
    more info on search result struct: https://developers.google.com/youtube/v3/docs/search/list

    Defining: videoId, channelId, title, description, publishTime, channelTitle, thumbnails
*/
const ytSchema = new Schema(
    {
        videoId: {
            type: String,
            required: true,
        },
        channelId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        publishTime: {
            type: String,
            required: true,
        },
        channelTitle: {
            type: String,
            required: true,
        },
        thumbnails: {
            default: {
                url: String,
                width: Number,
                height: Number,
            },
            medium: {
                url: String,
                width: Number,
                height: Number,
            },
            high: {
                url: String,
                width: Number,
                height: Number,
            }
        }
    },
    { timestamps: true }
);

// using mongoose index to set index on our youtube db 
ytSchema.index({ publishTime: -1 })

export default mongoose.model("Youtube", ytSchema);
