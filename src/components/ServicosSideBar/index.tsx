import { NavLinkComponent } from "../NavLinkComponent";

import { BiVolumeFull, BiListCheck } from "react-icons/bi"
import { AiOutlineAppstoreAdd } from "react-icons/ai"

import styles from "./anunciossidebar.module.scss";
import { ProfileCard } from "../ProfileCard";
import { useNavigate } from "react-router-dom";

interface ServicosSideBarProps {
    animate?: boolean;
}

export const ServicosSideBar = ({animate = false}: ServicosSideBarProps) => {
    const navigate = useNavigate();

    return (
        <div className={styles.dash_side_bar_wrap_outbox}>
            <div className={styles.dash_side_bar_wrap}>
                <div onClick={() => navigate("/dashboard")} className={styles.dash_side_bar_title}>
                    <h1>Serviços</h1>
                </div>
                <div className={animate ? styles.dash_side_bar_navLink_wrap : styles.dash_side_bar_navLink_wrap2}>
                    <NavLinkComponent name="Anúncios" path="/dashboard/servicos/anuncios"><BiVolumeFull /></NavLinkComponent>
                    <NavLinkComponent name="Afazeres" path="/dashboard/servicos/afazeres"><BiListCheck/></NavLinkComponent>
                    <NavLinkComponent name="Criar Tarefa" path="/dashboard/servicos/sendtask"><AiOutlineAppstoreAdd/></NavLinkComponent>
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

