import mongoose from "mongoose";


 const dbConnect = async () => {
    mongoose.connection.on("connected", ()=> console.log("database connected"));

    await mongoose.connect(`${process.env.MONGODB_URI}/crafticweb`);
}

export default dbConnect;