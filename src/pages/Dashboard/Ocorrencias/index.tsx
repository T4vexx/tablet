import Container from "../../../components/container";
import { Input } from "../../../components/Form/Input";
import { OcorrenciaSideBar } from "../../../components/OcorrenciaSideBar";

import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { RiLock2Line } from "react-icons/ri"

import styles from "./ocorrencias.module.scss"
import { CardCarFound } from "../../../components/CardCarFound";
import { useNuiCallback, useNuiRequest } from "fivem-nui-react-lib";
import { useEffect, useState } from "react";

type DeterFormData = {
  motivo: string;
}

interface VechicleDataProps {
  nome: string;
  registro: string;
  passaporte: number;
  modelo: string;
  telefone: string;
  vehicle: number;
  foto: string;
}    
const DeterFormSchema = yup.object().shape({
  motivo: yup.string().required('Motivo obrigatório').min(10, 'Detalhamento necessário'),
})

export default function Ocorrencias() {
  const { send } = useNuiRequest()
  const [VehicleData, setVehicleData] = useState<VechicleDataProps>();
  const [fetchMyMethod] = useNuiCallback("REACTNUI", "procurarVeiculo", setVehicleData);
  const [disableDeter,setDisableDeter] = useState<boolean>(true)
  
  const handleProcurarVeiculo = () => {
    fetchMyMethod({});
  }

  const { register, handleSubmit, formState } = useForm<DeterFormData>({
    resolver: yupResolver(DeterFormSchema),
    mode: "all"
  })
  const { errors } =  formState

  const handleDeter = async (values: DeterFormData) => {
    try {
      send("deterVeiculo", { motivo: values.motivo, placa: VehicleData?.registro, vname: VehicleData?.modelo, vehicle: VehicleData?.vehicle});
    } catch (error) {
      console.log("Error: ",error)
    }  
  }

  useEffect(() => {
    if (VehicleData?.registro === '' || VehicleData?.registro === undefined || VehicleData?.registro === null) {
      setDisableDeter(true)
    } else {
      setDisableDeter(false)
    }
  }, [VehicleData?.registro])
  

  return (
    <Container>
      <div className={styles.dashboard_wrap}>
          <OcorrenciaSideBar animate={true} />
          
          <div className={styles.ocorrencias_veiculos_menu}>
            <h1>DETER VEÍCULOS</h1>

            <form onSubmit={handleSubmit(handleDeter)}>
              <div className={styles.form_deter}>
                <Input fontpeso={500} label="Motivo" nome="motivo" type="text" error={errors.motivo} {...register('motivo')} /> 
              </div>

              <CardCarFound 
                foto={VehicleData?.foto}
                nome={VehicleData?.nome} 
                registro={VehicleData?.registro} 
                passaporte={VehicleData?.passaporte}
                modelo={VehicleData?.modelo}
                telefone={VehicleData?.telefone}
                handler={handleProcurarVeiculo} 
              />

              <button type="submit" disabled={disableDeter}><RiLock2Line /> <p>Deter</p></button>
            </form>
          </div>
      </div>
    </Container>
  );
}