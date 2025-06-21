import express from "express";
import routes from "./src/routes/users.routes.js";
import connection from "./src/models/connection.models.js";
import "dotenv/config";
const app = express();
app.use(express.json());
app.use("/user", routes);
app.listen(process.env.PORT, () => {
  try {
    connection.authenticate();
    //this authenticate Tests whether the database connection details
    // (host, username, password, db name, etc.) are correct and working.
    connection.sync();
    //this sync create a new table if there is no table exist according to user model.
    console.log("\nsuccessfully connect with database");
  } catch (error) {
    console.log(`\nfailed to connect with database ${error}`);
  }

  console.log("\nserver is starting");
});
