import "dotenv/config";
import app from "./app.js";
import connectDB from "./db/index.js";

const SERVER_PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(SERVER_PORT, () => {
      console.log(`server is running on port:${SERVER_PORT}`);
    });
  })
  .catch((dataConnectionError) => {
    console.log("Error connecting to mongoDB", dataConnectionError);
    process.exit(1);
  });
