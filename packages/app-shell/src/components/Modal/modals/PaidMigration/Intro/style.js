import styled, { keyframes } from 'styled-components';
import { purpleLight } from '@bufferapp/ui/style/colors';

const SlideUp = keyframes`
  from {
    transform: translateY(0);
    opacity: 0;
  }

  to {
    transform: translateY(-20px);
    opacity: 1;
  }
`;

export const Holder = styled.div`
  display: flex;
  flex-direction: column;
  width: 432px;
  height: 336px;
  background-color: #f8fafc;
  position: relative;
  padding: 25px;

  h3 {
    opacity: 0;
    max-width: 183px;
    margin-top: 22px;
    margin-bottom: 16px;
    text-align: center;
    align-self: center;
    animation: 0.5s ${SlideUp} ease-in 1s 1 forwards;
  }
`;

export const BackgroundLayerBottom = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 20px;
  left: 0;
  background-image: url('https://buffer-ui.s3.amazonaws.com/screenshots/hook-layer-bottom.png');
  background-repeat: no-repeat;
  background-size: cover;
  animation: 0.5s ${SlideUp} ease-in 1 forwards;
`;

export const BackgroundLayerTop = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url('https://buffer-ui.s3.amazonaws.com/screenshots/hook-layer-top.png');
  background-repeat: no-repeat;
  background-size: cover;
  animation: 0.5s ${SlideUp} ease-in 0.5s 1 forwards;
`;

export const IconWrapper = styled.div`
  text-align: center;
  opacity: 0;
  animation: 0.5s ${SlideUp} ease-in 1s 1 forwards;

  svg {
    width: 32px;
    height: 32px;
    color: ${purpleLight};
  }
`;

export const ButtonContainer = styled.div`
  opacity: 0;
  position: absolute;
  bottom: 25px;
  animation: 0.1s ${SlideUp} ease-in 1.5s 1 forwards;
`;
