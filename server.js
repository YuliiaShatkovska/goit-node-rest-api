import mongoose from "mongoose";
import { app } from "./app.js";

const DB_HOST =
  "mongodb+srv://Yuliia:Iu7oc3JtwRPfRwUS@cluster0.ixae22q.mongodb.net/db_contacts?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connection successful");
    });
  })
  .catch((e) => {
    console.log(e.message);
    process.exit(1);
  });
