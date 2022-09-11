import Container from "../../../../components/container";
import { Input } from "../../../../components/Form/Input";
import { OcorrenciaSideBar } from "../../../../components/OcorrenciaSideBar";

import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import styles from "./procurado.module.scss"
import { useState } from "react";
import { BsQuestionCircle } from "react-icons/bs";
import { useNuiRequest } from "fivem-nui-react-lib";

type ProcuradoColocarFormData = {
    colorcar_procurado: number;
}

const procuradoColocarFormSchema = yup.object().shape({
    colorcar_procurado: yup.number().typeError('Id obrigatório').required('Id obrigatório'),
})

export const Procurado = () => {
    const { send } = useNuiRequest();
    
    const [colocarProcuradoAlert,setColocarProcuradoAlert] = useState<boolean>(false)
    const [query,setQuery] = useState<string>('0')

    const { register, formState: { errors, isValid } } = useForm<ProcuradoColocarFormData>({
        resolver: yupResolver(procuradoColocarFormSchema),
        mode: "all"
    })

    const handleValueInput = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setQuery(event.target.value)
    }

    const handleProcuradoColocar = (values: string) => {
        try {
            if (values !== '0') {
                send("toggleProcurado", { id: values });
            }
            
        } catch (error) {
          console.log("Error: ",error)
        }  
    }

    return (
        <Container>
            <div className={styles.ocorrencia_procurado_wrap}>
                <OcorrenciaSideBar />
          
                <div className={styles.ocorrencias_procurador_menu}>
                    <h1>PROCURADO</h1>
                    
                    <div className={styles.ocorrencias_procurador_colocar}>
                        <Input fontpeso={500} nome="colorcar_procurado" label="Mudar alerta de procurado" error={errors.colorcar_procurado} {...register('colorcar_procurado')} onChange={(e) => handleValueInput(e)} />
                        {colocarProcuradoAlert ? (
                            <div className={styles.alert_wrap}>
                                <div className={styles.modal_alert}>
                                    <div className={styles.alert_icon}><BsQuestionCircle /></div>
                                    <div className={styles.alert_divider}></div>
                                    <div className={styles.alert_text}>Deseja realmente mudar o alerta de procurado do id {query}?</div>
                                    <div className={styles.alert_buttons}>
                                        <button className={styles.cor_vermelho} type="button" onClick={() => setColocarProcuradoAlert(false)}>Cancelar</button>
                                        <button className={styles.cor_azul} type="submit" onClick={() =>{ 
                                            handleProcuradoColocar(String(query))
                                            setColocarProcuradoAlert(false)}}>
                                            Confirmar
                                        </button>    
                                    </div>
                                </div>
                            </div>
                        ) : ""}
                        <button type="button" disabled={!isValid} onClick={() => setColocarProcuradoAlert(true)}>APLICAR</button>
                    </div>

                </div>
            </div>
        </Container>
    );
}