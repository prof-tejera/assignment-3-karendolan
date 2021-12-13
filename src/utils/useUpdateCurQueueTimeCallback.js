import {useContext, useEffect, useRef, useState} from "react";
import { TimerQueueContext } from "../context/TimerQueueProvider";
import { TimerContext } from "../context/TimerProvider";

const useUpdateCurQueueTimeCallback = () => {
  const { setCurQueueSecs } = useContext(TimerQueueContext);
  const { curSec, isRunning, getCurStartSecs } = useContext(TimerContext);
  // the current seconds state of the timer queue
  const [curQueueTime, setCurQueueTime] = useState(0);
  // Create a reset ref
  const resetCallback = useRef(() => {
    setCurQueueSecs(c => c + 1);
  });

  // When the following callcallback
  useEffect(() => {
    if (isRunning() && getCurStartSecs() !== curSec) {
      resetCallback.current();
    }
  },[curSec, isRunning, getCurStartSecs ]);

  // Set the current callback ref
  resetCallback.current = () => {
    resetQueueStart();
  }
}
export default useUpdateCurQueueTimeCallback;
