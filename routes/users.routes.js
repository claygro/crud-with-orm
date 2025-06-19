import express from "express";
import userModel from "../models/user.models.js";
import { where } from "sequelize";
const routes = express.Router();
//posting
routes.post("/post", async (req, res) => {
  try {
    const data = await userModel.bulkCreate(req.body);
    res.status(200).json({ success: true, message: "posting successfully" });
    console.log(`posting successfully data: ${data}`);
  } catch (error) {
    res.status(404).json({ success: false, message: "error in posting" });
    console.log(`\n error in posting ${error}`);
  }
});
//read database.
routes.get("/read/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await userModel.findByPk(id);
    res.status(200).json(data);
    console.log(data);
  } catch (error) {
    res.status(404).json({ success: true, message: "Unable to show data" });
  }
});
//update.
routes.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { userName, location } = req.body;
  try {
    const data = await userModel.update(
      { username: userName, location: location },
      {
        where: {
          id: id,
        },
      }
    );
    if (data == 1) {
      res.status(200).json({ success: true, message: "update successfully" });
    } else {
      res.status(404).json({ success: false, message: "unable to update" });
    }
    console.log(data);
  } catch (error) {
    res.status(404).json({ success: false, message: "unable to updates" });
    console.log("error in updating data", error);
  }
});
//delete
routes.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const data = await userModel.destroy({
      where: {
        id: id,
      },
    });
    if (data == 1) {
      res.status(200).json({ success: true, message: "delete successfully" });
    } else if (data == 0) {
      res.status(200).json({ success: false, message: "there is no id match" });
    }
    console.log(data);
  } catch (error) {
    res.status(404).json({ success: false, message: "unable to delete." });
  }
});
export default routes;
