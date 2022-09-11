import Container from "../../../../components/container";
import { Input } from "../../../../components/Form/Input";
import { OcorrenciaSideBar } from "../../../../components/OcorrenciaSideBar";
import { useNuiCallback, useNuiRequest } from "fivem-nui-react-lib";
import { useState } from "react";
import { CardPlayerMultar } from "../../../../components/CardPlayerMultar";
import { RiSearch2Line } from "react-icons/ri"

import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import styles from "./multar.module.scss"
import { ModalAplicarMulta } from "../../../../components/ModalAplicarMulta";
import { ModalFichaCriminal } from "../../../../components/ModalFichaCriminal";

type MultarFormData = {
    passaporte: number;
}

interface ProcurarPlayerMultarProps {
    name: string;
    registration: string;
    user_id: string;
    age: number;
    phone: string;
    foragido: number;
    money: number;
    multas: number;
    porte: number;
    foto: string;
}


const MultarFormSchema = yup.object().shape({
    passaporte: yup.number().typeError('Id obrigatório').required('Id obrigatório'),
})

export default function Multar() {
    const { send } = useNuiRequest()
    const [popupVisible, setPopupVisible] = useState<boolean>(false)
    const [popupVisible2, setPopupVisible2] = useState<boolean>(false)
    const [nPlayerData, setnPlayerData] = useState<ProcurarPlayerMultarProps>();
    const [fetchMyMethod] = useNuiCallback("REACTNUI", "procurarPlayerMultar", setnPlayerData);

    const { register, handleSubmit, formState: { errors } } = useForm<MultarFormData>({
        resolver: yupResolver(MultarFormSchema),
        mode: "all"
    })
    const handleMultar = (values: MultarFormData) => {
        try {
            fetchMyMethod({id: values.passaporte})
        } catch (error) {
          
        }  
    }

    const handleModalToggle = () => {
        setPopupVisible(!popupVisible) 
    }

    const handleModal2Toggle = () => {
        setPopupVisible2(!popupVisible2) 
    }

    const handleMultarPrenderConfirmar = async (multas: number,tempos: number,crimesRef: number[]) => {
        setPopupVisible(false) 
        send("multarPrenderPlayer", {multas: multas, meses: tempos, crimes: crimesRef, bandidoId: nPlayerData?.user_id})
    }

    return (
        <Container>
            <div className={styles.ocorrencia_multar_wrap}>
                <OcorrenciaSideBar />
          
                <div className={styles.ocorrencias_multar_menu}>
                    <h1>MULTAR / PRENDER</h1>
                    
                    <div className={styles.search_passport}>
                        <h2>Passaporte do jogador</h2>

                        <form className={styles.search_passport_input_button} onSubmit={handleSubmit(handleMultar)}>
                            <Input nome="passaporte" type="number" error={errors.passaporte} {...register('passaporte')} />

                            <button type="submit"><RiSearch2Line /><p>Procurar Passaporte</p></button>
                        </form>
                    </div>

                    <CardPlayerMultar
                        name={nPlayerData?.name} 
                        registration={nPlayerData?.registration} 
                        user_id={nPlayerData?.user_id}
                        phone={nPlayerData?.phone}
                        multas={nPlayerData?.multas}
                        money={nPlayerData?.money}
                        porte={nPlayerData?.porte}
                        foto={nPlayerData?.foto}
                        foragido={nPlayerData?.foragido}
                        handlePenalidades={handleModalToggle}
                        handleFichaCriminal={handleModal2Toggle}
                    /> 

                    {popupVisible ? <ModalAplicarMulta handlePrenderMultar={handleMultarPrenderConfirmar} handlePenalidades={handleModalToggle} user_id={nPlayerData?.user_id} /> : ''}
                
                    {popupVisible2 ? <ModalFichaCriminal handleFecharModal2={handleModal2Toggle}  duser_id={nPlayerData?.user_id}/> : ''}
                </div>
            </div>
        </Container>
    );
}