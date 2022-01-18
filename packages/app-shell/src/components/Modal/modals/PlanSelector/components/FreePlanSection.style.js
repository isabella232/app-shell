import { grayLight, blue } from '@bufferapp/ui/style/colors';
import styled from 'styled-components';

const containerPadding = 15;

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 64px;
  padding: ${containerPadding}px;
  margin-bottom: 16px;
  align-items: center;
  height: calc(64px - ${containerPadding}px);
  width: calc(100% - ${containerPadding * 2}px);

  border: 1px solid ${grayLight};
  border-radius: 3px;

  button {
    padding: 2px;
    color: ${blue};
  }
`;
