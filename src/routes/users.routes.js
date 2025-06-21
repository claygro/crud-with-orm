import express from "express";
import UserController from "../controller/user.controller.js";
const routes = express.Router();
const userController = new UserController();
//posting
routes.post("/post", userController.addUser.bind());
//read database.
routes.get("/read/:id", userController.readUser.bind());
//update.
routes.put("/update/:id", userController.updateUser.bind());
//delete
routes.delete("/delete/:id", userController.userDelete.bind());
export default routes;
