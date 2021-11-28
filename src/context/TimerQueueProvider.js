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
  const [curTimer, setCurTimer] = useState([]);
  // the total work seconds for the timer
  const [totalTime, setTotalTime] = useState(0);
  // the current seconds state of the timer
  const [curTime, setCurTime] = useState(0);

  // --- Add new configured timer function   --------------//
  const addTimer = (configedTimer, secs) => {
    setTimers(timers => [...timers, configedTimer]);
    setTotalTime(curTimer + secs);
  }

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

  // -----  State change callback functions ---  //


  return (
    // Expose global values to the timer children
    <TimerQueueContext.Provider
      value={{
         timers,
         setTimers,
         curTimer,
         setCurTimer,
         curTime,
         setCurTime,
         totalTime,
         setTotalTime,
         addTimer,
         deleteTimer,
       }}>
      {children}
    </TimerQueueContext.Provider>
  );
}

export default TimerQueueProvider;
