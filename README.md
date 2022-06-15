![rusty-skywalker](./public/images/brand.png)

> A Powerful YouTube Search Web API!

<p align="center">
    <img src="public/images/skywalker.png" height="150"><br>
</p>
<hr noshade>

## Installation

> Make sure you have `docker` and `docker-compose` installed

- Local

  ```bash
  $ git clone https://github.com/imskr/YouTube-API.git
  $ cd YouTube-API/
  $ docker-compose up
  ```

> Visit http://localhost:5000


## Architecture

## API
> `GET Request: /` - Fetch videos from database

- ```json
  [
    {
        "_id": "62a9e2070fe487a1b15617a1",
        "videoId": "B8c109Aso0Q",
        "title": "IMAGINE CREATING YOUR OWN NFT BASED OPENSOURCE DECENTRALIZED METAVERSE",
        "description": "MONETIZE YOUR LAND Monetize your land in many ways. One of which is foot traffic. Your Earth DAO uses algorithms that count ...",
        "publishTime": "2022-06-15T06:17:19Z",
        "thumbnails": "https://i.ytimg.com/vi/B8c109Aso0Q/default.jpg",
        "createdAt": "2022-06-15T13:43:35.522Z",
        "updatedAt": "2022-06-15T13:43:35.522Z",
        "__v": 0
    },
    .
    .
  ]
  ```
