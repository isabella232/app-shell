import styled, { css } from 'styled-components';
import { grayLighter } from '@bufferapp/ui/style/colors';

const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

const flexRow = css`
  display: flex;
  flex-direction: row;
`;

export const Wrapper = styled.div`
  ${flexRow}
  flex: 1;
  overflow: auto;
`;

export const SidebarWrapper = styled.div`
  ${flexColumn}
  width: 248px;
`;
