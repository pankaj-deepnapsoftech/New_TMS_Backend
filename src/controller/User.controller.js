import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";

// ------------------------------ local import here ---------------------------
import { config } from "../config/env.config.js";
import { SendMail } from "../helper/SendMain.js";
import { CreateUserService, FindAllUsers, FindById, FindByUsernameOrEmail, UpdateUser } from "../Services/User.services.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { BadRequestError } from "../utils/CoustomError.js";
import { SingToken, VerifyToken } from "../utils/TokenHandler.js";
import { UserModel } from "../models/User.model.js";


// --------------------------- user registeration code start here ------------------------------
export const RegisterUser = AsyncHandler(async (req, res) => {
    const data = req.body;
    const exist = await FindByUsernameOrEmail(data.username, data.email);
    if (exist) {
        throw new BadRequestError("user already exist", "user Regiteration Function");
    }
    const create = await CreateUserService(data);
    const token = SingToken({ email: create.email, id: create._id }, "1day");
    const verificationLink = `${config.NODE_ENV === "development" ? config.LOCAL_BACKEND_URL : config.BACKEND_URL}/user/verify?token=${token}`
    SendMail("EmailVerification.ejs", { userName: create.username, verificationLink: verificationLink }, { subject: "Email verification", email: create.email })
    return res.status(StatusCodes.CREATED).json({
        message: "User Created Successfully"
    });
});
// -------------------------- user registeration code end here -----------------------------------



// --------------------------- user login code start here ------------------------------------------------
export const Loginuser = AsyncHandler(async (req, res) => {
    const { username, password } = req.body;


    const user = await FindByUsernameOrEmail(username, username);

    if (!user) {
        throw new BadRequestError("Bad Credintials", "Login user function")
    }

    const isCurrectPassword = await bcrypt.compare(password, user.password);

    if (!isCurrectPassword) {
        throw new BadRequestError("Bad Credintials", "Login user function")
    }

    const access_token = SingToken({ username: user.username, id: user._id }, "30day");
    const refresh_token = SingToken({ username: user.username, id: user._id }, "31day");

    res.cookie("at", access_token, {
        httpOnly: true,      // JS can't read it
        secure: config.NODE_ENV !== "development", // HTTPS only
        sameSite: "strict",  // Prevent CSRF
        maxAge: 1000 * 60 * 60 * 24 * 30, // 1 hour
        path: "/",           // Valid for whole site
    }).cookie("rt", refresh_token, {
        httpOnly: true,      // JS can't read it
        secure: config.NODE_ENV !== "development", // HTTPS only
        sameSite: "strict",  // Prevent CSRF
        maxAge: 1000 * 60 * 60 * 24 * 31, // 1 hour
        path: "/",           // Valid for whole site
    });

    res.status(StatusCodes.OK).json({
        message: "User login Successfully",
        access_token,
        refresh_token
    })

    await UpdateUser(user._id, { refresh_token });

});
// ------------------------ user login code end here ---------------------------------------



// -------------------------- loged in user data get api start here  ------------------------------------
export const getLogedInUser = AsyncHandler(async (req, res) => {

    return res.status(StatusCodes.OK).json({
        user: req.currentUser
    });
})
// --------------------------- loged in user date get api end here -------------------------------------



// -------------------------- logout user api start here ---------------------------------
export const logoutUser = AsyncHandler(async (req, res) => {
    if (!req.currentUser) {
        throw new BadRequestError("User not authenticate", "Logout user function")
    }
    res.clearCookie('at').clearCookie('rt').status(StatusCodes.OK).json({
        message: "User logout successfully"
    });

    await UpdateUser(req.currentUser._id, { refresh_token: null })

});
// ----------------------------- login user api end here -------------------------------------



// ------------------------------ Verify Email code start here ------------------------------------
export const verifyEmail = AsyncHandler(async (req, res) => {
    const token = req.query;
    if (!token) {
        throw new BadRequestError("Invalid Email", "verifyEmail function");
    }

    const { id } = VerifyToken(token);

    const user = await FindById(id);

    if (!user) {
        throw new BadRequestError("Invalid Token", "verifyEmail function");
    }

    return res.redirect(config.NODE_ENV === "development" ? config.LOCAL_CLIENT_URL : config.CLIENT_URL);
});
// ----------------------------------- Verify Email code end here ---------------------------------------



// --------------------------------- AllUser data api start here --------------------------
export const AllUsers = AsyncHandler(async (req, res) => {

    if (req?.currentUser?.admin) {
        return res.status(StatusCodes.OK).json({
            data: []
        });
    }
    const { page, limit } = req.query;
    const pages = parseInt(page) || 1;
    const limits = parseInt(limit) || 10;
    const skip = (pages - 1) * limits;
    const data = await FindAllUsers(skip, limits);
    return res.status(StatusCodes.OK).json({
        data
    });
});
// -------------------------------- AllUser data api end here ------------------------------


// -------------------------------- user update api start here ----------------------------
export const updateUserData = AsyncHandler(async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const result = await UpdateUser(id, data);
    if (!result) {
        throw new BadRequestError("User not found", "updateUserData function")
    }
    return res.status(StatusCodes.OK).json({
        message: "User updated Successfully",
        data: result
    });
});
// ------------------------------ user update api end here -------------------------------



// -----------------------------  all User For assigning code start here -----------------
export const assignedAllUserData = AsyncHandler(async (req,res) => {
    const data = await UserModel.find({admin:false}).select("full_name username");
    return res.status(StatusCodes.OK).json({
        data
    });
});
// ------------------------------ all users for assigning code end here ---------------------







