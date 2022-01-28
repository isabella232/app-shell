import styled from 'styled-components';
import { grayLighter } from '@bufferapp/ui/style/colors';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 426px;
  height: 408px;
  background: ${grayLighter};
  justify-content: center;
  align-items: center;

  h3 {
    width: 314px;
    text-align: center;
    margin-top: 0px;
  }

  img {
    margin-bottom: 16px;
  }
`;

export const Icons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 32px;

  svg {
    width: 24px;
    height: 24px;
  }
`;
