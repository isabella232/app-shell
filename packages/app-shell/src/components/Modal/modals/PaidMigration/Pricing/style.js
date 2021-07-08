import styled from 'styled-components';
import { purpleLight, blue } from '@bufferapp/ui/style/colors';

export const Holder = styled.div`
  display: flex;
  flex-direction: row;
  width: 710px;
  height: 500px;

  h2 {
    max-width: 241px;
    margin-top: 22px;
    margin-bottom: 16px;
  }

  p {
    margin-top: 0px;
    margin-bottom: 0;
    max-width: 282px;
  }
`;

export const ButtonContainer = styled.div`
  width: fit-content;
  margin-top: 32px;
  margin-bottom: 32px;
`;

export const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 35px;

  svg {
    color: ${purpleLight};
    margin-right: 4px;
  }

  li {
    display: flex;

    p {
      margin-bottom: 16px;
    }
  }
`;

export const LeftColumn = styled.div`
  background: rgb(246, 249, 251);
  background: linear-gradient(
    90deg,
    rgba(246, 249, 251, 1) 95%,
    rgba(235, 237, 240, 1) 100%
  );
  flex: 1;
  width: 440px;
  padding: 50px;

  button {
    color: ${blue};
  }
`;

export const RightColumn = styled.div``;
