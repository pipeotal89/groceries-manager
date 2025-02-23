import { connect, set } from "mongoose";

const DB_CONN_STRING = process.env.DB_CONN_STRING;

// connection to db
export const connectToDB = async () => {
  try {
    set("strictQuery", false);
    const db = await connect(DB_CONN_STRING);
    console.log("MongoDB connected to", db.connection.name);
    // Emit an event when the connection is successful
  } catch (error) {
    console.error(error);
    // Emit an event when there's an error
  }
};
