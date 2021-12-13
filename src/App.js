import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";

// Import the 3 views
import DocumentationView from "./views/DocumentationView";
import AddTimersView from "./views/AddTimersView";
import WorkQueueView from "./views/WorkQueueView";

// Title components
import TimerQueueProvider from "./context/TimerQueueProvider";

// Timer Provider
import TimerProvider from "./context/TimerProvider";
import PageHeader from "./shared/PageHeader";

const Container = styled.div`
  flex: 1;
  background: #f0f6fb;
  height: 100vh;
  overflow: auto;
  font-size: 1.4rem;
  /* Using Gill Sans because it's fun, easy to read, and emits energy */
  font-family: "Gill Sans", sans-serif;
`;

function App() {
  return (
    <Container>
      <Router>
        <PageHeader/>
        <Switch>
          <Route path="/docs">
            {/* Add context to docs to avoid loosing queued timers */}
            <TimerQueueProvider>
              <TimerProvider>
                <DocumentationView />
              </TimerProvider>
            </TimerQueueProvider>
          </Route>
          <Route path="/add">
            <TimerQueueProvider>
              <TimerProvider>
                <AddTimersView />
              </TimerProvider>
            </TimerQueueProvider>
          </Route>
          <Route path="/">
            <TimerQueueProvider>
              <TimerProvider>
                <WorkQueueView/>
              </TimerProvider>
            </TimerQueueProvider>
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
