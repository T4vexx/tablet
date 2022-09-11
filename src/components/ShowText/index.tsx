import styles from "./showtext.module.scss"

interface ShowTextProps {
    label: string;
    text?: string;
    number?: number;
    width?: string;
}

export const ShowText = ({ label, width, text, number }:ShowTextProps) => {

    if (number === undefined || number === null || number === 0) {
        return (
            <div className={styles.show_text_wrap}>
                <h1>{label}</h1>
                <div style={ text ? {width: width} : {background: "rgba(174, 174, 174, 0.5)",width: width} } className={styles.show_text}>{text}</div>
            </div>
        );
    } else {
        return (
            <div className={styles.show_text_wrap}>
                <h1>{label}</h1>
                <div style={ number ? {width: width} : {background: "rgba(174, 174, 174, 0.5)",width: width} } className={styles.show_text}>{number}</div>
            </div>
        );
    }
}