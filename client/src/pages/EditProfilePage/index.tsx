import React from "react";
import Avatar from "../../components/Avatar";
import Label from "../../components/ui/Label";
import Input from "../../components/ui/Input";
import { Link } from "react-router-dom";
import { PROFILE_ROUTE } from "../../constants/routesPathnames";
import ActionButton from "../../components/ui/ActionButton";
import InputDate from "../../components/ui/InputDate";
import FieldError from "../../components/forms/FieldError";
import { BsCamera } from "react-icons/bs";
import { useEditProfile } from "./useEditProfile";
import { IoMdClose } from "react-icons/io";
import cn from "classnames";

import styles from "./styles.module.scss";
import Alert from "../../components/Alert";
import { ALERT } from "../../constants/alert";

const EditProfilePage: React.FC = () => {
    const {
        handleChange,
        handleBlur,
        handleDateChange,
        handleSelectFile,
        handleSubmit,
        handleRemovePhoto,
        photo,
        photoPreview,
        isPhotoRemoved,
        errors,
        isSubmitting,
        touched,
        values,
        submitError,
        id,
    } = useEditProfile();

    return (
        <div className={styles.page}>
            <form onSubmit={handleSubmit}>
                <header className={styles.header}>
                    {submitError && <Alert className={styles.alert} type={ALERT.ERROR}>{submitError}</Alert>}
                    <div className={styles.avatarWrapper}>
                        <IoMdClose className={styles.deleteIcon} onClick={handleRemovePhoto} />
                        <label
                            className={cn(
                                styles.avatarLabel,
                                !photoPreview && styles.active,
                                isSubmitting && styles.disabled
                            )}
                        >
                            {photoPreview ? (
                                <img className={styles.photoPreview} src={photoPreview} alt="Avatar" />
                            ) : (
                                <>
                                    {isPhotoRemoved ? (
                                        <Avatar className={styles.avatar} src={null} />
                                    ) : (
                                        <Avatar
                                            className={styles.avatar}
                                            src={photo ? process.env.REACT_APP_SERVER_URL + "/users/" + photo : null}
                                        />
                                    )}
                                </>
                            )}
                            <BsCamera className={cn(styles.cameraIcon, !photoPreview && styles.active)} />
                            <input
                                className="visually-hidden"
                                onChange={handleSelectFile}
                                value={""}
                                type="file"
                                accept="image/png, image/jpeg"
                                disabled={isSubmitting}
                            />
                        </label>
                    </div>
                    <div className={styles.headerWrapper}>
                        <Label className={styles.label}>
                            <Input
                                className={styles.input}
                                value={values.firstName}
                                name="firstName"
                                placeholder="Name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                disabled={isSubmitting}
                            />
                            {errors.firstName && touched.firstName && (
                                <FieldError className={styles.fieldError}>{errors.firstName}</FieldError>
                            )}
                        </Label>
                        <Label>
                            <Input
                                className={styles.input}
                                value={values.lastName}
                                name="lastName"
                                placeholder="Surname"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                disabled={isSubmitting}
                            />
                            {errors.lastName && errors.lastName && (
                                <FieldError className={styles.fieldError}>{errors.lastName}</FieldError>
                            )}
                        </Label>
                    </div>
                    <Link className={styles.returnLink} to={`/${PROFILE_ROUTE.NAME}/${id}`}>
                        <ActionButton className={styles.returnBtn} colorType="light" size="sm">
                            Return
                        </ActionButton>
                    </Link>
                </header>
                <div className={styles.body}>
                    <Label className={cn(styles.label, styles.inline)} text="Birthday:">
                        <InputDate
                            className={styles.dateInput}
                            wrapperClassName={styles.dateInputWrapper}
                            name="birthday"
                            selected={values.birthdate}
                            onChange={(date, event) => handleDateChange(date, event)}
                            placeholderText="Birthday"
                            maxDate={new Date()}
                            disabled={isSubmitting}
                        />
                    </Label>
                    <Label className={styles.label} text="Status:">
                        <Input
                            className={styles.input}
                            value={values.status}
                            name="status"
                            placeholder="Status"
                            onChange={handleChange}
                            disabled={isSubmitting}
                        />
                    </Label>
                    <Label className={styles.label} text="City:">
                        <Input
                            className={styles.input}
                            value={values.city}
                            name="city"
                            placeholder="City"
                            onChange={handleChange}
                            disabled={isSubmitting}
                        />
                    </Label>
                    <Label className={styles.label} text="Studied at:">
                        <Input
                            className={styles.input}
                            value={values.studiedAt}
                            name="studiedAt"
                            placeholder="Status"
                            onChange={handleChange}
                            disabled={isSubmitting}
                        />
                    </Label>
                    <ActionButton
                        className={styles.submitBtn}
                        colorType="info"
                        type="submit"
                        size="sm"
                        disabled={isSubmitting}
                    >
                        Save
                    </ActionButton>
                </div>
            </form>
        </div>
    );
};

export default EditProfilePage;
