import {MainPage} from "../components/landing/MainPage/MainPage";
import {LandingStyles} from "../styles/SectionsGlobalStyles";

var express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())

export default function Home () {
    return <>
        {LandingStyles}
        <MainPage/>
    </>
}

Home.needChakra = true;
Home.needWeb3 = true;