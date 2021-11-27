import React, {useContext, useEffect } from "react";

import { TimerContext } from "../../context/TimerProvider";

// Import components
import Panel from "../generic/Panel";
import Input from "../generic/Input";
import DisplayTime from "../generic/DisplayTime";
import DisplayRounds from "../generic/DisplayRounds";

// Hook to reset all state when component unloads
import useResetCallback from "../../utils/useResetCallback";
// Component to show a fun effect when timer ends
import EndConfetti from '../../utils/EndConfetti';

/**
 * Tabata functional component
 * Has three inputs, one for rounds, rest secs, work secs.
 * Has two time displays to show ending secs for the current round and current
 * seconds.
 * Has a rounds display that shows the current round.
 */
const Tabata = () => {
  const timerTitle = "Tabata";
  const {
    curSec,
    workSecs,
    setWorkSecs,
    restSecs,
    setRestSecs,
    rounds,
    setRounds,
    setIsCountASC,
    isInRestingContext,
  } = useContext(TimerContext);
  // Hook to reset all state when component unloads;
  useResetCallback();

  // The amount of total secs in current Tabata segment
  const seconds =  isInRestingContext() ? restSecs : workSecs;
  const label = isInRestingContext() ? 'Rest' : 'Work';

  const inputs = [
    <Input
      onChange={(event) => {
        const num = parseInt(event.target.value);
        setWorkSecs((num > 0 ? num : 0));
      }}
      label="Work seconds"
      name="Work"
      value={workSecs}
      key="input-total-work-seconds"
    />,
    <Input
     onChange={(event) => {
       const num = parseInt(event.target.value);
       setRestSecs((num > 0 ? num : 0));
     }}
     label="Rest seconds"
     name="rest"
     value={restSecs}
     key="input-total-rest-seconds"
   />,
   <Input
    onChange={(event) => {
      const num = parseInt(event.target.value);
      setRounds((num > 0 ? num : 0));
    }}
    label="Rounds"
    name="rounds"
    value={rounds}
    key="input-total-rounds"
    />
  ];
  // Countdown displays the single count down time
  const displayTimes = [
    <DisplayTime
      label={label}
      seconds={seconds}
      key="display-total-time"
      active={false}
    />,
    <DisplayTime
      label='a'
      seconds={curSec}
      size='large'
      active={true}
      key="display-countdown-time"
    />
  ];

    // Set static timer direction state on load
    useEffect(() => {
      setIsCountASC(true);
    }, [setIsCountASC]);

    // Render!
    return (
      <div>
        <Panel
            timerTitle={timerTitle}
            inputs={inputs}
            displayTimes={displayTimes}
            displayRound={(<DisplayRounds/>)}
        />
        <EndConfetti/>
      </div>
    );
}

export default Tabata;
