import React from 'react';
import PropTypes from 'prop-types';

import { getProductPriceCycleText } from '../../../../../common/utils/product';

import {
  CurrentPlanInfoContainer,
  PlanName,
  ChannelsCount,
  UsersCount,
  CurrentPaymentContainer,
  Row,
} from './CurrentPlanInfo.style';

function CurrentPlanInfo(props) {
  const { planName, planPrice, planCycle, numberOfChannels, numberOfUsers } =
    props;

  return (
    <CurrentPlanInfoContainer>
      <PlanName>
        Your current plan: <span>{planName}</span>
      </PlanName>
      <Row>
        <ChannelsCount>{numberOfChannels} channels</ChannelsCount>
        <UsersCount>{numberOfUsers} user</UsersCount>
      </Row>
      <CurrentPaymentContainer>
        Currently paying:{' '}
        <span>{getProductPriceCycleText(planPrice, planCycle)}</span>
      </CurrentPaymentContainer>
    </CurrentPlanInfoContainer>
  );
}

CurrentPlanInfo.propTypes = {
  planName: PropTypes.string.isRequired,
  planPrice: PropTypes.number.isRequired,
  planCycle: PropTypes.string.isRequired,
  numberOfChannels: PropTypes.number.isRequired,
  numberOfUsers: PropTypes.number.isRequired,
};

export default CurrentPlanInfo;
