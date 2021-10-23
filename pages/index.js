/* eslint-disable @next/next/no-img-element */
// Next, React
import Head from "next/head"
import { useState, useEffect } from "react"
import styles from "../styles/Home.module.css"

import { Calendars } from "../components/calendars/CalendarList";

function HomePage() {
    const [calendars, setCalendars] = useState([])


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
               <Calendars />
            </main>
        </div>
    )
}

export default HomePage
