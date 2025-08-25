import {Router} from "express";

// ------------------------------ local imports here ---------------------------------
import { CreateImpDocs, DeleteImpDocs, GetImpDocs, UpdateImpDocs } from "../controller/importantdocs.controller.js";

const routes = Router();

routes.route("/create").post(CreateImpDocs);
routes.route("/get").get(GetImpDocs);
routes.route("/delete/:id").delete(DeleteImpDocs);
routes.route("/update/:id").put(UpdateImpDocs);


export default routes



