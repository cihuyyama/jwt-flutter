import mongoose  from "mongoose";
import config from 'config'
import log from "./logger";

async function connectToDb() {
    const dbUri = String(process.env.MONGO_URI)
    
    try {
        await mongoose.connect(dbUri)
        log.info('Connected to db')
    } catch (error) {
        process.exit(1)
    }
}

export default connectToDb