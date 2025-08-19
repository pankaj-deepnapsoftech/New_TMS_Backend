import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";


const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    full_name: { type: String, required: true },
    email: { type: String, rquired: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: Schema.Types.ObjectId, ref: "Role" },
    department: { type: Schema.Types.ObjectId, ref: "Department" },
    verification: { type: Boolean, required: true, default: false },
    refresh_token: { type: String }
}, { timestamps: true });

UserSchema.pre("save", async function (next) {
    const user = this
    
    if (!user.isModified('password')) {
        return next()
    }

    user.password = await bcrypt.hash(user.password, 10)
})


UserSchema.index({ email: 1, username: 1 }, { unique: true })

export const UserModel = model("User", UserSchema)



