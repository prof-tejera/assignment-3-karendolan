/**
* ButtonPanel handles layout of the the button set
*/
import React, {useContext} from "react";
import styled from "styled-components";
import { useHistory } from 'react-router-dom';

// Import the data provider
import { TimerContext } from "../../context/TimerProvider";
import { TimerQueueContext } from '../../context/TimerQueueProvider';

// Import status/state constants
import { STATUS } from '../../utils/constants';

import Button from "./Button";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const ButtonPanel = () => {
  const {
    pause,
    end,
    resetStart,
    resetAll,
    isPaused,
    isRunning,
    isReset,
    curTimer,
    workSecs,
    restSecs,
    isAsc,
    rounds,
  } = useContext(TimerContext);

  const {
    addTimer,
   } = useContext(TimerQueueContext);

  // for onAddTimer
  const history = useHistory();

  console.log('workSec in button panel functional', workSecs);

  // All timers use these two buttons
  // The Reset button handles ending, reseting to start, or clearing all state
  const resetButtonFunc = isRunning() ? end : (isReset() ? resetAll : resetStart);
  // the Work button handles pausing and playing the timer
  // The 2 options are ability to pause the timer if it's running
  // Or the ability to add the timer to the queue if it's in config state (not running)
  const workButtonFunc = (
    isRunning()
      ? pause
      // Add timer to timer queue with config
      : () => {
        console.log('workSec inside  add', workSecs);
        // At least 1 work second required
        if (workSecs < 1) {
          return;
        }
        addTimer({
          workSecs,
          restSecs,
          isAsc,
          rounds,
          title: curTimer.title,
          component: curTimer.C,
          state: STATUS.NOT_RUNNING,
        });
        // return to home page
        history.push('/')
      }
  );

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
        text={(isRunning() ? 'Pause' : (isPaused() ? 'Resume' : 'Add Timer'))}
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
