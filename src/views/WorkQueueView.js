import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
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
  margin: 1em;
  border-radius: 4em;
  min-height: 200px;
  min-width: 400px;
  overflow: hidden;
  background-color: ${primaryColor};
  display:flex;
  align-items: center;
  justify-content: center;
`;

const TimerInstruction = styled.div`
  align-self: center;
  margin: auto;
  font-size: 1.5em;
  color: ${GENERIC.QUEUE_TIMER.container.color};
  background-color: ${GENERIC.QUEUE_TIMER.container.background};
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1em;
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
    setIsCountASC,
    work,
    isRunning,
    isEnded,
    isCountASC,
    totalTime,
    resetAll,
    curSec,
   } = useContext(TimerContext);

   // For routing button
   const history = useHistory();

  /**
   * Reset local queue state and context queue state
   */
  const resetTimerQueueAll = () => {
    setCurQueueTime(0);
    resetQueueStart();
  }

  const hasQueuedTimer = timers && timers.length > 0;

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
      setIsCountASC(curTimer.isCountASC);
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
          {hasQueuedTimer && (
            <Button
              key='Run-Queue'
              size='xlarge'
              active={true}
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
         {(!curTimer && !queueEnded &&
            <Button
              key='Add-Timer'
              size='xlarge'
              active={hasQueuedTimer ? false : true}
              text='Add Timer'
              onClick={() => history.push(`/add`)}
            />
        )}
        {(!curTimer && !queueEnded &&
           <Button
             key='Documentation'
             size='xlarge'
             active={false}
             text='Component Docs'
             onClick={() => history.push(`/docs`)}
           />
       )}
        </MenuContainer>
        {queueEnded && (
          <Timer>
            <TimerInstruction>
              Completed!
            </TimerInstruction>
          </Timer>
        )}
        { curTimer && (
            <Timer>
              {curTimer.component}
            </Timer>
          )
        }
        {/* Show queued timer list */}
        { timers.length > 0
          ? (
          <Timer>
            <ShowQueuedList
              curQueueTime={curQueueTime}
            />
          </Timer>
        ) : (
          <Timer>
            <TimerInstruction>
              &larr; Add timer
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
