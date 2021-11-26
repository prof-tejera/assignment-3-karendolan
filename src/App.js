import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";

import DocumentationView from "./views/DocumentationView";
import TimersView from "./views/TimersView";

// Timer Provider
import TimerProvider from "./context/TimerProvider";

// import shared color
import GENERIC  from "./shared/COLOR";

// StyledLink
// Inspired by Feb 28 blog post by Ridhik Govind
// https://dev.to/ridhikgovind/how-to-style-your-react-router-links-using-styled-components-2350
const StyledLink = styled(Link)`
  color: ${GENERIC.BUTTON_COLORS.inactive.background};
  text-decoration: none;
  font-size: 2em;
  font-weight: bold;
  margin: 1rem;
  display: inline-block;
  &:hover {
    color: ${GENERIC.PANEL.DEFAULT.background};
  }
`;

const StyledNav = styled.div`
  margin: auto;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

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
        <nav>
          <StyledNav>
            <StyledLink to="/">Timers</StyledLink>
            <StyledLink to="/docs">Documentation</StyledLink>
          </StyledNav>
        </nav>
        <Switch>
          <Route path="/docs">
            <DocumentationView />
          </Route>
          <Route path="/">
            <TimerProvider>
              <TimersView />
            </TimerProvider>
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
