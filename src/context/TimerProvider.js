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
  const isInCountdown = () => {
    return status === STATUS.COUNTDOWN;
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

  /**
   * Helper to retrieve the correct "ending" sec state for the timer
   */
  const getCurEndSecs = () => {
    if (isResting() || isWorking()) {
      return (isCountASC ? (isWorking() ? workSecs: restSecs) : 0);
    } else if (wasResting) {
      return (isCountASC ? (!wasResting ? workSecs: restSecs) : 0);
    } else {
      return (isCountASC ? (restSecs > 0 ? restSecs : workSecs) : 0);
    }
  }

  /**
   * Helper to retrieve the correct "starting" sec state for the timer
   */
  const getCurStartSecs = () => {
    const wDescStart =   workSecs;
    const rDescStart = restSecs;
    if (isResting() || isWorking()) {
      return (isCountASC ? 0 : (isWorking() ? wDescStart: rDescStart));
    } else if (wasResting) {
      return (isCountASC ? 0 : (!wasResting ? wDescStart: rDescStart));
    } else {
      return (isCountASC ? 0 : (restSecs > 1 ? rDescStart : wDescStart));
    }
  }

  // -----  State change callback functions ---  //

  /**
   * Helper end timer state without changing context config
   */
  const end = () => {
    stopInterval();
    setStatus(STATUS.ENDED);
    setWasResting(false);
  }

  /**
   * Helper start the interval
   */
  const work = () => {
    setStatus(
      isPaused()
        ? (wasResting ? STATUS.RESTING : STATUS.WORKING)
        : STATUS.COUNTDOWN
      );
    startInterval();
  }

  /**
   * Helper pause timer state without changing context config
   */
  const pause = () => {
    setWasResting(!isWorking());
    setStatus(STATUS.PAUSED);
    stopInterval();
  }

  /**
   * Helper reset state for the current config
   */
  const resetStart = () => {
    stopInterval();
    setStatus(STATUS.RESET);
    setWasResting(false);
    setCurSec(isCountASC ? 0 : workSecs);
    setCurRound(0);
  }

  /**
   * Helper stop the interval and reset state
   */
  const resetAll = () => {
    stopInterval();
    setStatus(STATUS.RESET);
    setWasResting(false);
    setCurSec(0);
    setWorkSecs(0);
    setRestSecs(0);
    setRounds(0);
    setCurRound(0);
  }

  /**
   * Helper to add a new Timer and reset state to that timer
   * @param [object] curQTimer - the timer to apply
   */
  const resetToCurTimer = (curQTimer) => {
    setCurTimer(curQTimer);
    setCurSec(curQTimer.isCountASC ? 0 : curQTimer.workSecs);
    // Start on the first round if more than one
    setCurRound(curQTimer.rounds > 0 ? 1 :0);
    setWorkSecs(curQTimer.workSecs);
    setRestSecs(curQTimer.restSecs);
    setRounds(curQTimer.rounds);
    setIsCountASC(curQTimer.isCountASC);
    work();
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
         resetToCurTimer,
         isRunning,
         isPaused,
         isEnded,
         isResting,
         isWorking,
         isReset,
         isInCountdown,
         isInRestingContext,
         getCurStartSecs,
         getCurEndSecs,
         curTimer,
         setCurTimer,
       }}>
      {children}
    </TimerContext.Provider>
  );
}

export default TimerProvider;
