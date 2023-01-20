import { useState } from 'react';
import { Inter } from '@next/font/google';
import axios from 'axios';

const inter = Inter({ subsets: ['latin'] })

export default function YTDownloader() {
    const [youtube_link, setYoutubeLink] = useState('');
    const [status, setStatus] = useState('awaiting instructions.');

    const download_video = () => {
      setStatus('Posting to api..');
        axios.post(`http://localhost:3000/api/download_video`, {url: youtube_link})
        .then(res => {
          setStatus('done with request :)');1
          console.log(res);
          console.log(res.data);
        })
    }
  return (
    <>
      
      <div className="bg-red-500 text-white flex items-center flex-col justify-center py-4">
        <h2 className='text-lg my-2 text-green-400 font-bold'>Status: <span className='font-normal text-white'>{status}</span></h2>
        <div className='space-x-4'>
        <label htmlFor="youtube_url_input">Youtube URL:</label>
        <input onChange={(event) => { setYoutubeLink(event.target.value)}} className='shadow appearance-none border border-red-500 rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline' type="text" id="youtube_url_input" />
        <button onClick={() => download_video()} className='px-4 py-2 bg-blue-800 text-base rounded text-white'>Download</button>
        </div>
      </div>
    </>
  )
}
