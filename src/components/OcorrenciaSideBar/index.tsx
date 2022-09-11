import { NavLinkComponent } from "../NavLinkComponent";

import { BiLock, BiShieldAlt2, BiSearchAlt, BiFileBlank } from "react-icons/bi"

import styles from "./ocorrenciasidebar.module.scss";
import { ProfileCard } from "../ProfileCard";
import { useNavigate } from "react-router-dom";

interface OcorrenciaSideBarProps {
    animate?: boolean;
}

export const OcorrenciaSideBar = ({animate = false}:OcorrenciaSideBarProps) => {
    const navigate = useNavigate();

    return (
        <div className={styles.dash_side_bar_wrap_outbox}>
            <div className={styles.dash_side_bar_wrap}>
                <div onClick={() => navigate("/dashboard")} className={styles.dash_side_bar_title}>
                    <h1>Ocorrências</h1>
                </div>
                <div className={animate ? styles.dash_side_bar_navLink_wrap : styles.dash_side_bar_navLink_wrap2}>
                    <NavLinkComponent name="Deter veículos" path="/dashboard/ocorrencias/veiculos"><BiLock /></NavLinkComponent>
                    <NavLinkComponent name="Prender/Multar" path="/dashboard/ocorrencias/multar"><BiShieldAlt2/></NavLinkComponent>
                    <NavLinkComponent name="Procurado" path="/dashboard/ocorrencias/procurado"><BiSearchAlt/></NavLinkComponent>
                    <NavLinkComponent name="Relatório" path="/dashboard/ocorrencias/relatorio"><BiFileBlank/></NavLinkComponent>
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

