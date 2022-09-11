import { useEffect, useState } from "react";

import { IoExitOutline } from "react-icons/io5"
import { AlertAddImg } from "../AlertAddImg";

import styles from "./ModalPlayerInformation.module.scss"

interface ModalPlayerInformationProps {
  player?: {
      user_id: number, 
      registration: string, 
      phone: string,
      name: string,
      age: number,
      foto: string,
      foragido: number,
      porte: number,
      multas: number,
  };
  handleCloseModal: () => void;
  reCreate: () => void;
}

export const ModalPlayerInformation = ({player,handleCloseModal,reCreate}: ModalPlayerInformationProps) => {
  const [foragido,setForagido] = useState<string>('')
  const [porte,setPorte] = useState<string>('')
  const [alertSetImg,setAlertSetImg] = useState<boolean>(false)

  const toggleAlertSetImg = () => {
    setAlertSetImg(!alertSetImg)
    reCreate()
  }

  const handleCloseAndUpdate = () => {
    setAlertSetImg(!alertSetImg)
    reCreate()
    handleCloseModal()
  }

  useEffect(() => {
      if (player?.foragido === 1) {
        setForagido("sim")
      } else {
        setForagido("não")
      }

      if (player?.porte === 1) {
        setPorte("sim")
      } else {
        setPorte("não")
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
      <div className={styles.modal_wrap}>
          <div className={styles.modal_player_information}>
              <div className={styles.modal_player_information_header}>
                  <h2>{player?.name}</h2>
                  <IoExitOutline onClick={handleCloseModal} />
              </div>
              <div className={styles.divider_information}></div>
              <div className={styles.modal_player_information_body}>
                  <h2>Identidade..: <p>{player?.user_id}</p></h2>
                  <h2>Registro..: <p>{player?.registration}</p></h2>
                  <h2>Telefone..: <p>{player?.phone}</p></h2>
                  <h2>Idade..: <p>{player?.age} anos</p></h2>
                  <h2>Multas..: <p>R${player?.multas}</p></h2>
                  <h2>Procurado..: <p>{foragido}</p></h2>
                  <h2>Porte..: <p>{porte}</p></h2>
              </div>
              <div className={styles.modal_player_information_footer}>
                  <button onClick={toggleAlertSetImg}>Adicionar Imagem</button>
                  <img src={player?.foto} alt="avatar" />
              </div>
          </div>

          {alertSetImg ? <AlertAddImg handleCloseAndUpdate={handleCloseAndUpdate} handleCloseAlert={toggleAlertSetImg} user_id={player?.user_id} /> : ''}
      </div>
  );
}