import styled from 'styled-components';
import { grayDark } from '@bufferapp/ui/style/colors';
import { fontSizeSmall } from '@bufferapp/ui/style/fonts';

export const ChannelsContainer = styled.div`
  display: flex;
  flex-direction: column;

  font-size: ${fontSizeSmall};
`;

export const Title = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 160px;
  width: 100%;
  margin-bottom: 20px;
  justify-content: space-between;
`;

export const Icons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    width: 12px;
    height: 12px;
    margin-right: 6px;
    color: ${grayDark};

    &:last-of-type {
      margin-right: 0;
    }
  }
`;

export const ChannelsInputContainer = styled.div`
  width: 140px;
`;
