import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        mongoose.connection.on("connected", () => console.log("database connected"));
        await mongoose.connect(`${process.env.MONGODB_URI}/crafticweb`, {
            tls: true,
        });
    } catch (err) {
        console.error("MongoDB connection error:", err.message);
        process.exit(1);
    }
};

export default dbConnect;