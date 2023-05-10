import React, { useState } from "react";
import Input from "../../../../components/ui/Input";
import { BsTriangleFill } from "react-icons/bs";

import styles from "./styles.module.scss";

type Props = {
    onSubmit: (event: React.FormEvent<HTMLFormElement>, value: string) => Promise<void>;
};

const MessageForm: React.FC<Props> = ({ onSubmit }) => {
    const [text, setText] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!text) return;
        await onSubmit(event, text);
        setText("");
    };

    return (
        <div className={styles.body}>
            <div className={styles.bodyWrapper}>
                <form className={styles.form} onSubmit={(event) => handleSubmit(event)}>
                    <Input
                        className={styles.input}
                        value={text}
                        onChange={(event) => setText(event.target.value)}
                        placeholder="Write a message..."
                    />
                    <button type="submit">
                        <BsTriangleFill className={styles.sendIcon} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MessageForm;
