// import schema from mongoose
const { Schema, default: mongoose } = require('mongoose');

/*define our youtube schema and enabling timestamp to get createdAt and updatedAt
    more info on search result struct: https://developers.google.com/youtube/v3/docs/search/list

    Defining: videoId, title, description, publishTime, thumbnails
*/
const ytSchema = new Schema(
    {
        videoId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        publishTime: {
            type: String,
        },
        thumbnails: {
            type: String,
        }
    },
    { timestamps: true }
);

// using mongoose index to set index on our youtube db 
ytSchema.index({ publishTime: -1 })

module.exports = Youtube = mongoose.model("Youtube", ytSchema);
