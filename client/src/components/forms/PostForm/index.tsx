import React from "react";
import ActionButton from "../../ui/ActionButton";
import { BsCamera } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { usePostForm } from "./usePostForm";
import cn from "classnames";

import styles from "./styles.module.scss";

type Props = {
    className?: string;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>, text: string, photo: File | null) => Promise<void>;
};

const PostForm: React.FC<Props> = ({ className, handleSubmit }) => {
    const { textareaRef, text, handleTextChange, handleSelectFile, clearTextField, handleRemoveFile, preview, file } =
        usePostForm();

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        await handleSubmit(event, text, file);
        clearTextField();
        handleRemoveFile();
    };

    return (
        <form className={cn(styles.form, className)} onSubmit={onSubmit}>
            <label className={styles.label}>
                <textarea
                    ref={textareaRef}
                    className={styles.textarea}
                    value={text}
                    onChange={handleTextChange}
                    name="text"
                    placeholder="What's new?"
                ></textarea>
            </label>
            {file && preview && (
                <div className={styles.imgWrapper}>
                    <button className={styles.removeIconWrapper} onClick={handleRemoveFile}>
                        <GrClose className={styles.removeIcon} />
                    </button>
                    <img className={styles.imgPreview} src={preview} alt="" />
                </div>
            )}
            <div className={styles.footer}>
                <div className={styles.actions}>
                    <label className={styles.actionBtn}>
                        <BsCamera className={styles.actionIcon} />
                        <input
                            className="visually-hidden"
                            value={""}
                            onChange={handleSelectFile}
                            type="file"
                            accept="image/png, image/jpeg"
                        />
                    </label>
                </div>
                <ActionButton className={styles.submitBtn} colorType="info">
                    Post
                </ActionButton>
            </div>
        </form>
    );
};

export default PostForm;
