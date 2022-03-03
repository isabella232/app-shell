import React from 'react';
import PropTypes from 'prop-types';

import Channels from '../../../../../common/components/Channels/Channels';
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

function UpdatedPlanInfo(props) {
  const {
    planName,
    planCycle,
    numberOfUsers,
    channelsCount,
    increaseCounter,
    decreaseCounter,
    newPrice,
  } = props;

  return (
    <UpdatedPlanInfoContainer>
      <Channels
        channelsCount={channelsCount}
        onIncreaseCounter={() => increaseCounter()}
        onDecreaseCounter={() => decreaseCounter()}
      />
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
        New monthly cost:{' '}
        <span>{getProductPriceCycleText(newPrice, planCycle)}</span>
      </CurrentPaymentContainer>
      <CancellationInfo>
        This will be billed every month until canceled.
      </CancellationInfo>
    </UpdatedPlanInfoContainer>
  );
}

UpdatedPlanInfo.propTypes = {
  planName: PropTypes.string.isRequired,
  planCycle: PropTypes.string.isRequired,
  numberOfUsers: PropTypes.string.isRequired,
  channelsCount: PropTypes.number.isRequired,
  increaseCounter: PropTypes.func.isRequired,
  decreaseCounter: PropTypes.func.isRequired,
};

export default UpdatedPlanInfo;
