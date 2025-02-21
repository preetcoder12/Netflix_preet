require('dotenv').config();
const {mongoose} =  require("mongoose")

const connectDB = async()=>{
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
    }catch(err){
        console.log(err , " error occured while connecting to database ");
        process.exit(1);
    }
}
module.exports = {
    connectDB
}