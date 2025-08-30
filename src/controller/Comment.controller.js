import { StatusCodes } from "http-status-codes";

// ------------------------- local imports here -----------------------------------
import { UserModel } from "../models/User.model.js";
import { CreateCommentService, DeleteCommentService, GetCommentsService, UpdateCommentServices } from "../Services/Comments.services.js";
import { CreateNotificationService, GetManyNotification, GetSingleNotificationservice, InsertManyNotification } from "../Services/notification.service.js";
import { PushTaskNotification } from "../socket/notification.socket.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { BadRequestError } from "../utils/CoustomError.js";



// ------------------------------- Comment create api start here ------------------------
export const CreateComment = AsyncHandler(async (req, res) => {
    const data = req.body;
    const result = await CreateCommentService({ ...data, creator: req?.currentUser?._id });

    res.status(StatusCodes.CREATED).json({
        message: "Comment Added Successfully",
        data: result
    });

    const assign = await GetCommentsService(result._id);

    if (!assign?.length) return;

    const ticket = assign[0]?.tickets;
    const task = assign[0]?.tasks;
    const currentUserId = String(req?.currentUser?._id);
    const isAdmin = req?.currentUser?.admin;

    // ---- CASE 1: Ticket creator is current user & Admin ----
    if (String(ticket?.creator) === currentUserId && isAdmin) {
        const newData = ticket?.tasks?.map(item => ({
            creator: currentUserId,
            recipientId: item.assign,
            title: "comment",
            message: "Ticket creator added a comment",
            priority: ticket?.priority || "medium"
        })) || [];

        if (newData.length) {
            const notification = await InsertManyNotification(newData);
            const PushNotification = await GetManyNotification(notification.map(i => i._id));
            PushTaskNotification(PushNotification);
        }

        // ---- CASE 2: Ticket creator is current user & NOT Admin ----
    } else if (String(ticket?.creator) === currentUserId && !isAdmin) {
        const admin = await UserModel.findOne({ admin: true });
        const newData = (ticket?.tasks?.map(item => ({
            creator: currentUserId,
            recipientId: item.assign,
            title: "comment",
            message: "Ticket creator added a comment",
            priority: ticket?.priority || "medium"
        })) || []);

        newData.push({
            creator: currentUserId,
            recipientId: admin._id,
            title: "comment",
            message: "Ticket creator added a comment",
            priority: ticket?.priority || "medium"
        });

        const notification = await InsertManyNotification(newData);
        const PushNotification = await GetManyNotification(notification.map(i => i._id));
        PushTaskNotification(PushNotification);

        // ---- CASE 3: Ticket exists but not created by current user ----
    } else if (ticket) {
        const admin = await UserModel.findOne({ admin: true });
        let newData = (ticket?.tasks?.map(item => ({
            creator: currentUserId,
            recipientId: item.assign,
            title: "comment",
            message: "Ticket creator added a comment",
            priority: ticket?.priority || "medium"
        })) || []);

        // Add admin only if admin is not ticket creator
        if (String(admin._id) !== String(ticket?.creator)) {
            newData.push({
                creator: currentUserId,
                recipientId: admin._id,
                title: "comment",
                message: "Ticket creator added a comment",
                priority: ticket?.priority || "medium"
            });
        }

        const notification = await InsertManyNotification(newData);
        const PushNotification = await GetManyNotification(notification.map(i => i._id));
        PushTaskNotification(PushNotification);

        // ---- CASE 4: Task creator is current user & Admin ----
    } else if (String(task?.creator) === currentUserId && isAdmin) {
        const notification = await CreateNotificationService({
            creator: currentUserId,
            recipientId: task?.assign,
            title: "task comment",
            message: "Task has a new comment",
            priority: data.priority || "medium"
        });

        const PushNotification = await GetSingleNotificationservice(notification._id);
        PushTaskNotification(PushNotification);

        // ---- CASE 5: Task creator is current user & NOT Admin ----
    } else if (String(task?.creator) === currentUserId && !isAdmin) {
        const admin = await UserModel.findOne({ admin: true });
        const newData = [
            {
                creator: currentUserId,
                recipientId: task?.assign,
                title: "task comment",
                message: "Task has a new comment",
                priority: ticket?.priority || "medium"
            },
            {
                creator: currentUserId,
                recipientId: admin._id,
                title: "task comment",
                message: "Task has a new comment",
                priority: ticket?.priority || "medium"
            }
        ];

        const notification = await InsertManyNotification(newData);
        const PushNotification = await GetManyNotification(notification.map(i => i._id));
        PushTaskNotification(PushNotification);

        // ---- CASE 6: Task exists but not created by current user ----
    } else if (task) {
        const admin = await UserModel.findOne({ admin: true });
        let newData = [
            {
                creator: currentUserId,
                recipientId: task?.creator,
                title: "task comment",
                message: "Task has a new comment",
                priority: ticket?.priority || "medium"
            }
        ];

        if (String(admin._id) !== String(task?.creator)) {
            newData.push({
                creator: currentUserId,
                recipientId: admin._id,
                title: "task comment",
                message: "Task has a new comment",
                priority: ticket?.priority || "medium"
            });
        }

        const notification = await InsertManyNotification(newData);
        const PushNotification = await GetManyNotification(notification.map(i => i._id));
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




















