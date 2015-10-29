#!/usr/bin/env node
'use strict';

let ytdl    = require('ytdl-core');
let ffmpeg  = require('fluent-ffmpeg');
let request = require('request');
let fs      = require('fs');
let tmp     = require('tmp');

let url = process.argv[2];

ytdl.getInfo(url, (err, info) => {
  if (err) {
    console.log(err);
    return;
  }

  let formatUrl = null;
  for (let format of info.formats) {
    if (!['140', '141'].indexOf(format.itag));
    formatUrl = format.url;
    if (format.itag == '141') break;
  }

  if (!formatUrl) {
    console.log('This video doesn\'t have mp4 audio');
    return;
  }

  let req = request(formatUrl);
  let filePath = process.env.HOME + '/Music/' + info.title + '.m4a';

  let _tempFileCreated = (err, path, fd) => {
    if (err) throw err;

    req.pipe(fs.createWriteStream(path));
    req.on('end', () => {
      ffmpeg(path)
        .output(filePath)
        .outputOptions([
          '-acodec copy',
          '-movflags faststart'
        ])
        .on('end', () => {
          console.log('Done!');
          console.log('File saved in ' + filePath);
        })
        .run();
    });
  }

  tmp.file({ postfix: '.mp4' }, _tempFileCreated);
});
