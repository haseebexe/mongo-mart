import mongoose from "mongoose";


const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            dbName: "mongo-mart"
        })

        console.log("Connected to database");
    } catch(error) {
            console.error(error)
    }
}


export default connectDb;