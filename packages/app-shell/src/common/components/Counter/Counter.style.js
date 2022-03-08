import { grayDark, blue, white } from '@bufferapp/ui/style/colors';
import styled from 'styled-components';

const buttonColor = '#E9ECFC';

export const ChannelsCounterContainer = styled.div`
  display: flex;
  height: 48px;

  border: 1px ${blue} solid;
  border-radius: 3px;
`;

export const ChannelsCounterButton = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;

  background: ${buttonColor};
  color: ${grayDark};
  border-radius: 3px;

  cursor: pointer;
`;

export const ChannelsCounterCountDisplay = styled.div`
  display: flex;
  background: ${white};
  flex-grow: 1.5;
  justify-content: center;
  align-items: center;
  border-left: 1px ${blue} solid;
  border-right: 1px ${blue} solid;
`;
