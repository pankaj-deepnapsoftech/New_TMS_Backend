import { string, object } from "yup";


export const RegisterValidation = object({
    username: string().min(2).required("Username is Required field"),
    full_name: string().min(2).required("Full Name is Required field"),
    email: string().email().required("email is Required field"),
    phone: string().min(10).max(12).required("Phone is Required field"),
    password: string().min(8).max(16).required("Password is Required field"),
});


export const LoginValidation = object({
    username:string().required("email or Username is required field"),
    password:string().min(8).max(16).required("Password is required field")
})
















