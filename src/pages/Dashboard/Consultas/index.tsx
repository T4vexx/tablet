import { useEffect, useState } from "react";
import { useNuiCallback } from "fivem-nui-react-lib";

import { BsClipboard, BsPerson, BsSticky } from "react-icons/bs";
import { FiRefreshCw } from "react-icons/fi"
import { ConsultaDashBar } from "../../../components/ConsultasSideBar";

import Container from "../../../components/container";
import styles from "./consultas.module.scss"
import { ModalPlayerInformation } from "../../../components/ModalPlayerInformation";
import { Input } from "../../../components/Form/Input";

interface DataPlayersOnlineProps {
    user_id: number, 
    registration: string, 
    phone: string,
    name: string,
    age: number,
    foto: string,
    foragido: number,
    porte: number,
    multas: number,
}

export default function Consultas() {
    const [query,setQuery] = useState<string>('')
    const [modalPlayerInformation,setModalPlayerInformation] = useState<boolean>(false)
    const [playerInformation,setPlayerInformation] = useState<DataPlayersOnlineProps>()
    const [allPlayersOnlineData, setAllPlayersOnlineData] = useState<DataPlayersOnlineProps[]>([]);
    const [fetchMyMethod] = useNuiCallback("REACTNUI", "getAllPlayersOnlineData", setAllPlayersOnlineData);

    const toggleModalPlayerInformation = () => {
        setModalPlayerInformation(!modalPlayerInformation)
    }

    const handleValueInput = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setQuery(event.target.value)
    }

    useEffect(() => {
        fetchMyMethod({})
    },[fetchMyMethod])

    return (
        <Container>
            <div className={styles.dashboard_wrap}>
                <ConsultaDashBar animate={true} />
                
                <div className={styles.consultas_cidadaos_menu}>
                    <h1>CIDADÃO ONLINE</h1>

                    <div className={styles.consultas_cidadaos_online}>
                        <div className={styles.consultas_cidadaos_online_header}>
                            <h2><BsPerson /><p>ID</p></h2>
                            <h2><BsSticky /><p>Nome</p></h2>
                            <h2><BsClipboard /><p>Registro</p></h2>
                        </div>
                        
                        <div className={styles.consultas_cidadaos_online_body}>
                            {allPlayersOnlineData.filter((p) => p.name.toLowerCase().includes(query)).map(p => (
                                <div onClick={() => {
                                        setPlayerInformation(p)
                                        toggleModalPlayerInformation()
                                    }} 
                                    className={styles.cidadao_online}
                                >
                                    <h2>{p.user_id}</h2>
                                    <h2>{p.name}</h2>
                                    <h2>{p.registration}</h2>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.consultas_cidadaos_online_footer}>
                        <div className={styles.filtrar_online}>
                            <Input width="450px" label="Filtrar por nome" nome="filtrar" onChange={(e) => handleValueInput(e)} />
                        </div>

                        <div className={styles.filtrar_online_icon} onClick={() => fetchMyMethod({})}>
                            <FiRefreshCw />
                        </div>
                    </div>
                    {modalPlayerInformation ? <ModalPlayerInformation reCreate={fetchMyMethod} player={playerInformation} handleCloseModal={toggleModalPlayerInformation} /> : ''}
                </div>
            </div>
        </Container>
    );
}