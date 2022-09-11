// import { useNuiCallback } from "fivem-nui-react-lib";
// import { useState } from "react";
import { ShowText } from "../ShowText";

import { RiSearchLine } from "react-icons/ri"
import styles from "./cardcarfound.module.scss";

interface VechicleDataProps {
    nome?: string;
    registro?: string;
    passaporte?: number;
    foto?: string;
    modelo?: string;
    telefone?: string;
    handler: () => void;
}

export const CardCarFound = ({nome,registro,passaporte,modelo,foto,telefone,handler}: VechicleDataProps) => {

    return (
        <div className={styles.card_car_found}>
            <img src={foto ? foto : "https://cdn.discordapp.com/attachments/593999593386278912/1015968481927245945/do-utilizador.png"} alt="profile"/> 

            <div className={styles.card_car_found_texts}>
              
              {(nome === '' || nome === null) ? (
                    <>
                        <ShowText label="Nome" /> 
                        <ShowText label="Registro" /> 
                        <ShowText label="Passaporte" />
                        <ShowText label="Modelo" />
                        <ShowText label="Telefone" />
                    </>
                ) : (
                    <>
                        <ShowText label="Nome" text={nome} /> 
                        <ShowText label="Registro" text={registro} /> 
                        <ShowText label="Passaporte" number={passaporte} />
                        <ShowText label="Modelo" text={modelo} />
                        <ShowText label="Telefone" text={telefone} /> 
                    </>
                ) 
                }
              
              <button type="button" onClick={handler}><RiSearchLine /> <p>Procurar</p></button>
            </div>
        </div>
    );
}