import "dotenv/config";
import express from "express";
import connectToDb from "./utils/connectToDb";
// import log from "./utils/logger";
import router from "./routes";
import deserializeUser from "./middleware/deserializeUser";
import cors from 'cors'

const app = express();

app.use(cors({
    origin: '*',
    credentials: true
}))

app.use(express.json())

app.use(deserializeUser)

app.get('/',(req: express.Request, res: express.Response)=>{
    return res.send("App is Running").end()
})

app.use(router)

const port = 5000

app.listen(5000, () => {    
    // log.info(`App started at http://localhost:${port}`)
    console.log(`App started at http://localhost:${port}`)
    connectToDb();
});
