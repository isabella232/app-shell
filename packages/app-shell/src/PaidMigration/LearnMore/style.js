import styled from 'styled-components';

import { black, blue, grayDark } from '@bufferapp/ui/style/colors';

export const Holder = styled.div`
  display: flex;
  width: 900px;
  height: 540px;
  box-sizing: border-box;
  padding: 24px;
  border: 1px solid red; 

  h1 {
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  p {
    text-align: center;
  }

`;

export const Intro = styled.div`
  max-width: 460px;

  img {
    margin: 0 auto;
    display: block;
  }
`;