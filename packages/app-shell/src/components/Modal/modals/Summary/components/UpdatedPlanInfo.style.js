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
  box-sizing: border-box;
  padding: 20px;
  width: 220px;

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
  padding: 20px 0;
  border-bottom: 1px ${grayLight} solid;
  flex-direction: column;
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

export const ChannelsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;

  font-size: ${fontSizeSmall};
  border-bottom: 1px ${grayLight} solid;
`;

export const ChannelsInputContainer = styled.div`
  width: 140px;
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
  padding: 20px 0;

  border-bottom: 1px ${grayLight} solid;

  span {
    padding: 0 5px;
    font-weight: bold;
    color: ${grayDarker};
  }
`;

export const CancellationInfo = styled.div`
  padding-top: 20px;
  font-size: ${fontSizeSmall};
`;
