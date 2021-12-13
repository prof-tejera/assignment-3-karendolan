import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const primaryColor = "#ffa2bf";

const sizeMapping = {
  small: 10,
  medium: 14,
  large: 20,
};

const Container = styled.div`
  animation: spin 1.5s linear infinite;

  @-moz-keyframes spin {
    100% {
      -moz-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

const Dot = styled.span`
  display: block;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background-color: ${(props) => props.color};
  border-radius: 100%;
  transform: scale(0.75);
  transform-origin: 50% 50%;
  opacity: 0.3;
  animation: wobble 1s ease-in-out infinite;

  @keyframes wobble {
    0% {
      border-radius: 25%;
    }
    100% {
      border-radius: 100%;
    }
  }
`;

const DotGroup = styled.div`
  display: flex;
`;

const Loading = ({ color, size }) => {
  const sizeMapped = sizeMapping[size];
  return (
    <Container>
      <DotGroup>
        <Dot size={sizeMapped} color={color} />
        <Dot size={sizeMapped} color={color} />
      </DotGroup>
      <DotGroup>
        <Dot size={sizeMapped} color={color} />
        <Dot size={sizeMapped} color={color} />
      </DotGroup>
    </Container>
  );
}

// Class description for the docs
Loading.docs =   {
    title: 'Loading spinner ',
    component: <Loading />,
    props: [
      {
        prop: 'size',
        key: 'size',
        description: "Changes the size of the loading spinner",
        type: "string",
        defaultValue: "medium",
      },
      {
        prop: 'color',
        key: 'color',
        description: "Changes the color of the loading spinner",
        type: "string",
        defaultValue: primaryColor,
      }
    ]
}

Loading.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.string,
};

Loading.defaultProps = {
  size: "medium",
  color: primaryColor,
};

export default Loading;
