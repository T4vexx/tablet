import { useEffect, useState } from "react";
import { BsQuestionCircle } from "react-icons/bs";
import styles from "./alert.module.scss"

interface CodigoPenalProps {
    crime: number,
    infracao: string, 
    tempo: number, 
    multa: number,
}

interface AlertProps {
    multa: CodigoPenalProps[];
    id?: string;
    handlePrenderMultarConfirmar: (multas:number,tempo: number) => void;
    handleCloseAlert: () => void;
}

export const Alert = ({multa,id,handlePrenderMultarConfirmar,handleCloseAlert}: AlertProps) => {
    const [acumulatorMultas,setAcumulatorMultas] = useState<number>(0)
    const [acumulatorTempo,setAcumulatorTempo] = useState<number>(0)

    useEffect(() => {
        const totalMulta =  multa.reduce((total: number, product: CodigoPenalProps) => {
            return total + product.multa;
        }, 0)
        setAcumulatorMultas(totalMulta)
        const totalTempo =  multa.reduce((total: number, product: CodigoPenalProps) => {
            return total + product.tempo;
        }, 0)
        setAcumulatorTempo(totalTempo)
        
    }, [multa])
    

    return (
        <div className={styles.alert_wrap}>
            <div className={styles.modal_alert}>
                <div className={styles.alert_icon}><BsQuestionCircle /></div>
                <div className={styles.alert_divider}></div>
                <div className={styles.alert_text}>Deseja aplicar {acumulatorMultas} reais e {acumulatorTempo} anos de prisao ao id {id}?</div>
                <div className={styles.alert_buttons}>
                    <button className={styles.cor_vermelho} onClick={handleCloseAlert}>Cancelar</button>
                    <button className={styles.cor_azul} onClick={() => handlePrenderMultarConfirmar(acumulatorMultas,acumulatorTempo,)}>Aplicar</button>    
                </div>
            </div>
        </div>
    );
}