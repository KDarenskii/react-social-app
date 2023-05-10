import * as yup from "yup";

export const loginValidationSchema = yup.object().shape({
    email: yup.string().required("Required field").trim().email("Invalid email"),
    password: yup.string().required("Required field").trim().min(3, "Min length: 3"),
});
