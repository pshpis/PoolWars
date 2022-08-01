import {MainPage} from "../components/landing/MainPage/MainPage";
import {LandingStyles} from "../styles/SectionsGlobalStyles";

export default function Home () {
    var express = require('express')
    var cors = require('cors')
    var app = express()

    app.use(cors())

    return <>
        {LandingStyles}
        <MainPage/>
    </>
}

Home.needChakra = true;
Home.needWeb3 = true;