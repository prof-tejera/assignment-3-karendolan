import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import styled from "styled-components";

// Use button for timer choices
import Button from "../components/generic/Button";
// Import timer utlity function
import { getHmsDisplayFromSecs } from '../utils/HelperFunctions';
// Context Provider
import { TimerQueueContext } from '../context/TimerQueueProvider';
import { TimerContext } from "../context/TimerProvider";

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

//timers

function WorkQueueView() {
  // Retrieve the queue of configed timers
  const {
    timers,
    totalTime,
    curTimer,
    nextTimer,
    initNextTimer,
   } = useContext(TimerQueueContext);

   const {
    setIsCountASC,
    setWorkSecs,
    setRestSecs,
    setRounds,
    work,
   } = useContext(TimerContext);

   // Init the context
   if (curTimer && curTimer.state === STATUS.NOT_RUNNING) {
     curTimer.state = STATUS.RUNNING;
     setIsCountASC(curTimer.isCountASC);
     setWorkSecs(curTimer.workSecs);
     setRestSecs(curTimer.restSecs);
     setRounds(curTimer.rounds);
     work();
   }

  // For routing to add button
  const history = useHistory();

  const timerElems = timers.map((timer, index) => {
    const {title, workSecs, restSecs, rounds, state} = timer;
    console.log('KAREN timer', timer);
    return (
      <li key={index}>
        {title}
        {(workSecs !== 0) && (<div> time: {getHmsDisplayFromSecs(workSecs)} </div>)}
        {(restSecs !== 0) && (<div>rest: {getHmsDisplayFromSecs(restSecs)} </div>)}
        {(rounds !== 0) && (<div>rounds: {rounds} </div>)}
        {state && (<div>state: {state} </div>)}
      </li>
    );
  });

  console.log('timerElems length', timerElems.length, 'curTimer', curTimer);

  return (
    <Timers>
      <TimerContainer>
        <MenuContainer>
          {(!curTimer &&
            <Button
              key='Add-Timer'
              size='xlarge'
              active={false}
              text='Add Timer'
              onClick={() => history.push(`/add`)}
            />
          )}
          {(timers && timers.length > 0) && (
            <Button
              key='Run-Queue'
              size='xlarge'
              active={false}
              text={nextTimer
                ? 'Next Timer'
                : (
                  curTimer ? 'End': 'Run Timer Queue'
                )
              }
              onClick={() => {
                initNextTimer();
              }}
            />
          )}
        </MenuContainer>
        { curTimer && (
            <Timer>
              {curTimer.component}
            </Timer>
          )
        }
        { timerElems.length > 0 ? (
          <Timer>
            <div>
              <ol>
                {timerElems}
              </ol>
              Total Duration:
              {' '}
              {getHmsDisplayFromSecs(totalTime)}
            </div>
          </Timer>
        ) : (
          <Timer>
            <TimerInstruction>
              &larr; Add a timer
            </TimerInstruction>
          </Timer>
        )
      }
      </TimerContainer>
    </Timers>
  );
}

export default WorkQueueView;
