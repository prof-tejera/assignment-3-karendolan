import React, { useContext, useEffect } from 'react';
import { TimerContext } from '../../context/TimerProvider';

// Import components
import Panel from '../generic/Panel';
import Input from '../generic/Input';
import DisplayTime from '../generic/DisplayTime';
// Hook to reset all state when component unloads
import useResetTimerCallback from "../../utils/useResetTimerCallback";
// Component to show a fun effect when timer ends
import EndConfetti from '../../utils/EndConfetti';

/**
 * Countdown functional component
 * Has one input and one display that counts down.
 */
const Countdown = () => {
  const {
    curSec,
    workSecs,
    setWorkSecs,
    setCurSec,
    setIsCountASC,
  } = useContext(TimerContext);

  // Hook to reset all state when component unloads;
  useResetTimerCallback();

  const timerTitle = 'Countdown';
  const inputs = [
     <Input
      onChange={(event) => {
        const num = parseInt(event.target.value);
        // The number of seconds to count down
        setWorkSecs((num > 0 ? num : 0));
        // Setting Cur sec to start at the total for countdown
        setCurSec((num > 0 ? num : 0));
      }}
      label='Seconds'
      name='seconds'
      value={workSecs}
      key='input-total-seconds'
    />
  ];
  // Countdown displays the single count down time
  const displayTimes = [
    <DisplayTime
      seconds={curSec}
      size='large'
      active={true}
      key='display-current-seconds'
    />
  ]

  // Set static timer direction state on load
  useEffect(() => {
    setIsCountASC(false);
  }, [setIsCountASC]);

  return (
    <div>
      <Panel
          timerTitle={timerTitle}
          inputs={inputs}
          displayTimes={displayTimes}
      />
      <EndConfetti/>
    </div>
  );
}

export default Countdown;
