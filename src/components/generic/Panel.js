/**
 * Panel handles layout of the components of the timer
 */
 import React, {useContext} from "react";
 import PropTypes from "prop-types";
 import styled from "styled-components";

 // Import component
 import ButtonPanel from "./ButtonPanel";
 import Input from "../generic/Input";
 import DisplayTime from "../generic/DisplayTime";
 import DisplayRounds from "../generic/DisplayRounds";

 // Import the data provider
 import { TimerContext } from "../../context/TimerProvider";

 //import constants and shared
 import GENERIC  from "../../shared/COLOR";

 const primaryColor =  GENERIC.PANEL.DEFAULT.background;

 const PanelStyle = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   height: 85vh;
   width: 500px;
   /* Using Gill Sans because it's fun, easy to read, and emits energy */
   font-family: "Gill Sans", sans-serif;
   background-color: ${primaryColor};
   color: ${GENERIC.PANEL.DEFAULT.color};
`;

const TitleContainer = styled.div`
  color: ${GENERIC.PANEL.INPUT.background};
  background-color: ${GENERIC.BUTTON_COLORS.inactive.background};
  padding: 20px 20px 30px;
  font-size: 3em;
  font-weight: bold;
  text-align: center;
`;
//   padding: 40px 2px;
 const InputsContainer = styled.div`
   color: ${GENERIC.PANEL.INPUT.color};
   background-color: ${GENERIC.PANEL.INPUT.background};
   min-height: 20%;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
`;

  const DisplayContainer = styled.div`
    background-color: ${(props) => {
      return GENERIC.PANEL.DISPLAY[props.bg].background
    }};
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    padding: 60px 60px 20px;
    flex-grow: 1;
  `;

  const ControlsContainer = styled.div`
    background-color: ${GENERIC.PANEL.CONTROLS.background};
    padding: 20px 40px;
  `;

  /**
   * the Panel function
   */
 const Panel = ({
   timerTitle,
   inputs,
   displayTimes,
   displayRound,
 }) => {
   // The inputs are only shown in the RESET state.
   // The inputs are hidden when the timer is running or paused.
   const {
     isReset,
     isCountASC,
     curSec,
     isEnded,
     isRunning,
     getCurStartSecs,
   } = useContext(TimerContext);

   // Change color depending on state
   const displayColorKey = (
     // If start of Timer, or inbetween rounds
     isRunning() && (isCountASC ? curSec < getCurStartSecs() : curSec > getCurStartSecs())
     ? 'ready'
     // If ended or in the middle of a count
     : (isEnded() ? 'end' : 'default' )
    );

    return (
     <PanelStyle>
      <InputsContainer>
        {(isReset() && inputs)}
      </InputsContainer>
      <DisplayContainer bg={displayColorKey}>
          {displayTimes}
          {displayRound}
      </DisplayContainer>
      <ControlsContainer>
        <ButtonPanel/>
      </ControlsContainer>
      <TitleContainer>
        {timerTitle}
      </TitleContainer>
     </PanelStyle>
   );
 };

 Panel.propTypes = {
   timerTitle: PropTypes.string.isRequired,
   inputs: PropTypes.arrayOf(Input),
   displayTimes: PropTypes.arrayOf(DisplayTime),
   displayRound: PropTypes.arrayOf(DisplayRounds),
 };

 Panel.defaultProps = {
   size: "medium",
   color: primaryColor,
 };

 // Class description for the docs
 Panel.docs =   {
     title: 'Panel ',
     component: <Panel onClick={()=>{}} timerTitle="Panel" />,
     props: [
       {
         prop: 'timerTitle',
         key: 'timerTitle',
         description: "The name of the timer",
         type: "String",
         defaultValue: "none",
       },
       {
         prop: 'inputs',
         key: 'inputs',
         description: "An array of Input objects",
         type: "[Input]",
         defaultValue: "none",
       },
       {
         prop: 'displayRound',
         key: 'displayRound',
         description: "A DisplayRound object",
         type: "DisplayRound",
         defaultValue: "none",
       },
       {
         prop: 'displayTimes',
         key: 'displayTimes',
         description: "An Array of DisplayTimes objects",
         type: "[DisplayTimes]",
         defaultValue: "none",
       }
     ]
 }

 export default Panel;
