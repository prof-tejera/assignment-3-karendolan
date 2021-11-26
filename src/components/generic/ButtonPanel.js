/**
* ButtonPanel handles layout of the the button set
*/
import React, {useContext} from "react";
import styled from "styled-components";

// Import the data provider
import { TimerContext } from "../../context/TimerProvider";

import Button from "./Button";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const ButtonPanel = () => {
  const {
    work,
    pause,
    end,
    resetStart,
    resetAll,
    isPaused,
    isRunning,
    isReset,
  } = useContext(TimerContext);

  // All timers use these two buttons
  // The Reset button handles ending, reseting to start, or clearing all state
  const resetButtonFunc = isRunning() ? end : (isReset() ? resetAll : resetStart);
  // the Work button handles pausing and playing the timer
  const workButtonFunc = isRunning() ? pause : work;

  return (
    <Container>
      <Button
        size='large'
        active={false}
        text={(isRunning() ? 'End' : (isReset() ? 'Clear' : 'Reset'))}
        onClick={resetButtonFunc}
      />
      <Button
        size='large'
        active={true}
        text={(isRunning() ? 'Pause' : (isPaused() ? 'Resume' : 'Start'))}
        onClick={workButtonFunc}
      />
    </Container>
  )
};

// Class param description for the docs
ButtonPanel.docs =   {
  title: 'ButtonPanel ',
  component: <ButtonPanel  onClick={()=>{}} />,
  // No more props, gets it all from context
  props: [],
}

export default ButtonPanel;
