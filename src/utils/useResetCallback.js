import {useContext, useEffect, useRef} from "react";
import { TimerContext } from "../context/TimerProvider";

/**
 * Custom hook to reset all state when a Timer unloads
 */
const useResetCallback = () => {
  const { resetAll } = useContext(TimerContext);
  // Create a reset ref
  const resetCallback = useRef(() => {
    resetAll();
  });

  // On unload reset all timer context
  useEffect(() => {
    return () => {
      resetCallback.current();
    };
  },[resetCallback]);

  // Set the current callback ref
  resetCallback.current = () => {
    resetAll();
  }
}
export default useResetCallback;
