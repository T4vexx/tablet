import { useNuiRequest } from "fivem-nui-react-lib";
import { BsInfoCircle } from "react-icons/bs";
import { Input } from "../Form/Input";

import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import styles from "./AlertAddImg.module.scss"

interface AlertAddImgProps {
    user_id?: number;
    handleCloseAlert: () => void;
    handleCloseAndUpdate: () => void;
}

type SetImageFormData = {
    url: string;
  }
  
const setImageSchema = yup.object().shape({
    url: yup.string().required('Imagem Obrigatória'),
})

export const AlertAddImg = ({user_id,handleCloseAlert,handleCloseAndUpdate}: AlertAddImgProps) => {
    const { send } = useNuiRequest()

    const { register, handleSubmit, formState: { isValid } } = useForm<SetImageFormData>({
        resolver: yupResolver(setImageSchema),
        mode: "all"
    })
    const handleSignIn = async (values: SetImageFormData) => {
        try {
            send("setPlayerAvatar", {user_id: user_id, url: values.url})
            handleCloseAndUpdate()
        } catch (error) {
        }
    }  
    return (
        <div className={styles.alert_wrap}>
            <form className={styles.modal_alert} onSubmit={handleSubmit(handleSignIn)}>
                <div className={styles.alert_icon}><BsInfoCircle /></div>
                <div className={styles.alert_divider}></div>
                <div className={styles.alert_text}>Coloque o link da imagem!</div>
                <div className={styles.alert_buttons}>
                    <Input nome="link" placeholder="Link com final .png ou .jpeg" {...register("url")} />
                    <button className={styles.cor_vermelho} onClick={handleCloseAlert}>Cancelar</button>
                    <button type="submit" className={styles.cor_azul} disabled={!isValid}>Aplicar</button>    
                </div>
            </form>
        </div>
    );
}