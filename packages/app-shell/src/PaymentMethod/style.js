import React from 'react';
import styled from 'styled-components';
import {
  blue,
  boxShadow,
  gray,
  grayDark,
  grayLight,
  grayLighter,
  redDark,
  redLighter,
} from '@bufferapp/ui/style/colors';
import WarningIcon from '@bufferapp/ui/Icon/Icons/Warning';
import Text from '@bufferapp/ui/Text';

export const StyledError = styled.div`
  color: ${redDark};
  margin-top: 8px;
  display: inline-flex;
  align-items: center;

  svg {
    color: ${redDark};
    height: 12px;
    margin-right: 4px;
  }
`;

export const Error = ({ error }) => (
  <StyledError>
    <WarningIcon /> <Text>{error.message}</Text>
  </StyledError>
)

export const Form = styled.form`
  display: flex;
  height: 415px;
  width: 920px;
  box-sizing: border-box;
`;

export const Footer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;

  p {
    color: ${grayDark};

    svg {
      height: 12px;
    }
  }
`;

export const Field = styled.div`
  margin-bottom: 24px;
  label {
    overflow: visible;
    height: fit-content;
  }
`;

export const Input = styled.div`
  box-sizing: border-box;
  border: 1px solid ${({ focus, hasError }) => {
      if (focus) {
        return hasError ? redDark : blue;
      }
      return gray;
    }
  };
  box-shadow: 0px 0px 0px 3px ${({ focus, hasError }) => {
      if (focus) {
        return hasError ? redLighter : boxShadow;
      }
      return "transparent";
    }
  };
  border-radius: 5px;
  padding: 16px;
  height: 54px;
  margin-top: 8px;
  transition-property: border-color, box-shadow;
  transition-duration: 0.1s;
  transition-timing-function: ease-in;

  svg {
    color: ${({ hasError }) => hasError ? redDark : grayLight}
  }

`;

export const DoubleFields = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  ${Field} {
    width: calc(50% - 8px);
  }
`;

export const LeftSide = styled.div`
  box-sizing: border-box;
  display: flex;
  padding: 24px;
  width: 665px;
  flex-direction: column;
  ${Footer} {
    button {
      color: ${blue};
      padding: 0px;
    }
  }
`;

export const RightSide = styled.div`
  background: #FCFCFC;
  box-sizing: border-box;
  display: flex;
  width: 255px;
  box-shadow: inset 1px 0px 0px #BDBDBD;

  ${Footer} {
    background-color: ${grayLighter};
    box-shadow: inset 1px 0px 0px #BDBDBD;
    box-sizing: border-box;
    height: 88px;
    margin-top: auto;
    padding: 24px 20px;
  }
`;
