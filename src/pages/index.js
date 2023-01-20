import Head from 'next/head';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import YTDownloader from '@/components/YTDownloader';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Senj Clips</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='w-screen h-screen bg-gray-800'>
        <h1 className='text-purple-600 text-5xl text-center pt-12 pb-4'>Senj Clips</h1>
      <YTDownloader />
      </main>
    </>
  )
}
