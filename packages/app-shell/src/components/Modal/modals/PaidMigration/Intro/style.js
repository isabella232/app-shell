import styled, { keyframes } from 'styled-components';
import { purpleLight } from '@bufferapp/ui/style/colors';

export const Holder = styled.div`
  display: flex;
  flex-direction: column;
  width: 432px;
  height: 336px;
  background-color: #f8fafc;
  position: relative;
  padding: 25px;

  h3 {
    max-width: 183px;
    margin-top: 22px;
    margin-bottom: 16px;
    text-align: center;
    align-self: center;
  }
`;

export const IconWrapper = styled.div`
  text-align: center;

  svg {
    width: 32px;
    height: 32px;
    color: ${purpleLight};
  }
`;

export const ButtonContainer = styled.div`
  position: absolute;
  bottom: 25px;
  animation: ${SlideUp} 2s linear infinite;
`;

const SlideUp = keyframes`
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-20px);
  }
`;
