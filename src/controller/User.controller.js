import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";

// ------------------------------ local import here ---------------------------
import { config } from "../config/env.config.js";
import { SendMail } from "../helper/SendMain.js";
import { CreateUserService, FindByUsernameOrEmail, UpdateUser } from "../Services/User.services.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { BadRequestError } from "../utils/CoustomError.js";
import { SingToken } from "../utils/TokenHandler.js";


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
    SendMail("EmailVerification.ejs", { userName: create.username, verificationLink: verificationLink })
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





