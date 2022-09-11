import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNuiRequest } from 'fivem-nui-react-lib'

import styles from "./relatorioocorrido.module.scss"

type RelatorioFormData = {
    motivo: string;
    url: string;
} 

const RelatorioFormSchema = yup.object().shape({
    motivo: yup.string().required('Motivo obrigatório').min(10, 'Detalhamento necessário'),
    url: yup.string(),
})

interface GetFichaCriminalProps {
    ocorrido: {
        uuid: string;
        detento_id: number;
        valor: number;
        meses: number;
        motivo: string; 
        link: string;
        data: number;
        crimes: string;
        oficial_id: number;
    },
    handleReBuscarRelatoriosOpen: () => void;
}

export const RelatorioOcorrido = ({ocorrido,handleReBuscarRelatoriosOpen}: GetFichaCriminalProps )=> {
    const { send } = useNuiRequest()
    const newUUID = ocorrido.uuid.split('-')
    const dateFormated = new Intl.DateTimeFormat('pt-BR', {year: 'numeric', month: 'long',day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(ocorrido.data)

    const { register, handleSubmit, formState: { isValid } } = useForm<RelatorioFormData>({
        resolver: yupResolver(RelatorioFormSchema),
        mode: "all"
      })
    
      const handleRelatorio = async (values: RelatorioFormData) => {
        try {
            send("writeRelatorio",{ uuid: ocorrido.uuid,  motivo: values.motivo, url: values.url })
            handleReBuscarRelatoriosOpen()
        } catch (error) {
          console.log("Error: ",error)
        }  
      }

    return (
        <form className={styles.relatorio_ocorrencias_wrap} onSubmit={handleSubmit(handleRelatorio)}>
            <div className={styles.relatorio_ocorrencias_header}>
                <h2>Id da ocorrência: <p>{newUUID[0]}</p></h2>
                <h2>Data: <p>{dateFormated}</p></h2>
                <h2>Crimes: <p>{ocorrido.crimes}</p></h2>
                <h2>Cidadão: <p>{ocorrido.detento_id}</p></h2>
            </div>
            <div className={styles.relatorio_ocorrencias_text_area}>
                <input placeholder="Digite a descrição do ocorrido" {...register('motivo')} />
            </div>
            <div className={styles.relatorio_ocorrencias_video_input}>
                <input placeholder="Link do vídeo (opcional)" {...register('url')}/>
                <button type="submit" disabled={!isValid}>Enviar</button>
            </div>
        </form>
    ); 
}