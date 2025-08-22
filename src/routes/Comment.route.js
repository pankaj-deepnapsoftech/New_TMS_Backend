import { Router } from "express";

// ---------------------------local imports here ----------------------------------
import { CreateComment, DeleteComment, UpdateComment } from "../controller/Comment.controller.js";

const routes = Router();


routes.route("/add").post(CreateComment);
routes.route('/update/:id').put(UpdateComment);
routes.route('/delete/:id').delete(DeleteComment);


export default routes;






















