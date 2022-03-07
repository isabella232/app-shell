import styled from 'styled-components';
import { fontSizeSmall } from '@bufferapp/ui/style/fonts';
import {
  grayLighter,
  grayLight,
  white,
  blue,
} from '@bufferapp/ui/style/colors';

export const Container = styled.div`
  align-items: center;
  border-radius: 8px;
  box-sizing: border-box;
  width: 512px;
`;

export const LoadingContainer = styled(Container)`
  width: 700px;
  justify-content: center;
`;
