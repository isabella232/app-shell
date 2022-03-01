import styled from 'styled-components';
import { grayLighter, blue, white } from '@bufferapp/ui/style/colors';

export const Content = styled.div`
  width: 1153px;
  height: 539px;
  background: ${grayLighter};
  padding: 64px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Video = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 520px;

  label {
    margin-top: 16px;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-left: 64px;
  width :371px;
`;

export const PlayIcon = styled.div`
  width: 75px;
  height: 75px;
  border-radius: 75px;
  background-color: rgba(184,184,184,.5);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 180ms ease-in;

  &:after {
    content: '';
    display: block;
    box-sizing: border-box;
    transition: all 100ms ease-in;
    border-left: solid ${blue} 28px;
    border-top: solid transparent calc(31px / 2);
    border-bottom: solid transparent calc(31px / 2);
    margin-left: 8px;
  }

  &:hover {
    width: 82px;
    height: 82px;
    background-color: rgba(184,184,184,.6);
    &:after {
      transform: scale(1.2);
    }
  }
`;

export const List = styled.ul`
  padding: 0;
  list-style: none;
    align-items: center;

  li {
    display: flex;
    align-items: center;
    margin: 0;
    margin-bottom: 14px;

    span {
      font-size: 14px;
    }
  }
`;

export const Check = styled.span`
  width: 24px;
  height: 24px;
  border-radius: 24px;
  background-color: ${blue};
  margin-right: 8px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  svg {
    color: ${white}
  }
`;

export const CTAs = styled.div`
  display: flex;
  align-items: center;
  width :339px;
  margin-bottom: 8px;

  a {
    margin-left: 32px;
    font-weight: 700;
  }
`;
