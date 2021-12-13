import {useContext, useEffect, useRef} from "react";
import { TimerQueueContext } from "../context/TimerQueueProvider";

/**
 * Custom hook to reset Queue to start when the Queue unloads
 *     // Init the new curent timer
     if (isNewCurTimer && curQTimer && curQTimer.state === STATUS.NOT_RUNNING) {
       curQTimer.state = STATUS.RUNNING;
       setCurTimer(curQTimer);
       setCurSec(curQTimer.isCountASC ? 0 : curQTimer.workSecs);
       // Start on the first round if more than one
       setCurRound(curQTimer.rounds > 0 ? 1 :0);
       setWorkSecs(curQTimer.workSecs);
       setRestSecs(curQTimer.restSecs);
       setRounds(curQTimer.rounds);
       setIsCountASC(curQTimer.isCountASC);
       work();
       setIsNewCurTimer(false);
     }
 */
const useNewTimerResetCallback = () => {
  const { resetQueueStart } = useContext(TimerQueueContext);
  // Create a reset ref
  const resetCallback = useRef(() => {
    resetQueueStart();
  });

  // On unload reset all timer context
  useEffect(() => {
    return () => {
      resetCallback.current();
    };
  },[resetCallback]);

  // Set the current callback ref
  resetCallback.current = () => {
    resetQueueStart();
  }
}
export default useNewTimerResetCallback;
