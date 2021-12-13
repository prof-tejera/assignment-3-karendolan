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
// Hook to reset Timer Queue to starting state when component unloads
import useResetQueueCallback from "../utils/useResetQueueCallback";

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
  border-radius: 2em;
  overflow: hidden;
  background-color: ${primaryColor};
  display:flex;
  align-items: center;
  justify-content: center;
`;

const TimerInstruction = styled.div`
  min-height: 200px;
  min-width: 400px;
  text-align: center;
  align-self: center;
  justify-content: center;
  margin: auto;
  font-size: 1.5em;
  color: ${GENERIC.QUEUE_TIMER.container.color};
  background-color: ${GENERIC.QUEUE_TIMER.container.background};
`;

const TimerQueue = styled.div`
  min-height: 200px;
  padding: 10px;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1em;
`;

function WorkQueueView() {
  // the current seconds state of the timer queue
  const [curQueueTime, setCurQueueTime] = useState(0);
  // the current seconds state of the current timer
  const [curTimerTime, setCurTimerTime] = useState(0);
  // Retrieve the queue of configed timers
  const {
    timers,
    curQTimer,
    nextTimer,
    initNextTimer,
    queueEnded,
    goToEndofQueue,
    resetQueueStart,
   } = useContext(TimerQueueContext);

   const {
    isRunning,
    isEnded,
    resetAll,
    resetToCurTimer,
    curSec,
    getCurStartSecs,
   } = useContext(TimerContext);

   // For routing button
   const history = useHistory();
   // Hook to reset tiner queue to start when component unloads
   useResetQueueCallback();

  /**
   * Reset local queue state and context queue state
   */
  const resetTimerQueueAll = () => {
    setCurQueueTime(0);
    resetQueueStart();
  }

  const hasQueuedTimer = timers && timers.length > 0;

  // The variable middle "active" component show notification
  // and the current running timer from the queue
  let  activeBlock;
  if (queueEnded) {
    // Show notification of completion! (Also has confetti)
    activeBlock = (
      <Timer>
        <TimerInstruction>
          Completed!
        </TimerInstruction>
      </Timer>
    );
  } else if (curQTimer) {
    // Show the current active Timer from running queue
    activeBlock = (
      <Timer>
        {curQTimer.component}
      </Timer>
    );
  } else if (!timers || timers.length === 0 ) {
    // Show notification to add a timer to the queue
    activeBlock = (
      <Timer>
        <TimerInstruction>
          &larr; Add a timer
        </TimerInstruction>
      </Timer>
    );
  } else {
    // Show notification to run the queue!
    activeBlock = (
      <Timer>
        <TimerInstruction>
          &larr; Run Queue!
        </TimerInstruction>
      </Timer>
    );
  }

  // When a timer ends, init the next one
  useEffect(() => {
    if (isEnded()) {
      // Reset the timer context data
      resetAll();
      // Start next timer if there is one
      initNextTimer();
    }
  }, [isEnded, resetAll, initNextTimer]);

  // When the cur timer changes, update the timer context
  useEffect(() => {
    // Init the new curent timer
    if (curQTimer && curQTimer.state === STATUS.NOT_RUNNING) {
      console.log('KAREN, --- ',curQTimer.title,' --- ');
      // Prep timer for starting
      curQTimer.state = STATUS.RUNNING;
      // Update the TimerContext
      resetToCurTimer(curQTimer);
    }
  }, [curQTimer, resetToCurTimer]);

  // Increment current total time when the local flag updates
  useEffect(() => {
      console.log('KAREN, detected change in curTimerTime(',curTimerTime,')');
      setCurQueueTime(c => c + 1);
  }, [setCurQueueTime, curTimerTime]);

  // Locally keep track of changes in the timer curSec
  useEffect(() => {
    if (curSec !== curTimerTime
      && isRunning()
      && getCurStartSecs() !== curSec
    ) {
      console.log('KAREN, updating local timer time from (',curTimerTime,') to (', curSec, ') startSec', getCurStartSecs());
      setCurTimerTime(curSec);
    }
  }, [curSec, curTimerTime, setCurTimerTime, isRunning, getCurStartSecs]);

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
                ? 'End All'
                : (
                  curQTimer
                    ? 'End'
                    : (
                      queueEnded
                      ? 'Reset Queue'
                      : 'Run Queue'
                    )
                  )
              )}
              //goToEndofQueue
              onClick={() => {
                return (
                  nextTimer
                  ? goToEndofQueue()
                  : (
                    queueEnded
                      ? resetTimerQueueAll()
                      : initNextTimer()
                    )
                  )
                }
              }
            />
          )}
         {(!curQTimer && !queueEnded &&
            <Button
              key='Add-Timer'
              size='xlarge'
              active={hasQueuedTimer ? false : true}
              text='Add Timer'
              onClick={() => history.push(`/add`)}
            />
        )}
        {(!curQTimer && !queueEnded &&
           <Button
             key='Documentation'
             size='xlarge'
             active={false}
             text='Component Docs'
             onClick={() => history.push(`/docs`)}
           />
       )}
        </MenuContainer>
        {/* Show the active timer or a message */}
        {activeBlock}
        {/* Show queued timer list */}
        { timers.length > 0 && (
          <Timer>
            <TimerQueue>
              <ShowQueuedList
                curQueueTime={curQueueTime}
              />
            </TimerQueue>
          </Timer>
        )
      }
      {(queueEnded && <Confetti/>)}
      </TimerContainer>
    </Timers>
  );
}

export default WorkQueueView;
