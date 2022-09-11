import { useSetRecoilState } from "recoil";
import { useVisibility } from "./useVisibility";
import { coreState } from "./state";
import { useNuiEvent } from "fivem-nui-react-lib";
import { usePlayer } from "./usePlayer";

interface ProfileCardPropsObject {
  name: string;
  secondName: string;
  registration: string;
  user_id: string;
  age: number;
  phone: string;
  foto: string;
  foragido: number;
}


export const useCoreService = () => {
  const setShowHide = useSetRecoilState(coreState.visibility);
  useNuiEvent<boolean>("REACTNUI", "setVisibility", setShowHide);
  return useVisibility();
};

export const useCoreService2 = () => {
  const setPlayer = useSetRecoilState(coreState.playerData);
  useNuiEvent<ProfileCardPropsObject>("REACTNUI", "setPlayer", setPlayer);
  return usePlayer();
};

