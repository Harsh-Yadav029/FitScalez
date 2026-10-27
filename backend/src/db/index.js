import mongoose from "mongoose";
import dns from "dns";

// Ensure Node.js can resolve MongoDB Atlas SRV records even if local ISP router blocks DNS SRV
try {
    dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
} catch (e) {
    // Fallback to default system resolvers if not supported
}

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/fitscalez"
        );
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("MONGODB connection warning: ", error.message);
        throw error;
    }
};

export default connectDB;
