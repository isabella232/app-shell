import styled from 'styled-components';
import { fontSizeSmall } from '@bufferapp/ui/style/fonts';
import {
  grayLighter,
  grayLight,
  grayDark,
  white,
  blue,
} from '@bufferapp/ui/style/colors';

export const Header = styled.div`
  padding: 16px;
  max-width: 422px;

  a {
    font-family: Roboto, sans-serif;
    font-size: 14px;
    font-weight: 700;
    line-height: 16px;
    cursor: pointer;
    text-decoration: none;
    color: ${blue};
  }
`;

export const Title = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 20px;

  span {
    margin-right: 8px;
  }

  svg {
    color: ${grayDark};
  }
`;

export const Icons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    width: 12px;
    height: 12px;
    margin-right: 6px;

    &:last-of-type {
      margin-right: 0;
    }
  }
`;

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${grayLighter};
  width: 100%;
  font-size: ${fontSizeSmall};
`;

export const Section = styled.div`
  background-color: ${white};
  margin: 16px;
  border: 1px ${grayLight} solid;
  border-radius: 4px;
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 16px;
  font-size: ${fontSizeSmall};
`;

export const ChannelCounterWrapper = styled.div`
  width: 140px;
`;

export const Summary = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  flex: 1;

  p {
    color: ${grayDark};
    margin-top: 0;
  }

  span {
    max-width: 217px;
    color: ${grayDark};
    text-align: right;
    line-height: 24px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  padding: 16px 0;
  justify-content: end;
  padding-right: 20px;
`;
