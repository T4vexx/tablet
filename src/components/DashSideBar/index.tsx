import { NavLinkComponent } from "../NavLinkComponent";

import {RiSendPlaneLine,RiFileSearchLine,RiFile2Line} from "react-icons/ri"

import styles from "./dashsidebar.module.scss";
import { ProfileCard } from "../ProfileCard";

export const DashSideBar = () => {
    return (
        <div className={styles.dash_side_bar_wrap_outbox}>
            <div className={styles.dash_side_bar_wrap}>
                <div className={styles.dash_side_bar_title}>
                    <img src="https://cdn.discordapp.com/attachments/593999593386278912/1009328969973252096/user.png" alt="profile_image"/>
                    <h1>RGX Police</h1>
                </div>
                <div className={styles.dash_side_bar_navLink_wrap}>
                    <NavLinkComponent name="Ocorrências" path="/dashboard/ocorrencias/veiculos"><RiSendPlaneLine/></NavLinkComponent>
                    <NavLinkComponent name="Consultas" path="/dashboard/consultas/cidadaos"><RiFileSearchLine/></NavLinkComponent>
                    <NavLinkComponent name="Serviços" path="/dashboard/servicos/anuncios"><RiFile2Line/></NavLinkComponent>
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