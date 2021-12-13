import React, {useContext, useEffect } from "react";
import { TimerContext } from "../../context/TimerProvider";

// Import components
import Panel from "../generic/Panel";
import Input from "../generic/Input";
import DisplayRounds from "../generic/DisplayRounds";
import DisplayTime from "../generic/DisplayTime";

// Hook to reset all state when component unloads
import useResetTimerCallback from "../../utils/useResetTimerCallback";
// Component to show a fun effect when timer ends
import EndConfetti from '../../utils/EndConfetti';

/**
 * XY functional component
 * Has two inputs, one for rounds, and one for work seconds per round.
 * Has two time displays to show ending secs for the current round and current
 * seconds.
 * Has a rounds display that shows the current round.
 */
const XY = () => {
  const timerTitle = "XY";
  const {
    curSec,
    workSecs,
    setWorkSecs,
    rounds,
    setRounds,
    setIsCountASC,
  } = useContext(TimerContext);
  // Hook to reset all state when component unloads;
  useResetTimerCallback();

  // The Array of inputs used in this timer
  const inputs = [
     <Input
      onChange={(event) => {
        const num = parseInt(event.target.value);
        // The number of seconds per round
        setWorkSecs((num > 0 ? num : 0));
      }}
      label="Seconds"
      name="work"
      value={workSecs}
      key="input-total-work-seconds"
    />,
     <Input
     onChange={(event) => {
       const num = parseInt(event.target.value);
       // The number of rounds
       setRounds((num > 0 ? num : 0));
     }}
      label="Rounds"
      name="rounds"
      value={rounds}
      key="input-total-rounds"
    />
  ];
  // The Array of diplays used in this timer
  const displayTimes = [
    <DisplayTime
      seconds={workSecs}
      active={false}
      key="display-total-time"
    />,
    <DisplayTime
      seconds={curSec}
      size='large'
      active={true}
      key="display-countdown-time"
    />
  ]

  // Set static timer direction state on load
  useEffect(() => {
    setIsCountASC(true);
  }, [setIsCountASC]);

  return (
    <div>
      <Panel
          timerTitle={timerTitle}
          displayRound={(<DisplayRounds/>)}
          inputs={inputs}
          displayTimes={displayTimes}
      />
      <EndConfetti/>
    </div>
  );
}

export default XY;
