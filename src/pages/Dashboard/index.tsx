import Container from "../../components/container";
import { DashSideBar } from "../../components/DashSideBar";
import { FiMapPin, FiToggleLeft } from "react-icons/fi"
import { ProcuradoCard } from "../../components/ProcuradoCard";
import { useNuiRequest } from "fivem-nui-react-lib";

import styles from "./dashboard.module.scss"

export default function Dashboard() {
    const { send } = useNuiRequest()

    const toggleService = () => {
        send("toggleService",{})
    }

    const informQTH = () => {
        send("informQTH",{})
    }

    return (
        <Container redirects={false} >
            <div className={styles.dashboard_wrap}>
                <DashSideBar />
                
                <div className={styles.dashboard_menu}>
                    <h1>Principal</h1>
                    <div className={styles.dashboard_card_car_outbox}>
                        <h2>Todos os procurados</h2>
                        <ProcuradoCard />
                    </div>

                    <div className={styles.dashboard_toggle}>
                        <h2>ENTRAR/SAIR DE SERVIÇO</h2>
                        <button type="button" onClick={toggleService}><FiToggleLeft /><span>Entrar/Sair</span></button>
                    </div>

                    <div className={styles.dashboard_localizacao}>
                        <h2>INFORMAR LOCALIZAÇÃO</h2>
                        <button onClick={informQTH} type="button"><FiMapPin /><span>Localização</span></button>
                    </div>
                </div>
            </div>
        </Container>
    );
}