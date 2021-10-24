import "../styles/global.css"

import Navbar from "../components/Navbar";
import 'semantic-ui-css/semantic.min.css'
import "react-big-calendar/lib/css/react-big-calendar.css";

const App = ({ Component, pageProps }) =>{
    return (
    <> 
    <Navbar />
    <Component {...pageProps} />
    </>
    )
}

export default App;