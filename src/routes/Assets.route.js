
import {Router} from "express";

// ---------------------------------- local imports here ---------------------------
import { CreateAssets, DeleteAssets, GetAssets, UpdateAssets } from "../controller/Assets.coontroller.js";


const routes = Router();


routes.route("/create").post(CreateAssets);
routes.route("/get").get(GetAssets);
routes.route("/update/:id").put(UpdateAssets);
routes.route("/delete/:id").delete(DeleteAssets);



export default routes;



























