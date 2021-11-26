import React, {useContext, useEffect } from "react";

// Import components
import Panel from "../generic/Panel";
import Input from "../generic/Input";
import DisplayTime from "../generic/DisplayTime";
import { TimerContext } from "../../context/TimerProvider";

// Hook to reset all state when component unloads
import useResetCallback from "../../utils/useResetCallback";
// Hook to show a fun effect when timer ends
import useEndedEffect from '../../utils/useEndedEffect';

/**
 * Stopwatch functional component
 * Has one input and a display that counts up
 * and a display that shows the ending time.
 */
const Stopwatch = () => {
  const timerTitle = "Stopwatch";
  const {
    curSec,
    workSecs,
    setWorkSecs,
    setIsCountASC,
  } = useContext(TimerContext);

  // Hook to reset all state when component unloads;
  useResetCallback();

  // Create input components
  const inputs = [
     <Input
      onChange={(event) => {
        if (event && event.target) {
          const num = parseInt(event.target.value);
          setWorkSecs((num > 0 ? num : 0));
        }
      }}
      key="input-total-seconds"
      label="End seconds"
      name="seconds"
      value={workSecs}
    />
  ];
  // Create Display Time components
  // Stop watch shows 2 display times, the count up and end time
  const displayTimes = [
    <DisplayTime
      label="Total"
      seconds={workSecs}
      active={false}
      key="display-total-seconds"
    />,
    <DisplayTime
      seconds={curSec}
      size='large'
      active={true}
      key="display-current-seconds"
    />
  ];

  // Set static timer direction state on load
  useEffect(() => {
    setIsCountASC(true);
  }, [setIsCountASC]);

  // The Return Rendered componet
  return (
    <div>
      <Panel
        displayTimes={displayTimes}
        timerTitle={timerTitle}
        inputs={inputs}
      />
      {useEndedEffect()}
    </div>
  );
}

export default Stopwatch;
