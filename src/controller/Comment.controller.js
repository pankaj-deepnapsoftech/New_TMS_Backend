import { StatusCodes } from "http-status-codes";

// ------------------------- local imports here -----------------------------------
import { UserModel } from "../models/User.model.js";
import { CreateCommentService, DeleteCommentService, GetCommentsService, UpdateCommentServices } from "../Services/Comments.services.js";
import {  GetManyNotification,  InsertManyNotification } from "../Services/notification.service.js";
import { PushTaskNotification } from "../socket/notification.socket.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { BadRequestError } from "../utils/CoustomError.js";



// ------------------------------- Comment create api start here ------------------------
export const CreateComment = AsyncHandler(async (req, res) => {
    const data = req.body;
    const result = await CreateCommentService({ ...data, creator: req?.currentUser?._id });
    res.status(StatusCodes.CREATED).json({
        message: "Comment Added Successful",
        data: result
    });
    const assign = await GetCommentsService(result._id);


    if (String(assign[0].tickets.creator) === String(req?.currentUser?._id) && req?.currentUser?.admin) {
        const newData = assign[0]?.tickets?.tasks?.map((item) => ({ creator: req?.currentUser?._id, recipientId: item.assign, title: "comment", message: "Ticket creator add comment", priority: assign?.tickets?.priority || "medium" }))
        const notification = await InsertManyNotification(newData);
        const PushNotification = await GetManyNotification(notification.map((item) => item._id));
        PushTaskNotification(PushNotification);
    } else if (String(assign[0].tickets.creator) === String(req?.currentUser?._id) && !req?.currentUser?.admin) {
        const admin = await UserModel.findOne({ admin: true });
        const newData = assign[0]?.tickets?.tasks?.map((item) => ({ creator: req?.currentUser?._id, recipientId: item.assign, title: "comment", message: "Ticket creator add comment", priority: assign?.tickets?.priority || "medium" }))
        const notification = await InsertManyNotification([...newData, { creator: req?.currentUser?._id, recipientId: admin._id, title: "comment", message: "Ticket creator add comment", priority: assign?.tickets?.priority || "medium" }]);
        const PushNotification = await GetManyNotification(notification.map((item) => item._id));
        PushTaskNotification(PushNotification);
    } else if (assign[0].tickets) {
        const admin = await UserModel.findOne({ admin: true });
        const newData = assign[0]?.tickets?.tasks?.map((item) => ({ creator: req?.currentUser?._id, recipientId: item.assign, title: "comment", message: "Ticket creator add comment", priority: assign?.tickets?.priority || "medium" }))
        const notification = await InsertManyNotification([...newData, { creator: req?.currentUser?._id, recipientId: admin._id, title: "comment", message: "Ticket creator add comment", priority: assign?.tickets?.priority || "medium" },String(admin._id) !== assign[0].tickets.creator && { creator: req?.currentUser?._id, recipientId: admin._id, title: "comment", message: "Ticket creator add comment", priority: assign?.tickets?.priority || "medium" }]);
        const PushNotification = await GetManyNotification(notification.map((item) => item._id));
        PushTaskNotification(PushNotification);
    }
});
// ------------------------------- Comment create api end here ---------------------------



// ----------------------------------- Comment Delete api start here ----------------------
export const DeleteComment = AsyncHandler(async (req, res) => {
    const { id } = req.params;
    const data = await DeleteCommentService(id);
    if (!data) {
        throw new BadRequestError("Comment already Deleted", "DeleteComment function");
    }
    return res.status(StatusCodes.OK).json({
        message: "Comment Delete Successfully",
        data
    });
});
// ------------------------------------ Comment Delete api end here -------------------------



// ------------------------------------ Comment Update api start here ----------------------
export const UpdateComment = AsyncHandler(async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const result = await UpdateCommentServices(id, data);
    if (!result) {
        throw new BadRequestError("Comment not Found", "UpdateComment function");
    }
    return res.status(StatusCodes.OK).json({
        message: "Comment Update Successfully",
        data: result
    });
});
// ------------------------------------ Comment Update api end here -------------------------




















