import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

// import shared color
import GENERIC  from "./COLOR";
// import the banner title map
import {LOCATION_TITLE_MAP} from "../utils/constants";

const StyledHeader = styled.div`
  margin: auto;
  text-align: center;
  font-size: 2em;
  font-weight: bold;
  margin: 1rem;
  background-color: ${GENERIC.COLOR.primaryLightest.color};
`;

/**
 * Helper to display the page banner
 */
const PageHeader = () => {
  const location = useLocation();
  const curPageHeader = LOCATION_TITLE_MAP[location.pathname];
  return(
    <StyledHeader>
      {curPageHeader}
    </StyledHeader>
  );
};

export default PageHeader;
