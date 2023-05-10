import React, { useEffect, useRef, useState } from "react";
import ActionButton from "../../ui/ActionButton";
import { BsCamera } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import cn from "classnames";

import styles from "./styles.module.scss";

const MIN_TEXTAREA_HEIGHT = 40;

type Props = {
    className?: string;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>, text: string, photo: File | null) => Promise<void>;
};

const PostForm: React.FC<Props> = ({ className, handleSubmit }) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [text, setText] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        if (!file) {
            setPreview(null);
            return;
        }
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [file]);

    const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length === 0) {
            setFile(null);
            return;
        }
        setFile(event.target.files[0]);
    };

    useEffect(() => {
        if (textareaRef && textareaRef.current) {
            textareaRef.current.style.height = "inherit";
            textareaRef.current.style.height = `${Math.max(textareaRef.current.scrollHeight, MIN_TEXTAREA_HEIGHT)}px`;
        }
    }, [text]);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        await handleSubmit(event, text, file);
        setText("");
        setFile(null);
    };

    return (
        <form className={cn(styles.form, className)} onSubmit={onSubmit}>
            <label className={styles.label}>
                <textarea
                    ref={textareaRef}
                    className={styles.textarea}
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    name="text"
                    placeholder="What's new?"
                ></textarea>
            </label>
            {file && preview && (
                <div className={styles.imgWrapper}>
                    <button className={styles.removeIconWrapper} onClick={() => setFile(null)}>
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
