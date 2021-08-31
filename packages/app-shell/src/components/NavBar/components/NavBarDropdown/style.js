import styled from 'styled-components';
import {
  blueDarker,
  grayDark,
  grayDarker,
  grayLighter,
} from '@bufferapp/ui/style/colors';

import { fontFamily, fontWeightMedium } from '@bufferapp/ui/style/fonts';

export const NavBarDropdownStyled = styled.a`
  align-items: center;
  color: ${(props) => (props.active ? blueDarker : grayDark)};
  display: flex;
  font-size: 13px;
  font-family: ${fontFamily};
  font-weight: ${fontWeightMedium};
  height: 100%;
  padding: 0 24px;
  position: relative;
  text-decoration: none;
  z-index: 2;
  &:hover {
    color: ${grayDarker};
    background-color: ${grayLighter};
    font-weight: bold;
  }
  cursor: pointer;
`;

export const NavBarDropdownText = styled.span`
  margin-left: 8px;
`;
