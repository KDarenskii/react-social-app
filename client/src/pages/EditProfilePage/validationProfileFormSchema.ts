import * as yup from "yup";

export const validationProfileFormSchema = yup.object().shape({
    firstName: yup.string().required("Required field").min(2, "Min length: 2").max(20, "Max length: 20"),
    lastName: yup.string().required("Required field").min(2, "Min: length: 2").max(20, "Max length: 20"),
});
