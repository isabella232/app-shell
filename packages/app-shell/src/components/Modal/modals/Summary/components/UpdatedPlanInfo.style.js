import {
  grayLight,
  white,
  grayDark,
  grayDarker,
} from '@bufferapp/ui/style/colors';
import styled from 'styled-components';
import { fontSizeSmall, fontWeightMedium } from '@bufferapp/ui/style/fonts';

export const UpdatedPlanInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 2;

  box-sizing: border-box;
  margin-bottom: 10px;
  padding: 20px;
  width: 235px;

  color: ${grayDark};
  background-color: ${white};
  font-size: 14px;
  font-weight: ${fontWeightMedium};

  border: 1px ${grayLight} solid;
  border-radius: 5px;
`;

export const Row = styled.div`
  display: flex;
`;

export const Section = styled.div`
  display: flex;
  padding: 15px 0;
  border-bottom: 1px ${grayLight} solid;
  flex-direction: column;
`;

export const PlanName = styled.div`
  padding-bottom: 14px;

  font-weight: bold;
  color: ${grayDarker};
`;

export const ChannelsCount = styled.div`
  display: flex;
  margin-right: 25px;
  font-size: ${fontSizeSmall};

  span {
    padding-right: 5px;
    font-weight: bold;
    color: ${grayDarker};
  }
`;

export const UsersCount = styled.div`
  display: flex;
  font-size: ${fontSizeSmall};

  span {
    padding-right: 5px;
    font-weight: bold;
    color: ${grayDarker};
  }
`;

export const CurrentPaymentContainer = styled.div`
  display: flex;
  padding: 15px 0;

  border-bottom: 1px ${grayLight} solid;

  span {
    padding: 0 5px;
    font-weight: bold;
    color: ${grayDarker};
  }
`;

export const CancellationInfo = styled.div`
  padding-top: 15px;
  font-size: ${fontSizeSmall};
`;
