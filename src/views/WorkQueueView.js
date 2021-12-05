import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import styled from "styled-components";

// Use button for timer choices
import Button from "../components/generic/Button";
// Import timer utlity function
import { getHmsDisplayFromSecs } from '../utils/HelperFunctions';

// Context Provider
import { TimerQueueContext } from '../context/TimerQueueProvider';

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
  min-width: 50vh;
  min-height: 65vh;
  background-color: ${primaryColor};
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 30px;
  margin-top: 120px;
`;

//timers

function WorkQueueView() {
  // Retrieve the queue of configed timers
  const {
    timers,
    totalTime,
   } = useContext(TimerQueueContext);

  const [curTimer] = useState(0);
  // For routing to add button
  const history = useHistory();

  const timerElems = timers.map((timer, index) => {
    return (
      <li key={index}>
        {timer.title}
      </li>
    );
  });

  console.log('timerElems length', timerElems.length);

  return (
    <Timers>
      <TimerContainer>
        <MenuContainer>
          <Button
            key='Add-Timer'
            size='xlarge'
            active={false}
            text='Add Timer'
            onClick={() => history.push(`/add`)}
          />
        </MenuContainer>
        { timerElems.length > 0 ? (
          <div>
            <ol>
              {timerElems}
            </ol>
            Queued Timer Duration:
            {' '}
            {getHmsDisplayFromSecs(totalTime)}
          </div>
        ) : (
          <Timer/>
        )
      }
      </TimerContainer>
    </Timers>
  );
}

export default WorkQueueView;
