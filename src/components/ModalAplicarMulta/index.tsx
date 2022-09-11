import { useEffect, useState } from "react";
import { Input } from "../Form/Input";

import { AiOutlineStop } from "react-icons/ai"
import { RiTimerLine } from "react-icons/ri"
import { BsCreditCard } from "react-icons/bs"

import styles from "./modalaplicarmultas.module.scss"
import { useNuiCallback } from "fivem-nui-react-lib";
import { Alert } from "../Alert";

interface CodigoPenalProps {
    crime: number,
    infracao: string, 
    tempo: number, 
    multa: number,
}

const codigoPenal2 = [
    { crime: 1, infracao: "Sinal vermelho", tempo: 0, multa: 1000 },
    { crime: 2, infracao: "Acidente de transito", tempo: 0, multa: 2000 },
    { crime: 3, infracao: "Assasinato", tempo: 1, multa: 5000 },
    { crime: 4, infracao: "roubo", tempo: 2, multa: 10000 },
    { crime: 5, infracao: "invasao", tempo: 0, multa: 5000 },
    { crime: 6, infracao: "Latrocinio", tempo: 0, multa: 5000 },
    { crime: 7, infracao: "Porte ilegal de arma", tempo: 30, multa: 5000 },
    { crime: 8, infracao: "Formação de quadrilha", tempo: 0, multa: 4000 },
    { crime: 9, infracao: "Outro crime", tempo: 8, multa: 5000 },   
]


interface ModalAplicarMultaProps {
    user_id?: string;
    handlePenalidades: () => void;
    handlePrenderMultar: (multas: number,tempo: number,crimesRef: number[]) => void;
}

export const ModalAplicarMulta = ({handlePenalidades,user_id,handlePrenderMultar}: ModalAplicarMultaProps) => {
    const [query,setQuery] = useState<string>('')
    const [multasPenasSelect,setMultasPenasSelect] = useState<CodigoPenalProps[]>([]);
    const [codigoPenal, setCodigoPenal] = useState<CodigoPenalProps[]>();
    const [fetchMyMethod] = useNuiCallback("REACTNUI", "getCodigoPenal", setCodigoPenal);
    const [sendAlert,setSendAlert] = useState<boolean>(false)

    const [whichHaveSelected,setWhichHaveSelected] = useState<number[]>([])

    const handleClickSelectSave = (crime: number,infracao: string,tempo: number,multa: number) => {
        const haveOtherInfraction = multasPenasSelect.some(infraction => infraction.infracao === infracao)
        if (haveOtherInfraction === false) {
            const novoArray = multasPenasSelect
            novoArray.push({crime,infracao,tempo,multa})
            setMultasPenasSelect(novoArray)
        } else {
            const novoArray = multasPenasSelect
            const novoArray2 = novoArray.filter((item) => item.infracao !== infracao)
            setMultasPenasSelect(novoArray2)
        }
    }

    const handlePrenderMultarConfirmar = (multas:number,tempo: number) => {
        setSendAlert(false)
        var crimesRef: number[] = []
        multasPenasSelect.map(mult => {
            return crimesRef.push(mult.crime)
        })
        handlePrenderMultar(multas,tempo,crimesRef)
    }

    const handleCloseAlert = () => {
        setSendAlert(false)
    }

    const handleValueInput = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setQuery(event.target.value)
    }
    

    useEffect(()=>{
        //fetchMyMethod({})
    },[setWhichHaveSelected,whichHaveSelected])

    return (
        <div className={styles.modal_wrap}>
            <div className={styles.modal_multar_procurar}>
                <div className={styles.modal_multar_procurar_header}>
                    <Input nome="filtro" type="text" label="pesquisar" onChange={(e) => handleValueInput(e)}/>
                    <button className={styles.cor_azul} onClick={handlePenalidades} >Fechar</button>
                    <button className={styles.cor_vermelho} onClick={() => setSendAlert(true)}>Aplicar</button>
                </div>
                <div className={styles.modal_multar_procurar_table}>
                    <div className={styles.modal_multar_procurar_table_header}>
                        <h2><AiOutlineStop /><p>Infrações</p></h2>
                        <h2><RiTimerLine /><p>Tempo(Meses)</p></h2>
                        <h2><BsCreditCard /><p>Multas</p></h2>
                    </div>
                    <div className={styles.modal_multar_procurar_table_body}>
                        {codigoPenal2?.filter((pena) => pena.infracao.toLowerCase().includes(query)).map((infracoa: CodigoPenalProps, index: number) => {
                            if (whichHaveSelected.some(element => element === index) === true) {
                                return (
                                    <div 
                                        id={String(index)}
                                        key={infracoa.infracao} 
                                        className={styles.infracao_infos} 
                                        style={{background: "#fffdd0"}}
                                        onClick={() => {
                                            handleClickSelectSave(infracoa.crime,infracoa.infracao,infracoa.tempo,infracoa.multa)
                                            const newArray = whichHaveSelected
                                            newArray.push(index)
                                            setWhichHaveSelected(newArray)
                                        }}
                                    >
                                        <h3>{infracoa.infracao}</h3>
                                        <h3>{infracoa.tempo}</h3>
                                        <h3>{infracoa.multa}</h3>
                                    </div>
                                );
                            } else {
                                return (
                                    <div 
                                        id={String(index)}
                                        key={infracoa.infracao} 
                                        className={styles.infracao_infos} 
                                        onClick={() => {
                                            handleClickSelectSave(infracoa.crime,infracoa.infracao,infracoa.tempo,infracoa.multa)
                                            const newArray = whichHaveSelected
                                            newArray.push(index)
                                            setWhichHaveSelected(newArray)
                                        }}
                                    >
                                        <h3>{infracoa.infracao}</h3>
                                        <h3>{infracoa.tempo}</h3>
                                        <h3>{infracoa.multa}</h3>
                                    </div>
                                );
                            }

                            
                        })}
                    </div> 
                </div>
            </div>
            {sendAlert ? <Alert handleCloseAlert={handleCloseAlert} handlePrenderMultarConfirmar={handlePrenderMultarConfirmar} multa={multasPenasSelect} id={user_id}  /> : ''}
        </div>
    );
}

// const element = document.getElementById(`${index}`) as  HTMLElement
//                                         let myDivObjBgColor = window.getComputedStyle(element).backgroundColor;
//                                         if (String(myDivObjBgColor) === "rgb(217, 217, 217)") {
//                                             element.style.backgroundColor = "rgb(255, 253, 208)"
//                                         } else {
//                                             element.style.backgroundColor = "rgb(217, 217, 217)"
//                                         }