# yt2m4a
Get m4a audio from a YouTube video mp4 container.

I created this because many songs are available in Spotify, but not in my country.

Only tested in OSX.

## Requirements
  - FFmpeg with aac support
  - node 4.*

## Installation
    npm install -g git+https://github.com/mallendeo/yt2m4a

## Usage
    yt2m4a <youtube url>

    yt2m4a https://www.youtube.com/watch?v=dXHVuIqGzSU

The converted m4a will be in your Music folder.

Note that this conversion is lossless, so the original mp4 audio remains the same. Then you can sync it with your Spotify account or play in iTunes.
