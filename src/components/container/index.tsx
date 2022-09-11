import styles from "./container.module.scss";
import { RiCloseFill, RiArrowLeftLine } from "react-icons/ri"
import { useNuiRequest } from "fivem-nui-react-lib";
import useEventListener from '@use-it/event-listener'
import { useNavigate } from 'react-router-dom';

type Props = {
  redirects?: boolean,
  children: JSX.Element,
};


export default function Container({redirects = true,children}: Props) {
  const navigate = useNavigate();
  const { send } = useNuiRequest();
  const ESCAPE_KEYS = ['27', 'Escape'];
  function handler({ key }: KeyboardEvent) {
    if (ESCAPE_KEYS.includes(String(key))) {
      fecharNui()
    }
  }

  useEventListener('keydown', handler);

  function fecharNui() {
    send("fechar_nui",{});
  }

  return (
    <div className={styles.wrap_container}>
      <div className={styles.container_outbox_default}>
        {redirects ? <div onClick={() => navigate(-1)} className={styles.container_icon_back}><RiArrowLeftLine /></div> : ''}
        <div onClick={fecharNui} className={styles.container_icon}><RiCloseFill /></div> 
        <img className={styles.triangulo_fundo} src="https://cdn.discordapp.com/attachments/593999593386278912/1008881813579649155/Vector_233.png" alt="triangulo"></img>
        <img className={styles.bolinhas_fundo} src="https://cdn.discordapp.com/attachments/593999593386278912/1008881813235699783/bolinhas.png" alt="bolinhas"></img>
        {children}
      </div>
    </div>
  );
}


