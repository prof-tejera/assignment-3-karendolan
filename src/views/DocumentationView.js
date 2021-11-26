import React from "react";
import styled from "styled-components";

import DocumentComponent from "../components/documentation/DocumentComponent";
import TimerProvider from "../context/TimerProvider";

// Components to describe
import Loading from "../components/generic/Loading";
import Button from "../components/generic/Button";
import DisplayTime from "../components/generic/DisplayTime";
import Input from "../components/generic/Input";
import DisplayRounds from "../components/generic/DisplayRounds";
import Panel from "../components/generic/Panel";
import ButtonPanel from "../components/generic/ButtonPanel";

// The list of components to Describe
const DocList = [Loading, DisplayTime, Input, DisplayRounds, Button, ButtonPanel, Panel];

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  width: 80%;
`;

const Documentation = () => {
  // compomose the component elements
  const components = DocList.map(CurrComp => {
    const {title, component, props} = CurrComp.docs;
    return (
      <DocumentComponent
        key={title}
        title= {title}
        component={component}
        propDocs={props}
      />
    )
  })
  return (
    <Container>
      <TimerProvider>
        {components}
      </TimerProvider>
    </Container>
  );
}

export default Documentation;
