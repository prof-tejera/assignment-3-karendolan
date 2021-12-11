import React, { useContext } from "react";

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
  border-radius: 20%;
  overflow: hidden;
  min-width: 50vh;
  min-height: 65vh;
  background-color: ${primaryColor};
  display:flex;
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
  margin-right: 5vh;
  margin-top: 20vh;
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
      </TimerContainer>
    </Timers>
  );
}

export default AddTimersView;
