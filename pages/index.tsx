import { buildAxiosFetch } from '@lifeomic/axios-fetch';
import Axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [state, setState] = useState<string>('wants-fetch');
  const [fetched, setFetched] = useState<string>()

  useEffect(() => {
    if (state !== 'wants-fetch') return;

    setState('fetching');
    const fetch = buildAxiosFetch(Axios.create());
    fetch('api/hello')
      .then(response => response.json())
      .then(body => setFetched(body))
      .catch(e => console.error(e))
  }, [state]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {fetched && <div>Fetched from the server: {JSON.stringify(fetched)}</div>}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
