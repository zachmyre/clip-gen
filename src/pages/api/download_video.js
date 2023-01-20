const fs = require('fs');
const ytdl = require('ytdl-core');
const cp = require('child_process');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const fluent_ffmpeg = require('fluent-ffmpeg');
fluent_ffmpeg.setFfmpegPath(ffmpegPath);

let youtube = {
  url: '',
  id: '',
  title: ''
}

export default async function handler(req, res) {
  console.log('starting request handler');
    await download_video(req.body.url);
    console.log('done with request');
    res.status(200).json({ name: 'John Doe' })
  }

  function download_video(youtube_url) {
    return new Promise(async function(resolve, reject) {
      youtube.url = youtube_url;
      youtube.id = ytdl.getVideoID(youtube_url);
      ytdl.getInfo(youtube_url).then((info) => {
        youtube.title = info.videoDetails.title;
        console.log(youtube)
      console.log('starting download');
      ytdl(youtube_url, {filter: 'audioandvideo', quality: 'highestvideo'})
  .pipe(fs.createWriteStream(`./assets/${youtube.title}.mp4`)).on("close", async () => {
    console.log('done downloading');
    await generate_subtitles();
    await assemble_video();
    resolve();
  });
      })

})
}

function generate_subtitles(){
  console.log('generating subtitles');
  return new Promise((resolve, reject) => {
      cp.spawn('python',["./transcribe.py", youtube.id]);
      setTimeout(() => {
        console.log('done generating subtitles');
          resolve();
      }, 15000)
  })
}

function assemble_video(){
  console.log('starting to assemble video');
  return new Promise((resolve, reject ) => {
    fluent_ffmpeg(`./assets/${youtube.title}.mp4`)
  .outputOptions(
      '-vf subtitles=./assets/text.srt'
  )
  .on('error', (err) => {
      console.log('Error: ' + err.message);
  })
  .on('end', () => {
      console.log('done assembling video')
      clip();
  })
  .save(`./assets/${youtube.title}-subtitles.mp4`);

  const clip = () => {
    console.log('cropping video');
    fluent_ffmpeg(`./assets/${youtube.title}-subtitles.mp4`).
    complexFilter([
      `crop=ih*(5/4):ih`, //4/3
  ]).on('error', (err) => {
    console.log('Error: ' + err.message);
})
.on('end', () => {
    console.log('done cropping video')
    fs.unlinkSync(`./assets/text.srt`);
    fs.unlinkSync(`./assets/${youtube.title}.mp4`);
    fs.unlinkSync(`./assets/${youtube.title}-subtitles.mp4`);
    resolve();
})
.save(`./assets/${youtube.title}-final.mp4`);
  }
  })
  
}
  