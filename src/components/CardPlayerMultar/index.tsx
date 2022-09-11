import { useEffect, useState } from "react";
import { ShowText } from "../ShowText";
import styles from "./cardplayermultar.module.scss"

interface CardPlayerMultarProps {
    name?: string;
    registration?: string;
    user_id?: string;
    age?: number;
    phone?: string;
    foragido?: number;
    money?: number;
    multas?: number;
    porte?: number;
    foto?: string;
    handlePenalidades: () => void;
    handleFichaCriminal: () => void;
}

export const CardPlayerMultar = ({name,foto,registration,user_id,multas,phone,money,porte,foragido,handlePenalidades,handleFichaCriminal}: CardPlayerMultarProps) => {
    const [disabilitar,setDisabilitar] = useState<boolean>(true)
    const [foragidoEstado,setForagidoEstado] = useState<string>()
    const [porteEstado,setPorteEstado] = useState<string>()

    useEffect(() => {
        if (user_id === '' || user_id === undefined || user_id === null) {
            setDisabilitar(true)
        } else {
            setDisabilitar(false)
        }
        if (foragido === 1) {
            setForagidoEstado("sim")
        } else if(foragido === null || foragido === undefined || foragido === -1) {
            setForagidoEstado("")
        } else {
            setForagidoEstado("não")
        }
        if (porte === 1) {
            setPorteEstado("sim")
        } else if(porte === null || porte === undefined || porte === -1) {
            setPorteEstado("")
        } else {
            setPorteEstado("não")
        }
    },[user_id,foragido,porte])
    return (
        <div className={styles.card_player_found}>
            <img src={foto ? foto : "https://cdn.discordapp.com/attachments/593999593386278912/1015968481927245945/do-utilizador.png"} alt="profile" />
            <ShowText label="Nome" text={name} />
            <ShowText label="Identidade" text={registration} />
            <ShowText label="Passaporte" text={user_id} />
            <ShowText label="Multas" number={multas} />
            <button onClick={handlePenalidades} className={styles.cor_vermelho}  >Aplicar penalidades</button>
            <ShowText label="Telefone" text={phone} />
            <ShowText label="Carteira" number={money} />
            <button onClick={handleFichaCriminal} className={styles.cor_azul} disabled={disabilitar}>Ficha criminal</button> 
            <ShowText label="Porte" text={porteEstado} />
            <ShowText label="Procurado" text={foragidoEstado} />
        </div>
    );
}