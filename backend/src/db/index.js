import mongoose, { Mongoose } from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.log("please provide MONGODB_URI in .env file");
      return;
    }
    const databaseConnection = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}?retryWrites=true&w=majority`,
      {
        tls: true,
        tlsInsecure: true,
      },
    );

    console.log(
      `Database connected succesfully . host: ${databaseConnection.connection.host}`,
    );
  } catch (databaseConnectionError) {
    console.log("Error connecting to mongoDB", databaseConnectionError);
    process.exit(1);
  }
};

export default connectDB;
