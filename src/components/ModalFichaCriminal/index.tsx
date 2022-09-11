import { useEffect, useState } from "react";

import { AiOutlineStop } from "react-icons/ai"
import { RiTimerLine,RiCalendarEventLine } from "react-icons/ri"
import { BsCreditCard, BsQuestionCircle } from "react-icons/bs"
import { TbClipboardList } from "react-icons/tb"

import styles from "./modalfichacriminal.module.scss"
import { useNuiCallback, useNuiRequest } from "fivem-nui-react-lib";

interface FichalCriminalProps {
    responsavelId: number,
    infracao: string, 
    tempo: number, 
    multa: number,
    data: string,
}

interface ModalAplicarMultaProps {
    duser_id?: string;
    handleFecharModal2: () => void;
}

export const ModalFichaCriminal = ({duser_id,handleFecharModal2}: ModalAplicarMultaProps) => {
    const { send } = useNuiRequest()
    const [fichaCriminal, setFichaCriminal] = useState<FichalCriminalProps[]>([]);
    const [confirmLimparFicha, setConfirmLimparFicha] = useState<boolean>(false);
    const [fetchMyMethod] = useNuiCallback("REACTNUI", "getFichaCriminal", setFichaCriminal);
    
    const toggleConfirmLimparFicha = () => {
        setConfirmLimparFicha(!confirmLimparFicha)
    }

    const handleLimparFichaCriminal = () => {
        send("wipeFichaCriminal", { id: duser_id })
        handleFecharModal2()
    }

    useEffect(()=>{
        fetchMyMethod({id: duser_id})
        
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[fetchMyMethod])

    return (
        <div className={styles.modal_wrap}>
            <div className={styles.modal_multar_procurar}>
                <div className={styles.modal_multar_procurar_header}>
                    <button className={styles.cor_azul} onClick={handleFecharModal2}>Fechar</button>
                    <button className={styles.cor_vermelho} onClick={toggleConfirmLimparFicha} >Limpar Ficha</button>
                </div>
                <div className={styles.modal_multar_procurar_table}>
                    <div className={styles.modal_multar_procurar_table_header}>
                        <h2><TbClipboardList /><p>Responsavel</p></h2>
                        <h2><AiOutlineStop /><p>Infrações</p></h2>
                        <h2><RiTimerLine /><p>Tempo(Meses)</p></h2>
                        <h2><BsCreditCard /><p>Multas</p></h2>
                        <h2><RiCalendarEventLine /><p>Data</p></h2>
                    </div>
                    <div className={styles.modal_multar_procurar_table_body}>
                        {fichaCriminal?.map((infracoa: FichalCriminalProps, index: number) => {
                            return (
                                <div 
                                    id={String(index)}
                                    key={infracoa.infracao} 
                                    className={styles.infracao_infos} 
                                >
                                    <h3>{infracoa.responsavelId}</h3>
                                    <h4>{infracoa.infracao}</h4>
                                    <h3>{infracoa.tempo}</h3>
                                    <h3>{infracoa.multa}</h3>
                                    <h4>{infracoa.data}</h4>
                                </div>
                            );
                        })}
                    </div>
                    {confirmLimparFicha ? (
                            <div className={styles.alert_wrap}>
                                <div className={styles.modal_alert}>
                                    <div className={styles.alert_icon}><BsQuestionCircle /></div>
                                    <div className={styles.alert_divider}></div>
                                    <div className={styles.alert_text}>Deseja realmente limpar a ficha do id {duser_id}?</div>
                                    <div className={styles.alert_buttons}>
                                        <button className={styles.cor_vermelho} type="button" onClick={toggleConfirmLimparFicha}>Cancelar</button>
                                        <button className={styles.cor_azul} type="button" onClick={() => {
                                            handleLimparFichaCriminal()
                                            toggleConfirmLimparFicha()
                                        }}>Confirmar</button>    
                                    </div>
                                </div>
                            </div>
                        ) : ""} 
                </div>
            </div>
        </div>
    );
}