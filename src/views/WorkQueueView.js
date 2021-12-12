import React, { useContext, useEffect, useState } from "react";

import styled from "styled-components";

// Use button for timer choices
import Button from "../components/generic/Button";
// Helper to show list of Timers from the queue context
import ShowQueuedList from "../shared/ShowQueuedList";
// Context Provider
import { TimerQueueContext } from '../context/TimerQueueProvider';
import { TimerContext } from "../context/TimerProvider";
// work queue end confetti
import Confetti from 'react-confetti';

// Import status/state constants
import { STATUS } from '../utils/constants';

// Common color for default timer background
import GENERIC  from "../shared/COLOR";
const primaryColor =  GENERIC.PANEL.DEFAULT.background;

const Timers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TimerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
`;

const Timer = styled.div`
  border: 1px solid gray;
  margin: 20px 0 20px;
  border-radius: 20%;
  overflow: hidden;
  min-width: 50vh;
  min-height: 65vh;
  background-color: ${primaryColor};
  display:flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TimerInstruction = styled.div`
  align-self: center;
  margin: auto;
  font-size: 1.5em;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 30px;
  align-self: center;
`;

function WorkQueueView() {
  // the current seconds state of the timer
  const [curQueueTime, setCurQueueTime] = useState(0);
  // Retrieve the queue of configed timers
  const {
    timers,
    curTimer,
    nextTimer,
    initNextTimer,
    queueEnded,
    resetQueueStart,
   } = useContext(TimerQueueContext);

   const {
    setWorkSecs,
    setRestSecs,
    setRounds,
    work,
    isRunning,
    isEnded,
    isCountASC,
    totalTime,
    resetAll,
    curSec,
   } = useContext(TimerContext);


  /**
   * Reset local queue state and context queue state
   */
  const resetTimerQueueAll = () => {
    setCurQueueTime(0);
    resetQueueStart();
  }

  // When a timer ends, init the next one
  useEffect(() => {
    if (isEnded()) {
      console.log("Is ENDED");
      // Reset the timer context data
      resetAll();
      // Start next timer if there is one
      initNextTimer();
      // resetStart <--- after confetti
    }
  }, [isEnded, resetAll, initNextTimer]);

  useEffect(() => {
    return () => {
      console.log('ONLY SEE THIS ONCE on unload');
      resetQueueStart();
      resetAll();
    }
  }, []);

  // When the cur timer changes, update the timer context
  useEffect(() => {
    // Init the curentTimer
    console.log('In Workqueue, curTimer', curTimer);
    if (curTimer && curTimer.state === STATUS.NOT_RUNNING) {
      console.log('setting context state', curTimer);
      curTimer.state = STATUS.RUNNING;
      setWorkSecs(curTimer.workSecs);
      setRestSecs(curTimer.restSecs);
      setRounds(curTimer.rounds);
      console.log('About to call work()');
      work(curTimer);
    }
  }, [curTimer, setWorkSecs, setRestSecs, setRounds, work]);

  // Increment current total time
  useEffect(() => {
    console.log('CURSEC - change to ', curSec, 'curQueueTime', curQueueTime, 'isRunning', isRunning());
    const secStartSec = isCountASC ? 0 : totalTime;
    if (isRunning()) { // } && curSec !== 0) {
      setCurQueueTime(curQueueTime + 1);
    }
    // Listing to curSec change, but mindful of setup change conditionals
  }, [curSec, isRunning, isCountASC, totalTime]);

  return (
    <Timers>
      <TimerContainer>
        <MenuContainer>
          {(timers && timers.length > 0) && (
            <Button
              key='Run-Queue'
              size='xlarge'
              active={false}
              text={(
                nextTimer
                ? 'Next Timer'
                : (
                  curTimer
                    ? 'End'
                    : (
                      queueEnded
                      ? 'Reset Queue'
                      : 'Run Queue'
                    )
                  )
              )}
              onClick={() => {
                queueEnded
                  ? resetTimerQueueAll()
                  : initNextTimer();
                }
              }
            />
          )}
        </MenuContainer>
        {queueEnded && (
          <Timer>
            <TimerInstruction>
              {curQueueTime} Completed!
            </TimerInstruction>
          </Timer>
        )}
        { curTimer && (
            <Timer>
              {curTimer.component}
            </Timer>
          )
        }
        { curTimer && (
            <div>
              Current Time: {curQueueTime}
            </div>
          )
        }
        { timers.length > 0 ? (
            <ShowQueuedList/>
        ) : (
          <Timer>
            <TimerInstruction>
              &uarr; Add timer
            </TimerInstruction>
          </Timer>
        )
      }
      {(queueEnded && <Confetti/>)}
      </TimerContainer>
    </Timers>
  );
}

export default WorkQueueView;
