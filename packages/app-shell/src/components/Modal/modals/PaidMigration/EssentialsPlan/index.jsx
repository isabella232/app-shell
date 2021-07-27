import React from 'react';

import Text from '@bufferapp/ui/Text';
import Button from '@bufferapp/ui/Button';
import FlashIcon from '@bufferapp/ui/Icon/Icons/Flash';
import CheckmarkIcon from '@bufferapp/ui/Icon/Icons/Checkmark';
import { purple, white } from '@bufferapp/ui/style/colors';

import { useUser } from '../../../../../common/context/User';
import useMigrationPlanPreview from '../hooks/useMigrationPlanPreview';
import { ModalContext } from '../../../../../common/context/Modal';
import { MODALS } from '../../../../../common/hooks/useModal';

import {
  Holder,
  Hero,
  IconWrapper,
  Feature,
  Label,
  InstagramPosting,
  BufferSuite,
  OneBuffer,
  FreePlanBorder,
  EssentialsPlanBorder,
  FeaturesTable,
  TableContainer,
  FeatureIcon,
  DashIcon,
  PlanLabel,
  PlanName,
  BottomSection,
  ButtonWrapper,
  IntroducingEssentials,
  SectionIntro,
  SectionOneBuffer,
  SectionAnalytics,
} from './style';

export const EssentialsPlan = ({ features }) => {
  const checkIfTrue = (plan) => {
    switch (plan) {
      case true:
        return <CheckmarkIcon size="large" />;
      default:
        return <DashIcon />;
    }
  };

  return (
    <ModalContext.Consumer>
      {({ openModal }) => (
        <Holder>
          <Hero>
            <img
              src="https://buffer-ui.s3.amazonaws.com/avatars/avatar-joel.jpg"
              width="117"
              height="117"
            />
            <Text type="p">
              Hey, it’s Joel the CEO here. I wanted to say that we’re embarking
              on a new future here at Buffer that involves what we believe to be
              better plans, better pricing that works for you and your online
              business.
            </Text>

            <IconWrapper>
              <FlashIcon size="large" />
            </IconWrapper>

            <Text type="h1">Introducing the Essentials plan</Text>
          </Hero>

          <SectionIntro>
            <IntroducingEssentials></IntroducingEssentials>
            <Feature>
              <Label color={purple}>
                <FlashIcon size="medium" verticalAlign="middle" />
                <Text type="p">Included with Essentials</Text>
              </Label>

              <Text type="h2">Take your posting power to the next level</Text>
              <Text type="p">
                With advanced Instagram features like our Hashtag Manager, Shop
                Grid and Instagram Stories scheduling you can take things
                further
              </Text>
            </Feature>

            <InstagramPosting></InstagramPosting>
          </SectionIntro>

          <SectionOneBuffer>
            <Feature>
              <Label color={white}>
                <FlashIcon size="medium" verticalAlign="middle" />
                <Text type="p">Included with Essentials</Text>
              </Label>

              <Text type="h2" color="white">
                Giving you the best of what we offer
              </Text>
              <Text type="p" color="white">
                You get the full package with our comprehensive publishing,
                analytics and engagement tools to power your business
              </Text>
            </Feature>
            <BufferSuite></BufferSuite>
          </SectionOneBuffer>

          <SectionAnalytics>
            <Feature>
              <Label color={white}>
                <FlashIcon size="medium" verticalAlign="middle" />
                <Text type="p">Included with Essentials</Text>
              </Label>

              <Text type="h2" color="white">
                Know where to take your business next
              </Text>
              <Text type="p" color="white">
                Go deeper with comprehensive cross-network analytics that will
                let you see the bigger picture and help you shape where to go
                next
              </Text>
            </Feature>

            <OneBuffer></OneBuffer>
          </SectionAnalytics>

          <BottomSection>
            <TableContainer>
              <Text type="h2">There is so much to gain</Text>
              <Text type="p">
                Supercharging your plan with so much more than what you have
                today
              </Text>

              <FreePlanBorder></FreePlanBorder>
              <EssentialsPlanBorder></EssentialsPlanBorder>

              <FeaturesTable>
                <thead>
                  <tr>
                    <th></th>
                    <th scope="col">
                      <PlanLabel>
                        <Text type="p">Current Plan</Text>
                      </PlanLabel>
                      <PlanName>
                        <Text type="p">Publish Pro</Text>
                      </PlanName>
                    </th>
                    <th scope="col">
                      <PlanLabel highlight>
                        <FlashIcon size="medium" verticalAlign="middle" />
                        <Text type="p">New Plan</Text>
                      </PlanLabel>
                      <PlanName>
                        <Text type="p">Essentials</Text>
                      </PlanName>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {features.map((feature, index) => (
                    <tr key={`row-${index}`}>
                      <td>
                        <Text type="p">
                          <b>{feature.title}</b>
                        </Text>
                        <Text type="p">{feature.tagline}</Text>
                      </td>
                      <td>
                        <FeatureIcon>
                          {checkIfTrue(feature.currentPlan)}
                        </FeatureIcon>
                      </td>
                      <td>
                        <FeatureIcon type="p">
                          {checkIfTrue(feature.suggestedPlan)}
                        </FeatureIcon>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </FeaturesTable>
            </TableContainer>

            <ButtonWrapper>
              <Button
                type="primary"
                size="large"
                label="I’m Super Interested!"
                onClick={() => {
                  openModal(MODALS.essentialsPricing, {
                    cta: 'Migrate to OB Modal',
                    ctaButton: 'I’m Super Interested!',
                  });
                }}
              />
            </ButtonWrapper>
          </BottomSection>
        </Holder>
      )}
    </ModalContext.Consumer>
  );
};

export default function() {
  const user = useUser();
  const { data:migrationPreview } = useMigrationPlanPreview(user)
  const planFeatures = migrationPreview?.planFeatures || [];
  const features = planFeatures.map(feature => ({
    ...feature,
    currentPlan: migrationPreview.currentPlan.supportedFeatures.includes(feature.id),
    suggestedPlan: migrationPreview.suggestedPlan.supportedFeatures.includes(feature.id),
  }))
  return (<EssentialsPlan features={features} />);
};
