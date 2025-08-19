import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";

// ------------------------------ local import here ---------------------------
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
    await CreateUserService(data);
    return res.status(StatusCodes.CREATED).json({
        message: "User Created Successfully"
    });
});
// -------------------------- user registeration code end here -----------------------------------



// --------------------------- user login code start here ------------------------------------------------
export const Loginuser = AsyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const user = await FindByUsernameOrEmail(username);

    if (!user) {
        throw new BadRequestError("Bad Credintials", "Login user function")
    }

    const isCurrectPassword = await bcrypt.compare(password,user.password);

    if (!isCurrectPassword) {
        throw new BadRequestError("Bad Credintials", "Login user function")
    }

    const access_token = SingToken({username:user.username,id:user._id},"30day");
    const refresh_token = SingToken({username:user.username,id:user._id},"31day");

    res.status(StatusCodes.OK).json({
        access_token,
        refresh_token
    })

    await UpdateUser(user._id,{refresh_token});

});
// ------------------------ user login code end here ---------------------------------------








