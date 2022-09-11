import { usePlayer } from "../../core/hooks/usePlayer";
import styles from "./profilecard.module.scss";

export const ProfileCard = () => {
    const playerData = usePlayer()

    return (
        <div className={styles.dash_side_bar_profile_wrap}>
            <img src={playerData.foto} alt="profile_image"/>
            <div className={styles.dash_side_bar_profile_texts}>
                <h1>{playerData.name} {playerData.secondName}</h1>
                <h2>{playerData.registration}</h2>
            </div>
        </div>
    );
}