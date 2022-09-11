import { atom } from "recoil";

interface ProfileCardPropsObject {
  name: string;
  secondName: string;
  registration: string;
  user_id: string;
  age: number;
  phone: string;
  foragido: number;
  foto: string;
}

export const coreState = {
  visibility: atom<boolean>({
    key: "coreStateHidden",
    default: false,
  }),
  playerData: atom<ProfileCardPropsObject>({
    key: "coreStatePlayer",
    default: {
      name: '',
      secondName: '',
      registration: '',
      user_id: '',
      age: 0,
      phone: '',
      foragido: 0,
      foto: 'https://cdn.discordapp.com/attachments/593999593386278912/1015968481927245945/do-utilizador.png',
    } 
  }),
};

