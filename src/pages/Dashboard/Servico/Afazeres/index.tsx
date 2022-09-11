import { useNuiCallback, useNuiRequest } from "fivem-nui-react-lib";
import { useEffect, useState } from "react";
import { BiCalendarExclamation, BiCheckCircle, BiMessageSquareDetail, BiUser } from "react-icons/bi";
import Container from "../../../../components/container";
import { ServicosSideBar } from "../../../../components/ServicosSideBar";

import styles from "./afazeres.module.scss"
 
interface AfazeresProps {
    mensagem: string;
    oficial_name: string;
    oficial_id: number;
    data: string;
}

export const Afazeres = () => {
    const { send } = useNuiRequest()
    const [tooltip,setTooltip] = useState<boolean>(false)
    const [dataTooltip,setDataTooltip] = useState<string>('')

    const [afazeresTasks, setAfazeresTasks] = useState<AfazeresProps[]>([]);
    const [fetchMyMethod] = useNuiCallback("REACTNUI", "getPlayerTasks", setAfazeresTasks);

    const toggleTooltip = () => {
        setDataTooltip('')
        setTooltip(!tooltip)
    }

    const handleConcluirTask = (mensagem:string,oficial:number) => {
        send("taskFineshed",{mensagem,oficial})
        setAfazeresTasks([])
        setTimeout(fetchMyMethod,1000)
    }

    useEffect(() => {
        fetchMyMethod({})
    },[fetchMyMethod,afazeresTasks])

    return (
        <Container>
            <div className={styles.anuncios_wrap}>
                <ServicosSideBar />
                
                <div className={styles.anuncios_menu}>
                    <h1>AFAZERES</h1>

                    <div className={styles.afazeres_list_wrap}>
                        <div className={styles.afazeres_list_header}>
                            <h2>Tarefas: </h2>
                            <div className={styles.afazeres_list_body}>
                                <div className={styles.afazeres_list_body_cabecalho}>
                                    <h3 ><BiMessageSquareDetail /><p>Mensagem</p></h3>
                                    <h3><BiCalendarExclamation /><p>Prazo</p></h3>
                                    <h3><BiUser /><p>Oficial</p></h3>
                                    <h3><BiCheckCircle /><p>Confirmar</p></h3>
                                </div>
                                <div className={styles.afazeres_list_body_corpo}>
                                    {afazeresTasks.map((a,index) => (
                                        <div key={index} className={styles.task_box}>
                                            <div onClick={() => {
                                                    setDataTooltip(a.mensagem)
                                                    setTooltip(true)
                                                }} 
                                                className={styles.mensagem_wrap}
                                            >
                                                {a.mensagem}
                                            </div>
                                            <h3>{a.data}</h3>
                                            <h3>{a.oficial_name}</h3>
                                            <button onClick={() => handleConcluirTask(a.mensagem,a.oficial_id)}>CONCLUIR</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    {tooltip && (<div className={styles.tooltip}>
                        <div className={styles.tooltip_container}>
                            <h1>Mensagem</h1>
                            <div className={styles.divider}></div>
                            <div className={styles.tooltip_data}>{dataTooltip}</div>
                            <button onClick={toggleTooltip}>FECHAR</button>
                        </div>
                    </div>)}
                </div>            
            </div>
        </Container>
    );
}

