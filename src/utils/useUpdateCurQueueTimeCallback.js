import {useContext, useEffect, useRef} from "react";
import { TimerQueueContext } from "../context/TimerQueueProvider";

const useUpdateCurQueueTimeCallback = () => {
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
export default useUpdateCurQueueTimeCallback;
