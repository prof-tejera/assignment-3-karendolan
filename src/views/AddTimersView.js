import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

// Import context
import { TimerContext } from "../context/TimerProvider";

// Import the timers
import Stopwatch from "../components/timers/Stopwatch";
import Countdown from "../components/timers/Countdown";
import XY from "../components/timers/XY";
import Tabata from "../components/timers/Tabata";

// Use button for timer choices
import Button from "../components/generic/Button";

// Helper to show list of Timers from the queue context
import ShowQueuedList from "../shared/ShowQueuedList";

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

function AddTimersView() {

  const {
    curTimer,
    setCurTimer,
  } = useContext(TimerContext);

  const timers = [
    { title: "Stopwatch", C: <Stopwatch /> },
    { title: "Countdown", C: <Countdown /> },
    { title: "XY", C: <XY /> },
    { title: "Tabata", C: <Tabata /> },
  ]

  // For routing to add button
  const history = useHistory();

  // previous timer end, current timer load? via effect?
  const chooseTimer = (timer) => {
    setCurTimer(timer);
  };

  const timerElems = timers.map(timer => {
    return (
      <Button
        key={timer.title}
        size='xlarge'
        active={curTimer && curTimer.title === timer.title}
        text={timer.title}
        onClick={() => chooseTimer(timer)}
      />
    )
  })

  return (
    <Timers>
      <TimerContainer>
        <MenuContainer>
          {timerElems}
          {/* Naviate to timer queue */}
           <Button
             key='Show-Queue'
             size='xlarge'
             active={true}
             text='Back to Main Page'
             onClick={() => history.push(`/`)}
           />
        </MenuContainer>
        { !!curTimer ? (
          <Timer>
            {curTimer.C}
          </Timer>
        ) : (
          <Timer>
            <TimerInstruction>
              &larr; Choose a timer
            </TimerInstruction>
          </Timer>
        )
      }
      <Timer>
        <ShowQueuedList/>
      </Timer>
      </TimerContainer>
    </Timers>
  );
}

export default AddTimersView;
