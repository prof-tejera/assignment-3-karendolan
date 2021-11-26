import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// Import centralized Timer color
import GENERIC  from '../../shared/COLOR';
// Import timer utlity function
import { getHmsDisplayFromSecs } from '../../utils/HelperFunctions';

const fontSizeMap = {
  small: '.8em',
  medium: '1em',
  large: '3.4em',
};

const Container = styled.div`
  text-align: center;
  font-size: ${(props) => props.size};
  color: ${(props) => {
    return GENERIC.DISPLAY_TIME[props.activeKey].color
  }};
`;

const Label = styled.span`
  margin-right: 20px;
  color: ${GENERIC.DISPLAY_TIME.label.color};
`;

/**
 * Display Time is used to show a time, either the active or total
 * number of seconds of the Timer. A Timer may use multiple DisplayTime
 * components to display different second sets.
 */
const DisplayTime = ({ seconds, label, active, size }) => {
  // const seconds = 7446; //2hr, 4 min, 6 secs
  const textSize = fontSizeMap[size];
  return (
    <Container
      size={textSize}
      activeKey={active ? 'active' : 'inactive'}
    >
      {!active && label && <Label>{label}</Label>}
      { getHmsDisplayFromSecs(seconds) }
    </Container >
  );
};

DisplayTime.propTypes = {
  // The number of seconds to display
  seconds: PropTypes.number,
  // The label to display before the time display
  label: PropTypes.string,
  // The relative display size to use
  size: PropTypes.string,
  // Wether this is the a primary display or secondary
  active: PropTypes.bool,
};

DisplayTime.defaultProps = {
  seconds: 0,
  label: 'Work',
  size: 'medium',
  active: false,
};

// Class description for the docs
DisplayTime.docs =   {
    title: 'Display Time ',
    component: <DisplayTime />,
    props: [
      {
        prop: 'seconds',
        key: 'seconds',
        description: 'Changes the time diplayed',
        type: 'integer',
        defaultValue: DisplayTime.defaultProps.seconds,
      },
      {
        prop: 'label',
        key: 'label',
        description: 'Optional label for display time',
        type: 'string',
        defaultValue: DisplayTime.defaultProps.label,
      },
      {
        prop: 'active',
        key: 'active',
        description: 'Wether this is the active time display',
        type: 'boolean',
        defaultValue: String(DisplayTime.defaultProps.active),
      },
      {
        prop: 'size',
        key: 'size',
        description: 'Size of display time',
        type: 'string',
        defaultValue: DisplayTime.defaultProps.size,
      }
    ]
}

export default DisplayTime;
