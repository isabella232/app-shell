import React from 'react';
import PropTypes from 'prop-types';

import InstagramIcon from '@bufferapp/ui/Icon/Icons/Instagram';
import FacebookIcon from '@bufferapp/ui/Icon/Icons/Facebook';
import LinkedInIcon from '@bufferapp/ui/Icon/Icons/LinkedIn';
import PinterestIcon from '@bufferapp/ui/Icon/Icons/Pinterest';
import ShopifyIcon from '@bufferapp/ui/Icon/Icons/Shopify';
import TwitterIcon from '@bufferapp/ui/Icon/Icons/Twitter';

import ChannelCounter from './ChannelCounter';
import { getProductPriceCycleText } from '../../../../../common/utils/product';

import {
  UpdatedPlanInfoContainer,
  PlanName,
  ChannelsCount,
  UsersCount,
  CurrentPaymentContainer,
  Row,
  ChannelsContainer,
  Icons,
  Title,
  ChannelsInputContainer,
  Section,
  CancellationInfo,
} from './UpdatedPlanInfo.style';

function UpdatedPlanInfo(props) {
  const { planName, planPrice, planCycle, numberOfChannels, numberOfUsers } =
    props;

  return (
    <UpdatedPlanInfoContainer>
      <ChannelsContainer>
        <Title>
          <span>Channels:</span>
          <Icons>
            <InstagramIcon size="medium" />
            <FacebookIcon size="medium" />
            <TwitterIcon size="medium" />
            <PinterestIcon size="medium" />
            <LinkedInIcon size="medium" />
            <ShopifyIcon size="medium" />
          </Icons>
        </Title>
        <ChannelsInputContainer>
          <ChannelCounter />
        </ChannelsInputContainer>
      </ChannelsContainer>
      <Section>
        Your updated plan:
        <PlanName>{planName}</PlanName>
        <Row>
          <ChannelsCount>
            <span>{numberOfChannels}</span>
            channels
          </ChannelsCount>
          <UsersCount>
            <span>{numberOfUsers}</span>
            user
          </UsersCount>
        </Row>
      </Section>
      <CurrentPaymentContainer>
        New monthly cost:{' '}
        <span>{getProductPriceCycleText(planPrice, planCycle)}</span>
      </CurrentPaymentContainer>
      <CancellationInfo>
        This will be billed every month until canceled.
      </CancellationInfo>
    </UpdatedPlanInfoContainer>
  );
}

UpdatedPlanInfo.propTypes = {
  planName: PropTypes.string.isRequired,
  planPrice: PropTypes.number.isRequired,
  planCycle: PropTypes.string.isRequired,
  numberOfChannels: PropTypes.number.isRequired,
  numberOfUsers: PropTypes.number.isRequired,
};

export default UpdatedPlanInfo;
