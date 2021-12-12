import React, {createContext, useState} from 'react';
// Import helper
import useIntervalHelper from '../utils/useIntervalHelper';
import { STATUS, RUNNING_STATUS } from '../utils/constants';
// Crete a Timer context with default empty
export const TimerContext = createContext({});
/**
 * Create a context for the Timers
 */
const TimerProvider = ({children}) => {
  // The current timer
  const [curTimer, setCurTimer] = useState();
  // the current seconds state of the timer
  const [curSec, setCurSec] = useState(0);
  // the total work seconds for the timer
  const [workSecs, setWorkSecs] = useState(0);
  // the total rest seconds for the timer
  const [restSecs, setRestSecs] = useState(0);
  // the total number of rounds for the timer
  const [rounds, setRounds] = useState(0);
  // the current round state of the timer
  const [curRound, setCurRound] = useState(0);
  // Keep track if wasResting before pause
  const [wasResting, setWasResting] = useState(0);
  // The direction of the current counter, defaults ascending
  const [isCountASC, setIsCountASC] = useState(false);
  // the current running/puse/rest/reset state of the timer
  const [status, setStatus] = useState(STATUS.RESET);
  // Set up convinience functions
  const isRunning = () => {
    return RUNNING_STATUS.includes(status);
  }
  const isPaused = () => {
    return status === STATUS.PAUSED;
  }
  const isEnded = () => {
    return status === STATUS.ENDED;
  }
  const isReset = () => {
    return status === STATUS.RESET;
  }
  const isResting = () => {
    return status === STATUS.RESTING;
  }
  const isWorking = () => {
    return status === STATUS.WORKING;
  }
  // Special case context for RESTing status, used for Tabata
  // TODO: consider moving Workout/Restperiod/Countdown
  // into a different param than status to remove this complexity
  const isInRestingContext = () => {
    return (
      // the state is RESTING
      isResting()
      ||
      // the state is PAUSED but the pause was for RESTING
      (wasResting && isPaused())
      ||
      // the state is ENDED and timer default is to end on RESTING state
      (restSecs > 0 && isEnded())
    );
  }

  // This returns the current terminating second count
  const getCurEndSecs = () => {
    if (isResting() || isWorking()) {
      return (isCountASC ? (isWorking() ? workSecs: restSecs) : 0);
    } else if (wasResting) {
      return (isCountASC ? (!wasResting ? workSecs: restSecs) : 0);
    } else {
      return (isCountASC ? (restSecs > 0 ? restSecs : workSecs) : 0);
    }
  }

  const getCurStartSecs = () => {
    // Start secs 1 sec out to ensure correct interval start count
    const wDescStart =   workSecs - 1;
    const rDescStart = restSecs - 1;
    if (isResting() || isWorking()) {
      return (isCountASC ? 1 : (isWorking() ? wDescStart: rDescStart));
    } else if (wasResting) {
      return (isCountASC ? 1 : (!wasResting ? wDescStart: rDescStart));
    } else {
      return (isCountASC ? 1 : (restSecs > 1 ? rDescStart : wDescStart));
    }
  }

  // -----  State change callback functions ---  //

  const end = () => {
    console.log('In end(), ', 'curSec', curSec, "Ending timer ", curTimer.title, "isCountASC", isCountASC, 'End secs', isCountASC ? workSecs : 0);
    stopInterval();
    setStatus(STATUS.ENDED);
    setWasResting(false);
  }

  const work = () => {
    console.log('In work()', curTimer.title, 'curSecs', curSec, 'asc params', isCountASC);
    setStatus(
      isPaused()
        ? (wasResting ? STATUS.RESTING : STATUS.WORKING)
        : STATUS.COUNTDOWN
      );
    startInterval();
  }

  const pause = () => {
    setWasResting(!isWorking());
    setStatus(STATUS.PAUSED);
    stopInterval();
  }

  const resetStart = () => {
    console.log('In resetStart()', curTimer ? curTimer.title : 'not set');
    stopInterval();
    setStatus(STATUS.RESET);
    setWasResting(false);
    setCurSec(isCountASC ? 0 : workSecs);
    setCurRound(0);
  }

  const resetAll = () => {
    console.log('In resetAll()', curTimer ? curTimer.title : 'not set');
    stopInterval();
    setStatus(STATUS.RESET);
    setWasResting(false);
    setCurSec(0);
    setWorkSecs(0);
    setRestSecs(0);
    setRounds(0);
    setCurRound(0);
  }

  // Retrieve the Interval helper API
  // Give it all it needs to manage context
  // state between intervals.
  // Passing as params to avoid cyclic dependency loop with context
  const { startInterval, stopInterval } = useIntervalHelper({
    workSecs,
    restSecs,
    rounds,
    curSec,
    curRound,
    isCountASC,
    isWorking,
    isResting,
    isPaused,
    wasResting,
    setStatus,
    setCurSec,
    setCurRound,
    status,
    end,
    getCurEndSecs,
  });

  return (
    // Expose global values to the timer children
    <TimerContext.Provider
      value={{
         isCountASC,
         setIsCountASC,
         curSec,
         setCurSec,
         workSecs,
         setWorkSecs,
         restSecs,
         setRestSecs,
         rounds,
         setRounds,
         curRound,
         setCurRound,
         status,
         work,
         pause,
         end,
         resetStart,
         resetAll,
         isRunning,
         isPaused,
         isEnded,
         isResting,
         isWorking,
         isReset,
         isInRestingContext,
         getCurStartSecs,
         curTimer,
         setCurTimer,
       }}>
      {children}
    </TimerContext.Provider>
  );
}

export default TimerProvider;
