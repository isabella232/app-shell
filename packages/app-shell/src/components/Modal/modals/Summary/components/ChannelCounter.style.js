import { grayDark, blue, white } from '@bufferapp/ui/style/colors';
import styled from 'styled-components';

const buttonColor = '#E9ECFC';

export const ChannelsCounterContainer = styled.div`
  display: flex;
  width: 300px;
  height: 48px;
  background: ${blue};
`;

export const ChannelsCounterButton = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  background: ${buttonColor};
  color: ${grayDark};
  border: 1px ${blue} solid;
`;

export const ChannelsCounterCountDisplay = styled.div`
  display: flex;
  background: ${white};
  flex-grow: 1.5;
  justify-content: center;
  align-items: center;
  border-top: 1px ${blue} solid;
  border-bottom: 1px ${blue} solid;
`;
