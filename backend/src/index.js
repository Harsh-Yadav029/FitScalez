import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure .env is loaded reliably whether run from /backend or project root
dotenv.config({
    path: path.resolve(__dirname, "../.env"),
});
dotenv.config();

const PORT = process.env.PORT || 5000;

let serverInstance = null;

const startServer = () => {
    if (serverInstance) return;

    serverInstance = app.listen(PORT, () => {
        console.log(`⚙️  Fitscalez Server is running on port: ${PORT}`);
    });

    serverInstance.on("error", (error) => {
        if (error.code === "EADDRINUSE") {
            console.error(`❌ Port ${PORT} is already in use by another instance or process.`);
            console.error(`💡 If another terminal is running 'npm run dev', you can stop it or kill the existing process.`);
        } else {
            console.error("Express App Error: ", error);
        }
    });
};

connectDB()
    .then(() => {
        startServer();
    })
    .catch((err) => {
        console.error("MongoDB connection failed, starting server in fallback mode: ", err.message);
        startServer();
    });
