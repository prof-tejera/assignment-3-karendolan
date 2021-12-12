import React, { useContext } from "react";
// Enabled styled components
import styled from "styled-components";
// Import timer utlity function
import { getHmsDisplayFromSecs } from "../utils/HelperFunctions";
import { STATUS } from '../utils/constants';
// Context Provider
import { TimerQueueContext } from "../context/TimerQueueProvider";

// Common color for default timer background
import GENERIC from "../shared/COLOR";

const ListWrapper = styled.div`
  border: 1px solid gray;
  margin: 20px 0 20px;
  border-radius: 20%;
  overflow: hidden;
  min-width: 50vh;
  min-height: 65vh;
  color: ${GENERIC.QUEUE_TIMER.container.color};
  background-color: ${GENERIC.QUEUE_TIMER.container.background};
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
  color: ${(props) => {
    return GENERIC.QUEUE_TIMER[props.activeKey].color
  }};
  background-color: ${(props) => {
    return GENERIC.QUEUE_TIMER[props.activeKey].background
  }};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TimeHeader = styled.div`
  padding: 10px;
  font-size: 1.3em;
  font-weight: bold;
  margin: auto;
  align: center;
`;

const TimeSubHeader = styled.div`
  padding: 3px;
  margin: auto;
  align: center;
`;


/**
 * Helper to convert seconds into display HH:MM:SS
 */
const ShowQueuedList = ({curQueueTime}) => {
  // Retrieve the queue of configed timers
  const { timers, totalTime } = useContext(
    TimerQueueContext
  );
  // loop through the list of queued timers
  const timerElems = timers.map((timer, index) => {
    const { title, workSecs, restSecs, rounds, state } = timer;
    return (
      <TimerSummary
        activeKey={
          state === STATUS.RUNNING
          ? 'active'
          : (
            state === STATUS.COMPLETED
            ? 'completed'
            : 'inactive'
          )
        }
      >
        {title}
        {workSecs !== 0 && (
          <div>
            Time: {getHmsDisplayFromSecs(workSecs)}
          </div>
        )}
        {restSecs !== 0 && (
          <div>
            Rest: {getHmsDisplayFromSecs(restSecs)}
          </div>
        )}
        {rounds !== 0 && (
          <div>
            Rounds: {rounds}
          </div>
        )}
        {state && (
          <div>
            {state}
          </div>
        )}
      </TimerSummary>
    );
  });
  return (
    <ListWrapper>
      <HeaderContainer>
        <TimeHeader>
          Timer Queue
        </TimeHeader>
        <TimeSubHeader>
          Total Time: {getHmsDisplayFromSecs(totalTime)}
        </TimeSubHeader>
        {curQueueTime > 0 && (
          <TimeSubHeader>
            Queue Current Time: {getHmsDisplayFromSecs(curQueueTime)}
          </TimeSubHeader>
        )}
      </HeaderContainer>
      <div>
        <div>{timerElems}</div>
      </div>
    </ListWrapper>
  );
};

export default ShowQueuedList;
