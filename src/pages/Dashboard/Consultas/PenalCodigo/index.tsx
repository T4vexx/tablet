import { useNuiCallback } from "fivem-nui-react-lib"
import { useEffect, useState } from "react"
import { AiOutlineStop } from "react-icons/ai"
import { BsCreditCard } from "react-icons/bs"
import { RiTimerLine } from "react-icons/ri"
import { ConsultaDashBar } from "../../../../components/ConsultasSideBar"
import Container from "../../../../components/container"
import { Input } from "../../../../components/Form/Input"
import styles from "./penalcodigo.module.scss"

interface CodigoPenalProps {
    crime: number,
    infracao: string, 
    tempo: number, 
    multa: number,
}

export const PenalCodigo = () => {
    const [query,setQuery] = useState<string>('')
    const [codigoPenal, setCodigoPenal] = useState<CodigoPenalProps[]>();
    const [fetchMyMethod] = useNuiCallback("REACTNUI", "getCodigoPenal", setCodigoPenal);

    const handleValueInput = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setQuery(event.target.value)
    }

    useEffect(() => {
        fetchMyMethod({})
    }, [fetchMyMethod])

    return (
        <Container>
            <div className={styles.dashboard_wrap}>
                <ConsultaDashBar />
                
                <div className={styles.consultar_placa_menu}>
                    <h1>CÓDIGO PENAL</h1>

                    <div className={styles.consultas_cidadaos_online}>
                        <div className={styles.consultas_cidadaos_online_header}>
                            <h2><AiOutlineStop /><p>Infrações</p></h2>
                            <h2><RiTimerLine /><p>Tempo(Meses)</p></h2>
                            <h2><BsCreditCard /><p>Multas</p></h2>
                        </div>
                        
                        <div className={styles.consultas_cidadaos_online_body}>
                            {codigoPenal?.filter((pena) => pena.infracao.toLowerCase().includes(query)).map(c => (
                                <div className={styles.cidadao_online} >
                                    <h2>{c.infracao}</h2>
                                    <h2>{c.tempo}</h2>
                                    <h2>{c.multa}</h2>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.consultas_cidadaos_online_footer}>
                        <div className={styles.filtrar_online}>
                            <Input width="450px" label="Filtrar por infração" nome="filtrar" onChange={(e) => handleValueInput(e)} />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}