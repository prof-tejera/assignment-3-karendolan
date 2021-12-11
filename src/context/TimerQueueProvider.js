import React, {createContext, useState} from 'react';
// Import helper
import { STATUS, QUEUE_STATUS } from '../utils/constants';
// Crete a Timer context with default empty
export const TimerQueueContext = createContext({});

/**
 * Create a context for the Timers
 */
const TimerQueueProvider = ({children}) => {
  // The array of Timers
  const [timers, setTimers] = useState([]);
  // The current timer
  const [curTimer, setCurTimer] = useState();
  // The next in queue timer
  const [nextTimer, setNextTimer] = useState();
  // The next timerIndex
  const [nextTimerIndex, setNextTimerIndex] = useState();
  // the total work seconds for the timer
  const [totalTime, setTotalTime] = useState(0);
  // the current seconds state of the timer
  const [curTime, setCurTime] = useState(0);

  /**
   * API to add a timer from the queue
   * And update the total time
   * @param {object} configedTimer
   */
  const addTimer = (timer) => {
    setTimers(timers => [...timers, timer]);
    console.log('totalTime', totalTime, 'timer', timer);
    const time = ((timer.workSecs || 0) + (timer.restSecs || 0)) * (timer.rounds || 1);
    setTotalTime(totalTime + time)
  }

  /**
   * API to delete a timer from the queue
   * @param {object} configedTimer
   */
  const deleteTimer = (configedTimer) => {
    let deleteTime;
    setTimers(timers.filter((timer, i) => {
      if (timer === configedTimer) {
        deleteTime = timer.totalTime;
      }
      return timer !== configedTimer;
    }));
    setTotalTime(curTimer - deleteTime);
  };

  /**
   * API to start the timer queue by setting curTimer
   */
  const initNextTimer = () => {
    console.log('nextTimerIndex', nextTimerIndex);
    // Set initial timer
    if (!curTimer) {
      setCurTimer(timers.length > 0 ? timers[0] : undefined);
      setNextTimer(timers.length > 1 ? timers[1] : undefined);
      setNextTimerIndex(timers.length > 1 ? 1 : undefined);
    }
    // Check if last timer
    else if (!Number.isFinite(nextTimerIndex)) {
      setCurTimer();
      setNextTimer();
      setNextTimerIndex();
      // Else go to next timer
    } else {
      setCurTimer(timers[nextTimerIndex]);
      setNextTimer(
        timers.length > nextTimerIndex
        ? timers[nextTimerIndex + 1]
        : undefined
      );
      setNextTimerIndex(
        timers.length > nextTimerIndex
        ? nextTimerIndex + 1
        : undefined
      );
    }
  }

  // -----  State change callback functions ---  //


  return (
    // Expose global values to the timer children
    <TimerQueueContext.Provider
      value={{
         timers,
         setTimers,
         curTimer,
         nextTimer,
         curTime,
         setCurTime,
         totalTime,
         setTotalTime,
         addTimer,
         deleteTimer,
         initNextTimer,
       }}>
      {children}
    </TimerQueueContext.Provider>
  );
}

export default TimerQueueProvider;
