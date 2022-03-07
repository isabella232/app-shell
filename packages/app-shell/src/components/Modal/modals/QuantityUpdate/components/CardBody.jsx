import { MODALS } from '../../../../../common/hooks/useModal';

import { Text, Button } from '@bufferapp/ui';
import InstagramIcon from '@bufferapp/ui/Icon/Icons/Instagram';
import FacebookIcon from '@bufferapp/ui/Icon/Icons/Facebook';
import LinkedInIcon from '@bufferapp/ui/Icon/Icons/LinkedIn';
import PinterestIcon from '@bufferapp/ui/Icon/Icons/Pinterest';
import ShopifyIcon from '@bufferapp/ui/Icon/Icons/Shopify';
import TwitterIcon from '@bufferapp/ui/Icon/Icons/Twitter';

import ChannelCounter from '../../../../../common/components/Counter/Counter';

import {
  Header,
  SectionContainer,
  Section,
  Icons,
  Title,
  ButtonWrapper,
  InnerContainer,
} from './style';

const CardBody = ({ planName, quantity }) => {
  return (
    <>
      <Header>
        <Text type="h2">Add or Remove Channels from Plan</Text>
        <Text type="p">
          You&apos;re currently on the <strong>{planName}</strong> plan and
          you&apos;re paying <strong>$40/mo</strong> for {quantity} channel
          {quantity !== 1 ? 's' : ''}.{' '}
          <a
            href="#"
            onClick={(e, data) => {
              e.preventDefault();
              openModal(MODALS.planSelector, data);
            }}
          >
            Change Plan
          </a>
        </Text>
      </Header>
      <SectionContainer>
        <Section>
          <InnerContainer>
            <div>
              <Title>
                <span>Channels</span>
                <Icons>
                  <InstagramIcon size="medium" />
                  <FacebookIcon size="medium" />
                  <TwitterIcon size="medium" />
                  <PinterestIcon size="medium" />
                  <LinkedInIcon size="medium" />
                  <ShopifyIcon size="medium" />
                </Icons>
              </Title>
              <ChannelCounter
                channelsCount={0}
                onDecreaseCounter={() => null}
                onIncreaseCounter={() => null}
              />
            </div>

            <div>
              <p>channel</p>
            </div>
          </InnerContainer>
        </Section>
      </SectionContainer>
      <ButtonWrapper>
        <Button type="text" onClick={() => openModal(null)} label="Cancel" />
        <Button
          type="primary"
          onClick={(data) => {
            openModal(MODALS.paymentMethod, data);
          }}
          label="Confirm and Pay"
        />
      </ButtonWrapper>
    </>
  );
};

export default CardBody;
