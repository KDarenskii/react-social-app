import * as yup from "yup";

const REQUIRED_ERROR = "Required field";

export const registrationValidationSchema = yup.object().shape({
    firstName: yup.string().required(REQUIRED_ERROR).trim().min(2, "Min length: 2"),
    lastName: yup.string().required(REQUIRED_ERROR).trim().min(2, "Min length: 2"),
    email: yup.string().required(REQUIRED_ERROR).trim().email("Invalid email"),
    password: yup.string().required(REQUIRED_ERROR).trim().min(3, "Min length: 3"),
});
