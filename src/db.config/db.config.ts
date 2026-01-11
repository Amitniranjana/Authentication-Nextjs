import mongoose from "mongoose";

export default async function connect() {
    try {
        // 1. Check if already connected to avoid multiple connections
        if (mongoose.connections.length > 0) {
            const connectionState = mongoose.connections[0].readyState;
            if (connectionState === 1) {
                console.log("Already connected to MongoDB");
                return;
            }
        }
const MONGO_URI = "mongodb+srv://dbUser:N8TPViRJSGkGq0tl@authentication.fvt6pjx.mongodb.net/?appName=Authentication"
        
        // 2. Connect
        await mongoose.connect(MONGO_URI);
        const connection = mongoose.connection;

        // 3. Listeners (Use 'connected', not 'connect')
        connection.on("connected", () => {
            console.log("MongoDB connected successfully");
        });

        connection.on("error", (err) => {
            console.log("MongoDB connection error: " + err);
            process.exit(1);
        });

        // Note: Avoid process.exit() on disconnect in serverless apps,
        // as it might kill the container unnecessarily.
        console.log("md connected successfully")

    } catch (error) {
        console.log("Something went wrong in connecting to DB");
        console.log(error);
    }
}