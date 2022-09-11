import { useNuiCallback } from "fivem-nui-react-lib";
import { useEffect, useState } from "react";
import Container from "../../../../components/container";
import { OcorrenciaSideBar } from "../../../../components/OcorrenciaSideBar";
import { RelatorioOcorrido } from "../../../../components/RelatorioOcorrido";

import styles from "./relatorio.module.scss"

interface GetFichaCriminalProps {
    uuid: string;
    detento_id: number;
    valor: number;
    meses: number;
    motivo: string; 
    link: string;
    data: number;
    crimes: string;
    oficial_id: number;
}

export const Relatorio = () => {
    const [getFichaCriminal, setGetFichaCriminal] = useState<GetFichaCriminalProps[]>([]);
    const [fetchMyMethod] = useNuiCallback("REACTNUI", "getAllFichaCriminal", setGetFichaCriminal);

    const refreshFichCriminalOpening = () => {
        setGetFichaCriminal([])
        setTimeout(() => fetchMyMethod({}),500)
    }

    useEffect(() => {
        fetchMyMethod({})
    }, [fetchMyMethod])
    

    return (
        <Container>
            <div className={styles.ocorrencia_relatorio_wrap}>
                <OcorrenciaSideBar />
          
                <div className={styles.ocorrencias_relatorio_menu}>
                    <h1>RELATÓRIO</h1>
                    {getFichaCriminal.length < 1 ? <h1 className={styles.text_when_not_detalhar}>Sem ocorrências para detalhar</h1> : 
                    (<div className={styles.ocorrencias_relatorio_itens}>
                        <h2>Ocorrências em aberto: </h2>

                        
                        {getFichaCriminal?.map(ocorrido => (
                            <RelatorioOcorrido ocorrido={ocorrido} handleReBuscarRelatoriosOpen={refreshFichCriminalOpening} />
                        ))}
                    </div>)}
                </div>
            </div>
        </Container>
    );
}