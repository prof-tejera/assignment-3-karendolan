import React, { useContext } from "react";
// Enabled styled components
import styled from "styled-components";
// Import timer utlity function
import { getHmsDisplayFromSecs } from "../utils/HelperFunctions";
// Context Provider
import { TimerQueueContext } from "../context/TimerQueueProvider";

// Common color for default timer background
import GENERIC from "../shared/COLOR";
const primaryColor = GENERIC.PANEL.DEFAULT.background;
const timerSummaryBgColor = GENERIC.PANEL.DEFAULT.color;
const timerSummaryBgActiveColor = GENERIC.COLOR.secondary22.color;
const timerSummaryColor = GENERIC.COLOR.primary1.color;

const ListWrapper = styled.div`
  border: 1px solid gray;
  margin: 20px 0 20px;
  border-radius: 20%;
  overflow: hidden;
  min-width: 50vh;
  min-height: 65vh;
  background-color: ${primaryColor};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TimerSummary = styled.div`
  border: 1px solid gray;
  margin: 10px;
  padding: 10px;
  border-radius: 10%;
  color: ${timerSummaryColor};
  background-color: ${timerSummaryBgColor}; //timerSummaryBgActiveColor
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

/**
 * Helper to convert seconds into display HH:MM:SS
 */
const ShowQueuedList = () => {
  // Retrieve the queue of configed timers
  const { timers, totalTime, curTimer } = useContext(
    TimerQueueContext
  );
  // loop through the list of queued timers
  const timerElems = timers.map((timer, index) => {
    const { title, workSecs, restSecs, rounds, state } = timer;
    return (
      <TimerSummary key={index}>
        {title}
        {workSecs !== 0 && (
          <div>
            time: {getHmsDisplayFromSecs(workSecs)}
          </div>
        )}
        {restSecs !== 0 && (
          <div>
            rest: {getHmsDisplayFromSecs(restSecs)}
          </div>
        )}
        {rounds !== 0 && (
          <div>
            rounds: {rounds}
          </div>
        )}
        {state && (
          <div>
            state: {state}
          </div>
        )}
      </TimerSummary>
    );
  });
  return (
    <ListWrapper>
      <div>
        <div>{timerElems}</div>
      </div>
      <div>
        Total Duration: {getHmsDisplayFromSecs(totalTime)}
      </div>
    </ListWrapper>
  );
};

export default ShowQueuedList;
