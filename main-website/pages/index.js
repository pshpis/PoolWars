import {MainPage} from "../components/landing/MainPage/MainPage";
import {LandingStyles} from "../styles/SectionsGlobalStyles";

export default function Home () {
    var express = require('express')
    var cors = require('cors')
    var app = express()

    app.use(cors())

    app.get('/products/:id', function (req, res, next) {
        res.json({msg: 'This is CORS-enabled for all origins!'})
    })

    app.listen(80, function () {
        console.log('CORS-enabled web server listening on port 80')
    })

    return <>
        {LandingStyles}
        <MainPage/>
    </>
}

Home.needChakra = true;
Home.needWeb3 = true;