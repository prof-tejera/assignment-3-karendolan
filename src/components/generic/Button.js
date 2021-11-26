import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import GENERIC  from "../../shared/COLOR";

const sizeMapping = {
  // In pixels
  small: 60,
  medium: 80,
  large: 100,
  xlarge: 140,
};

// Make rounded corner button, but not as round as the RoundsDisplay
// Add different style for hover and active (click) to emphasize user action
const ButtonStyled = styled.button`
  display: block;
  width: ${(props) => props.size}px;
  height: 60px;
  margin: 7px;
  text-align: center;
  font-size: .9em;
  text-decoration: none;
  background-color: ${(props) => {
    return GENERIC.BUTTON_COLORS[props.activeKey].background
  }};
  color: ${(props) => {
    return GENERIC.BUTTON_COLORS[props.activeKey].color
  }};
  border: none;
  border-radius: 10px;
  &:hover {
        outline: none;
        box-shadow: 0px 0px 6px black;
    };
  &:active {
        outline: none;
        box-shadow: 0px 0px 2px red;
        opacity: 0.8;
    };
`;

const Button = ({ active, text, onClick, size }) => {
  const sizeMapped = sizeMapping[size];
  return (
      <ButtonStyled
        size={sizeMapped}
        type="Button"
        defaultValue={text}
        value={text}
        activeKey={ active ? 'active' : 'inactive' }
        onClick={onClick}
      >
        {text}
      </ButtonStyled>
  );
};

Button.propTypes = {
  // Indicates if this is a primary or secondary button
  active: PropTypes.bool,
  // The relative size of the button to display
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  // The text to display in the button
  text: PropTypes.string,
  // The call back to use when the button is clicked
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  actve: true,
  size: 'medium',
  text: 'Press',
};

// Class description for the docs
Button.docs =   {
    title: 'Button ',
    component: <Button defaultValue="" onClick={()=>{}} />,
    props: [
      {
        prop: 'active',
        key: 'active',
        description: 'Wether this is the active button',
        type: 'boolean',
        defaultValue: String(Button.defaultProps.actve),
      },
      {
        prop: 'size',
        key: 'size',
        description: "Changes the size of the button",
        type: "string",
        defaultValue: Button.defaultProps.size,
      },
      {
        prop: 'text',
        key: 'text',
        description: 'The text to display on the button',
        type: 'string',
        defaultValue: Button.defaultProps.text,
      },
      {
        prop: 'onClick',
        key: 'onClick',
        description: 'Callback for click event on button',
        type: 'function',
        defaultValue: 'none',
      }
    ]
};

export default Button;
