import React from 'react';
import styled from 'styled-components';
import {
  blue,
  boxShadow,
  gray,
  grayDark,
  grayLight,
  redDark,
  redLighter,
} from '@bufferapp/ui/style/colors';
import WarningIcon from '@bufferapp/ui/Icon/Icons/Warning';
import Text from '@bufferapp/ui/Text';

export const StyledError = styled.p`
  margin: 0px;
  display: inline-block;
  align-items: center;
  width: 100%;
  overflow: ${({ isInline }) => isInline ? 'hidden' : ''};
  text-overflow: ellipsis;
  font-size: 14px;

  span {
    color: ${redDark};
  }

  svg {
    color: ${redDark};
    height: 12px;
    margin-right: 4px;
    position: relative;
    top: 1px;
  }
`;

export const Error = ({ isInline, error }) => (
  <StyledError isInline={isInline} aria-live="polite">
    {error && (
      <>
        <WarningIcon />
        <Text>{error.message}</Text>
      </>
    )}
  </StyledError>
);

export const Form = styled.form`
  display: flex;
  height: 580px;
  width: 920px;
  box-sizing: border-box;

  background: url('https://buffer-ui.s3.amazonaws.com/Billing+Screen+-+Background.png');
  background-size: 39%;
  background-repeat: no-repeat;
  background-position-x: 55%;
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
  margin-bottom: 16px;
  label {
    overflow: visible;
    height: fit-content;
  }
`;

export const Input = styled.div`
  background: #ffffff;
  box-sizing: border-box;
  border: 1px solid
    ${({ focus, hasError }) => {
      if (focus) {
        return hasError ? redDark : blue;
      }
      return gray;
    }};
  box-shadow: 0px 0px 0px 3px
    ${({ focus, hasError }) => {
      if (focus) {
        return hasError ? redLighter : boxShadow;
      }
      return 'transparent';
    }};
  border-radius: 5px;
  padding: 16px;
  height: 54px;
  margin-top: 8px;
  transition-property: border-color, box-shadow;
  transition-duration: 0.1s;
  transition-timing-function: ease-in;
  margin-bottom: 8px;

  svg {
    color: ${({ hasError }) => (hasError ? redDark : grayLight)};
  }
`;

export const DoubleFields = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  ${Field} {
    width: calc(50% - 8px);
    margin-bottom: 0px;
  }
`;

export const LeftSide = styled.div`
  box-sizing: border-box;
  display: flex;
  padding: 36px 24px 24px 24px;
  width: 665px;
  flex-direction: column;
  ${Footer} {
    margin-top: auto;

    button {
      color: ${blue};
      padding: 0px;
    }

    p {
      margin: 0px;
    }
  }

  h2 {
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

export const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;

  h2 {
    margin-top: 0;
    margin-bottom: 0;
  }
`;

export const ButtonContainer = styled.div`
  border-bottom-right-radius: 8px;
  height: 88px;
  padding: 24px 20px;
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  width: 100%;
  box-shadow: inset 1px 0px 0px #bdbdbd;
`;

export const ImgWrapper = styled.div`
  height: 18px;
  overflow: hidden;
  img {
    position: relative;
    top: -7px;
  }
`;

export const CardWrapper = styled.div`
  display: flex;
  align-items: center;

  > div {
    margin-left: 16px;
    width: 100%;
  }

  ${ImgWrapper} {
    width: 32px;
    margin-left: 0px;
  }
`;

export const Notice = styled.div`
  border: 1px solid #a59638;
  color: #625920;
  background: #fdf8d8;
  border-radius: 6px;
  padding: 16px;

  p {
    margin: 0;
  }
`;
