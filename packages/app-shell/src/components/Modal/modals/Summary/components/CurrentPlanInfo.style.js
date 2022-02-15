import {
  grayLight,
  white,
  grayDark,
  grayDarker,
} from '@bufferapp/ui/style/colors';
import styled from 'styled-components';
import { fontSizeSmall, fontWeightMedium } from '@bufferapp/ui/style/fonts';

export const CurrentPlanInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin-bottom: 10px;
  padding: 20px;
  width: 220px;

  color: ${grayDark};
  background-color: ${white};
  font-size: ${fontSizeSmall};
  font-weight: ${fontWeightMedium};

  border: 1px ${grayLight} solid;
  border-radius: 5px;
`;

export const Row = styled.div`
  display: flex;
`;

export const PlanName = styled.div`
  display: flex;
  padding-bottom: 14px;

  span {
    padding: 0 5px;
    font-weight: bold;
    color: ${grayDarker};
  }
`;

export const ChannelsCount = styled.div`
  display: flex;
  margin-right: 25px;
  font-size: ${fontSizeSmall};
`;

export const UsersCount = styled.div`
  display: flex;
  font-size: ${fontSizeSmall};
`;

export const CurrentPaymentContainer = styled.div`
  display: flex;
  margin-top: 18px;
  padding-top: 18px;

  border-top: 1px ${grayLight} solid;

  span {
    padding: 0 5px;
    font-weight: bold;
    color: ${grayDarker};
  }
`;
