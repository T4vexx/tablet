import styles from "./procuradocard.module.scss";

interface ProcuradoProps {
    name: string;
    phone: string;
    registration: string;
    foto: string;
}

export function ProcuradoOnlyCard({name,phone,registration,foto}: ProcuradoProps)  {
    return (
        <div className={styles.dashboard_card_looked}>
            <div className={styles.dashboard_card_image}>
                <img src={foto} alt="profile"/>
            </div>
            <div className={styles.dashboard_card_text}>
                <h1>{name}</h1>
                <h2>{registration}</h2>
                <p>{phone}</p>
            </div>
        </div>
    );
}