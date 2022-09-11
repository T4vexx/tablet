import Container from "../../../../components/container";
import { ServicosSideBar } from "../../../../components/ServicosSideBar";
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import styles from "./sendtask.module.scss"
import { useNuiRequest } from "fivem-nui-react-lib";
import { Input } from "../../../../components/Form/Input";

type AnuncioFormData = {
    mensagem: string;
    id: number;
}

const AnuncioFormSchema = yup.object().shape({
    mensagem: yup.string().required('Mensagem obrigatória'),
    id: yup.number().typeError('O id é um número').required('Id obrigatória')
})
    

export const SendTask = () => {
    const { send } = useNuiRequest()
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<AnuncioFormData>({
        resolver: yupResolver(AnuncioFormSchema),
        mode: "all"
    })
    const handleAnunciar = async (values: AnuncioFormData) => {
        try {
            send("addNewTask", {mensagem: values.mensagem, subordinado_id: values.id})
        } catch (error) {}  
    }

    return (
        <Container>
            <div className={styles.anuncios_wrap}>
                <ServicosSideBar />
                
                <div className={styles.anuncios_menu}>
                    <h1>ENVIAR TAREFA</h1>

                    <form onSubmit={handleSubmit(handleAnunciar)} className={styles.ocorrencias_procurador_colocar}>
                        <h1>Tarefa: </h1>
                        <textarea className={styles.text_area_task} placeholder="Digite a mensagem" {...register("mensagem")}/>
                        {errors.mensagem && <span>{errors?.mensagem.message}</span>}
                        <div className={styles.text_area_task_bottom}>
                            <Input width="500px" label="Id do policial" type="text" nome="id" placeholder="Exemplo 5" {...register("id")}/>
                            <button disabled={!isValid} type="submit">ENVIAR</button>
                        </div>
                        {errors.id && <span>{errors?.id.message}</span>}
                    </form>
                </div>            
            </div>
        </Container>
    );
}