import mongoose from "mongoose";

const dbConnect = async() =>{
    try{
        const conn = mongoose.connect(process.env.MONGO_URI)
        if(!conn) throw Error("Error Connecting DataBase")
        console.log("DataBase is Connected")
    }catch(e){
        console.log("Error" , e.message)
    }
}

export default dbConnect;