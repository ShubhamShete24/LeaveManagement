import mongoose from "mongoose";
const connectDB  = async (DB_URL, DB_NAME) =>{
    try{
        const DB_OPTION = {
            dbName: DB_NAME
        }
        await mongoose.connect(DB_URL, DB_OPTION);
        console.log("Connected to database successfully.");
    }catch(err){
        console.log(err);
    }
}
export default connectDB;