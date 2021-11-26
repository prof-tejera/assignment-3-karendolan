import { useContext } from "react";
import { TimerContext } from "../context/TimerProvider";

/**
 * A fun component to drop confetti all over the view
 * to celebrate the end of a timer.
 * from https://www.npmjs.com/package/react-confetti
 */
import Confetti from 'react-confetti';

/**
 * Custom hook return the confetti end effect when state is ended
 */
const useEndedEffect = () => {
  const {
    isEnded,
   } = useContext(TimerContext);

  if (isEnded()) {
    return (<Confetti />);
  };

}
export default useEndedEffect;
