import React, { useContext } from "react";
import styled from "styled-components";
import GENERIC  from "../../shared/COLOR";

import { TimerContext } from "../../context/TimerProvider";

const sizeMapping = {
  small: 20,
  medium: 40,
  large: 60,
};

const Container = styled.div`
  margin-top: 20px;
  background-color: ${GENERIC.PANEL.DISPLAY.background};
`;

const Round = styled.span`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background-color: ${(props) => {
    return GENERIC.DISPLAY_ROUNDS[props.activeKey].background
  }};
  color: ${(props) => {
    return GENERIC.DISPLAY_ROUNDS[props.activeKey].color
  }};
  border-radius: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transform: scale(0.75);
  transform-origin: 50% 50%;
`;

const RoundGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  &:before {
    content: "Round";
    color: ${GENERIC.DISPLAY_ROUNDS.label.color};
    padding-right:10px;
  }
`;

/**
 * A functional component to display the current round
 * the timer is in in the context of the total number of rounds
 * The current round changes appearance if in a
 * resting context vs working context.
 */
const DisplayRounds = () => {
  const {
    rounds,
    curRound,
    isInRestingContext,
  } = useContext(TimerContext);

  // construct the round row
  const dots = Array.from(Array(rounds), (e,i)=>i+1).map(i => {
    const isCurRound = (i === curRound);
    return (
      <Round
        size={isCurRound ? sizeMapping.large : sizeMapping.medium}
        activeKey={
          isCurRound
          ? (isInRestingContext() ? 'resting' :'active')
          : 'inactive'
        }
        key={i}
      >
        {isCurRound && curRound}
      </Round>
    );
  })

  return (
    <Container>
      <RoundGroup>
        {dots}
      </RoundGroup>
    </Container>
  );
};

// Class description for the docs
DisplayRounds.docs =   {
  title: 'Display rounds ',
  component: <DisplayRounds />,
  // No more props, all comes from context 
  props: [],
};

export default DisplayRounds;
