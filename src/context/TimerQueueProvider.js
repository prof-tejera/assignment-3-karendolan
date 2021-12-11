import React, {createContext, useState} from 'react';
// Import helper
import { STATUS } from '../utils/constants';
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
  const [curQueueTime, setCurQueueTime] = useState(0);
  // Special queue ended state
  const [queueEnded, setQueueEnded] = useState();

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
   * API to increment the total queue time
   * @param {number} increment - the secs to increment
   */
  const incrementCurQueueTime = (increment) => {
    setCurQueueTime(curQueueTime + increment);
  }

  /**
   * API to reset the timer queue state of the timers
   */
  const resetQueueStart = () => {
    setQueueEnded(false);
    timers.forEach((item) => {
      item.state = STATUS.NOT_RUNNING;
    });
  }

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
      console.log('LAST TIMER!!!!');
      curTimer.state = STATUS.COMPLETED;
      setCurTimer();
      setNextTimer();
      setNextTimerIndex();
      setQueueEnded(true);
      // Else go to next timer
    } else {
      curTimer.state = STATUS.COMPLETED;
      setCurTimer(timers[nextTimerIndex]);
      setNextTimer(
        timers.length > nextTimerIndex + 1
        ? timers[nextTimerIndex + 1]
        : undefined
      );
      setNextTimerIndex(
        timers.length > nextTimerIndex + 1
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
         curQueueTime,
         incrementCurQueueTime,
         totalTime,
         setTotalTime,
         addTimer,
         deleteTimer,
         initNextTimer,
         resetQueueStart,
         queueEnded,
       }}>
      {children}
    </TimerQueueContext.Provider>
  );
}

export default TimerQueueProvider;
