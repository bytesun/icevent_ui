/* eslint-disable @next/next/no-img-element */
// Next, React
import Head from "next/head"
import { useState, useEffect } from "react"
import styles from "../styles/Home.module.css"

import { icevent } from "../api/icevent";

function HomePage() {
    const [count, setCount] = useState(0)

    async function getUserCount() {

        const count = await icevent.userCount()
        setCount(count)
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>ICEvent UI</title>
            </Head>
            <main className={styles.main}>
                <h3 className={styles.title}>
                    WELCOME!
                </h3>

                <img
                    src="/icevent.png"
                    alt="ICEvent logo"
                    className={styles.logo}
                />

               
                    <button onClick={getUserCount}>Send</button>
                    user count: {count}
            </main>
        </div>
    )
}

export default HomePage
