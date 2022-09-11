import { useRecoilValue } from 'recoil';
import { coreState } from './state';

export const usePlayer = () => {
  const player = useRecoilValue(coreState.playerData);
  return player
}