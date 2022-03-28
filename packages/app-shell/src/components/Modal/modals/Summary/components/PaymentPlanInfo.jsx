import React from 'react';
import PropTypes from 'prop-types';

import { getProductPriceCycleText } from '../../../../../common/utils/product';

import {
  UpdatedPlanInfoContainer,
  PlanName,
  ChannelsCount,
  UsersCount,
  CurrentPaymentContainer,
  Row,
  Section,
  CancellationInfo,
} from './UpdatedPlanInfo.style';

function PaymentPlanInfo(props) {
  const { planName, planCycle, numberOfUsers, channelsCount, newPrice } = props;

  return (
    <UpdatedPlanInfoContainer>
      <Section>
        Your updated plan:
        <PlanName>{planName}</PlanName>
        <Row>
          <ChannelsCount>
            <span>{channelsCount}</span>
            channels
          </ChannelsCount>
          <UsersCount>
            <span>{numberOfUsers}</span>
          </UsersCount>
        </Row>
      </Section>
      <CurrentPaymentContainer>
        New cost: <span>{getProductPriceCycleText(newPrice, planCycle)}</span>
      </CurrentPaymentContainer>
      <CancellationInfo>
        This will be billed every {planCycle} until canceled.
      </CancellationInfo>
    </UpdatedPlanInfoContainer>
  );
}

PaymentPlanInfo.propTypes = {
  planName: PropTypes.string.isRequired,
  planCycle: PropTypes.string.isRequired,
  numberOfUsers: PropTypes.string.isRequired,
  channelsCount: PropTypes.number.isRequired,
  newPrice: PropTypes.number.isRequired,
};

export default PaymentPlanInfo;
