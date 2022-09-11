import Container from "../../../../components/container";
import { Input } from "../../../../components/Form/Input";
import { ServicosSideBar } from "../../../../components/ServicosSideBar";
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import styles from "./anuncios.module.scss"
import { useNuiRequest } from "fivem-nui-react-lib";

type AnuncioFormData = {
    mensagem: string;
}

const AnuncioFormSchema = yup.object().shape({
    mensagem: yup.string().required('Mensagem obrigatória'),
})
    

export const Anuncios = () => {
    const { send } = useNuiRequest()
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<AnuncioFormData>({
        resolver: yupResolver(AnuncioFormSchema),
        mode: "all"
    })
    const handleAnunciar = async (values: AnuncioFormData) => {
        try {
            send("sendPlayersMessage", {message: values.mensagem})
        } catch (error) {}  
    }

    return (
        <Container>
            <div className={styles.anuncios_wrap}>
                <ServicosSideBar animate={true} />
                
                <div className={styles.anuncios_menu}>
                    <h1>ANÚNCIOS</h1>

                    <form onSubmit={handleSubmit(handleAnunciar)} className={styles.ocorrencias_procurador_colocar}>
                        <Input fontpeso={500} nome="mensagem" type="text" label="Mensagem a ser anunciada" error={errors.mensagem} {...register("mensagem")} />
                        <button disabled={!isValid} type="submit">ENVIAR</button>
                    </form>
                </div>            
            </div>
        </Container>
    );
}