import styled from 'styled-components';

import {
  black,
  blue,
  grayDark,
  grayDarker,
  purple,
  purpleLight,
} from '@bufferapp/ui/style/colors';

export const Holder = styled.div`
  width: 900px;
  height: 540px;
  box-sizing: border-box;
  padding-top: 24px;
  overflow-y: scroll;
`;

export const Hero = styled.div`
  width: 100%;
  text-align: center;
  background-image: url('https://buffer-ui.s3.amazonaws.com/shapes/wavy-gradient-bg.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position-y: bottom;

  img {
    margin: 0 auto 20px;
    display: block;
  }

  h1 {
    margin-top: 69px;
    margin-bottom: 20px;
  }

  p {
    color: ${grayDark};
    max-width: 460px;
    margin: 0 auto;
  }
`;

export const IconWrapper = styled.div`
  text-align: center;
  margin-top: 69px;

  svg {
    width: 32px;
    height: 32px;
    color: ${purpleLight};
  }
`;

export const Feature = styled.div`
  text-align: center;
  background-color: ${(props) => props.backgroundColor || '#f6f9fb'};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;

  h2 {
    margin-top: 25px;
    margin-bottom: 0;
  }

  p {
    max-width: 430px;
    margin-top: 25px;
  }
`;

export const Label = styled.div`
  border: 2px solid ${(props) => props.color};
  padding: 5px 12px;
  border-radius: 3px;
  width: fit-content;
  margin: 0 auto;

  svg {
    color: ${(props) => props.color};
    margin-right: 7px;
  }

  p {
    display: inline;
    text-transform: uppercase;
    color: ${(props) => props.color};
    letter-spacing: 1.5px;
    font-weight: 600;
    font-size: 12px;
  }
`;
