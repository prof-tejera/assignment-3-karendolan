import React, {useState} from "react";

import styled from "styled-components";

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
  margin: 20px 0 20px;
  border-radius: 20%;
  overflow: hidden;
  height: 80%;
  min-width: 500px;
  min-height: 700px;
  background-color: ${primaryColor};
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 30px;
  margin-top: 120px;
`;

function WorkQueueView() {
  //const curTimer = useRef(undefined);
  const [curTimer, setCurTimer] = useState(0);

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
        active={curTimer.title === timer.title}
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
          <Timer/>
        )
      }
      </TimerContainer>
    </Timers>
  );
}

export default WorkQueueView;
