/* eslint-disable @next/next/no-img-element */
// Next, React
import Head from "next/head"
import { useState, useEffect } from "react"
import styles from "../styles/Home.module.css"

import { icevent } from "../api/icevent";

function HomePage() {
    const [calendars, setCalendars] = useState([])

    async function getUserCount() {

        const calendars = await icevent.getCalendars()
        setCalendars(calendars)
    }
    const calist = calendars && calendars.map(c=>
        <li>{c.name}</li>
        );
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
                <ul>
               {calist}
               </ul>
            </main>
        </div>
    )
}

export default HomePage
