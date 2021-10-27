import styled from 'styled-components';

import { black, blue } from '@bufferapp/ui/style/colors';

import { StyledError } from '../PaymentMethod/style';

export const Holder = styled.div`
  display: flex;
  width: 800px;
  height: 376px;
  box-sizing: border-box;
  background-repeat: no-repeat;
  background-position: center right 15px;
  background-image: url('https://buffer-ui.s3.amazonaws.com/illustrations/success-celebration.jpg');
  background-size: 410px;
  padding: 24px;

  p,
  h1 {
    color: ${black};
  }

  h1 {
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

export const Content = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;

  p {
    margin-top: 0px;
    margin-bottom: 0px;
    max-width: 282px;
  }

  ol {
    list-style: none;
    padding: 0;
    margin-top: 24px;
    margin-bottom: 24px;

    li {
      margin-bottom: 8px;
      font-size: 14px;
      font-weight: 500;
      display: flex;
      align-items: center;

      svg {
        color: ${blue};
        margin-right: 6px;
      }
    }
  }

  ${StyledError} {
    margin-top: 6px;
    max-width: 100%;
  }
`;

export const Ctas = styled.div`
  display: flex;

  div[type='primary'] {
    margin-right: 8px;
  }
`;
