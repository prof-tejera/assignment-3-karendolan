/**
* ButtonPanel handles layout of the the button set
*/
import React, {useContext} from "react";
import styled from "styled-components";

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
    work,
    resetStart,
    resetAll,
    isPaused,
    isRunning,
    isReset,
    isInCountdown,
    curTimer,
    workSecs,
    restSecs,
    isCountASC,
    rounds,
  } = useContext(TimerContext);

  const {
    addTimer,
   } = useContext(TimerQueueContext);

  // All timers use these two buttons
  // The Reset button handles ending, reseting to start, or clearing all state
  const resetButtonFunc = (
    isRunning() || isPaused() || isInCountdown()
    ? end
    : (isReset() ? resetAll : resetStart)
  );
  // the Work button handles pausing and playing the timer
  // The 2 options are ability to pause the timer if it's running
  // Or the ability to add the timer to the queue if it's in config state (not running)
  const workButtonFunc = (
    isRunning() || isInCountdown()
      ? pause
      // Add timer to timer queue with config
      : (
        isPaused()
        ? work
        : (
          () => {
           // At least 1 work second required
           if (workSecs < 1) {
             return;
           }
           addTimer({
             workSecs,
             restSecs,
             isCountASC: isCountASC,
             rounds,
             title: curTimer.title,
             component: curTimer.C,
             state: STATUS.NOT_RUNNING,
           });
         }
        )
      )
  );

  return (
    <Container>
      <Button
        size='large'
        active={false}
        text={(
          isRunning() || isPaused() || isInCountdown()
          ? 'End'
          : (
            isReset()
            ? 'Clear'
            : 'Reset'
          )
        )}
        onClick={resetButtonFunc}
      />
      <Button
        size='large'
        active={true}
        text={(
          isRunning() || isInCountdown()
          ? 'Pause'
          : (isReset() ? 'Add Timer' : 'Resume')
        )}
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
