import { grayLight, blue } from '@bufferapp/ui/style/colors';
import styled from 'styled-components';

const containerPaddingWidth = 15;
const containerPaddingHeight = 8;

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 64px;
  padding: ${containerPaddingHeight}px ${containerPaddingWidth}px;
  margin-bottom: 22px;
  align-items: center;
  height: calc(64px - ${containerPaddingHeight}px);
  width: calc(100% - ${containerPaddingWidth * 2}px);

  border: 1px solid ${grayLight};
  border-radius: 3px;

  button {
    padding: 2px;
    color: ${blue};
  }
`;
