import { BsPerson, BsSearch, BsJournal } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { NavLinkComponent } from "../NavLinkComponent";
import { ProfileCard } from "../ProfileCard";

import styles from "./consultadashbar.module.scss"

interface ConsultaDashBarProps {
    animate?: boolean;
}

export const ConsultaDashBar = ({animate = false}: ConsultaDashBarProps) => {
    const navigate = useNavigate();

    return (
        <div className={styles.dash_side_bar_wrap_outbox}>
            <div className={styles.dash_side_bar_wrap}>
                <div onClick={() => navigate("/dashboard")} className={styles.dash_side_bar_title}>
                    <h1>Consultas</h1>
                </div>
                <div className={animate ? styles.dash_side_bar_navLink_wrap : styles.dash_side_bar_navLink_wrap2}>
                    <NavLinkComponent name="Cidadãos" path="/dashboard/consultas/cidadaos"><BsPerson /></NavLinkComponent>
                    <NavLinkComponent name="Consultar Placa" path="/dashboard/consultas/consultar_placa"><BsSearch /></NavLinkComponent>
                    <NavLinkComponent name="Codigo Penal" path="/dashboard/consultas/codigo_penal"><BsJournal /></NavLinkComponent>
                </div>
                <div className={styles.dash_side_bar_profile_wrap}>
                    <ProfileCard />
                </div>
            </div>
            <div className={styles.dash_side_bar_navLink_divider}>

            </div>
        </div>
    );
}