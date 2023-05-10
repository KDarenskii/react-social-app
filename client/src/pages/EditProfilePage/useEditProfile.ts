import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useAppSelector } from "../../hooks/helpers/useAppSelector";
import { selectUser } from "../../store/user/selectors";
import { useAppDispatch } from "../../hooks/helpers/useAppDispatch";
import { updateUser } from "../../store/user/thunks/updateUser";
import { validationProfileFormSchema } from "./validationProfileFormSchema";
import { PROFILE_ROUTE } from "../../constants/routesPathnames";

interface FormValues {
    firstName: string;
    lastName: string;
    status: string;
    city: string;
    birthdate: Date | null;
    studiedAt: string;
    photo: File | null;
}

export const useEditProfile = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { firstName, lastName, birthdate, city, status, studiedAt, photo, id } = useAppSelector(selectUser);
    const [isPhotoRemoved, setIsPhotoRemoved] = useState(false);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const initialState: FormValues = {
        firstName,
        lastName,
        birthdate: birthdate ? new Date(birthdate) : null,
        city,
        status,
        studiedAt,
        photo: null,
    };

    const onSubmit = async (values: FormValues) => {
        setSubmitError(null);
        try {
            const formData = new FormData();
            for (const [key, value] of Object.entries(values)) {
                if (key === "birthdate" && value) {
                    formData.append("birthdate", value.toISOString().split("T")[0]);
                } else if (key === "photo" && value) {
                    formData.append("photo", value);
                } else {
                    formData.append(key, value);
                }
            }
            await dispatch(updateUser({ id, data: formData }));
            navigate(`/${PROFILE_ROUTE.NAME}/${id}`);
        } catch (error) {
            setSubmitError("Something went wrong");
        }
    };

    const { handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting, setFieldValue } = useFormik({
        initialValues: initialState,
        onSubmit,
        validationSchema: validationProfileFormSchema,
    });

    const handleDateChange = (date: Date | null, event: React.SyntheticEvent | undefined) => {
        event?.preventDefault();
        setFieldValue("birthdate", date);
    };

    const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsPhotoRemoved(false);
        if (!event.target.files || event.target.files.length === 0) {
            setFieldValue("photo", null);
            return;
        }
        const file = event.target.files[0];
        setFieldValue("photo", file);
    };

    const handleRemovePhoto = () => {
        setIsPhotoRemoved(true);
        setFieldValue("photo", null);
    };

    useEffect(() => {
        if (!values.photo) {
            setPhotoPreview(null);
            return;
        }
        const objectUrl = URL.createObjectURL(values.photo);
        setPhotoPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [values.photo]);

    return {
        handleChange,
        handleBlur,
        handleDateChange,
        handleSelectFile,
        handleSubmit,
        handleRemovePhoto,
        photo,
        photoPreview,
        isPhotoRemoved,
        values,
        errors,
        isSubmitting,
        touched,
        submitError,
        id,
    };
};
