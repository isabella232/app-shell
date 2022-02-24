import styled from 'styled-components';
import { fontSizeSmall } from '@bufferapp/ui/style/fonts';
import {
  grayLighter,
  grayLight,
  white,
  blue,
} from '@bufferapp/ui/style/colors';

export const Container = styled.div`
  align-items: center;
  border-radius: 8px;
  box-sizing: border-box;
  width: 512px;
`;

export const LoadingContainer = styled(Container)`
  width: 700px;
  justify-content: center;
`;

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
    margin-right: 15px;
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
  display: flex;
  flex-direction: column;
  background-color: ${white};
  margin: 16px;
  border: 1px ${grayLight} solid;
  box-sizing: border-box;
  border-radius: 4px;

  font-size: ${fontSizeSmall};
`;

export const ButtonWrapper = styled.div`
  display: flex;
  padding: 16px 0;
  justify-content: end;
  padding-right: 20px;
`;
