import { RiSearch2Line } from "react-icons/ri"
import { ConsultaDashBar } from "../../../../components/ConsultasSideBar"
import Container from "../../../../components/container"
import { Input } from "../../../../components/Form/Input"

import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import styles from "./consultarplaca.module.scss"
import { ShowText } from "../../../../components/ShowText"
import { useNuiCallback } from "fivem-nui-react-lib"
import { useEffect, useState } from "react"

type PlacaFormData = {
    placa: string;
}
     
interface PlayerDataByRegisterProps {
    name?: string;
    firstname?: string;
    registration?: string;
    user_id?: number;
    age?: number;
    phone?: string;
    foragido?: number;
    porte?: number;
    foto?: string;
}

const PlacaFormSchema = yup.object().shape({
    placa: yup.string().required('Placa Obrigatória'),
})

export const ConsultarPlaca = () => {
    const [playerDataByRegister, setPlayerDataByRegister] = useState<PlayerDataByRegisterProps>();
    const [nomeCompleto,setNomeCompleto] = useState<string>('')
    const [fetchMyMethod] = useNuiCallback("REACTNUI", "getPlayerDataByRegister", setPlayerDataByRegister);
    const [fetchMyMethod2] = useNuiCallback("REACTNUI", "getPlayerDataByLocale", setPlayerDataByRegister);

    
    const { register, handleSubmit, formState: {errors , isValid} } = useForm<PlacaFormData>({
        resolver: yupResolver(PlacaFormSchema),
        mode: "all"
      })
    
    const handleConsultarPlaca = async (values: PlacaFormData) => {
        try {
            fetchMyMethod({registration: values.placa})
        } catch (error) {
          console.log("Error: ",error)
        }  
    }

    useEffect(() => {
        if (playerDataByRegister?.name)  {
            setNomeCompleto("" + playerDataByRegister?.name+ " " + playerDataByRegister?.firstname + "")
        } else {
            setNomeCompleto("")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[playerDataByRegister?.name]) 

    return (
        <Container>
            <div className={styles.dashboard_wrap}>
                <ConsultaDashBar />
                
                <div className={styles.consultar_placa_menu}>
                    <h1>CONSULTA DE PLACA</h1>

                    <div className={styles.search_passport}>
                        <h2>Placa do veículo</h2>

                        <form className={styles.search_passport_input_button} onSubmit={handleSubmit(handleConsultarPlaca)}>
                            <Input nome="passaporte" type="text" error={errors.placa} {...register('placa')} />

                            <button disabled={!isValid} type="submit"><RiSearch2Line /><p>Buscar Placa</p></button>
                        </form>
                    </div>

                    <div className={styles.search_passport}>
                        <h2>Procurar Placa (próximo)</h2>

                        <div className={styles.search_passport_input_button2}>
                            <button type="button" onClick={() => fetchMyMethod2({})}><RiSearch2Line /><p>Procurar</p></button>
                        </div>
                    </div>

                    <div className={styles.consultar_placa_card}>
                        <img src={playerDataByRegister?.foto ? playerDataByRegister?.foto : "https://cdn.discordapp.com/attachments/593999593386278912/1015968481927245945/do-utilizador.png"} alt="avatar" />
                        <ShowText label="Proprietário" text={nomeCompleto} />
                        <ShowText label="Identidade" number={playerDataByRegister?.user_id}  />
                        <ShowText label="Telefone" text={playerDataByRegister?.phone} />
                        <ShowText label="Idade" number={playerDataByRegister?.age}  />
                    </div>
                </div>
            </div>
        </Container>
    )
}
