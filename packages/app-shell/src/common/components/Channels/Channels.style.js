import styled from 'styled-components';
import { grayLight } from '@bufferapp/ui/style/colors';
import { fontSizeSmall } from '@bufferapp/ui/style/fonts';

export const ChannelsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;

  font-size: ${fontSizeSmall};
  border-bottom: 1px ${grayLight} solid;
`;

export const Title = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 20px;

  span {
    margin-right: 15px;
  }
`;

export const Icons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    width: 12px;
    height: 12px;
    margin-right: 6px;

    &:last-of-type {
      margin-right: 0;
    }
  }
`;

export const ChannelsInputContainer = styled.div`
  width: 140px;
`;
