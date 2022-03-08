import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import Text from '@bufferapp/ui/Text';
import Button from '@bufferapp/ui/Button';
import FlashIcon from '@bufferapp/ui/Icon/Icons/Flash';
import CheckmarkIcon from '@bufferapp/ui/Icon/Icons/Checkmark';
import { purple, white } from '@bufferapp/ui/style/colors';

import { useUser, UserContext } from 'context/User';
import useMigrationPlanPreview from '../hooks/useMigrationPlanPreview';
import { ModalContext } from 'context/Modal';
import { MODALS } from 'hooks/useModal';
import { useTrackPageViewed } from 'hooks/useSegmentTracking';
import { getActiveProductFromPath } from 'utils/getProduct';

import * as styles from './style';

export const EssentialsPlan = ({ features }) => {
  const currentUser = useContext(UserContext);
  const { data } = useContext(ModalContext);
  const { cta, ctaButton } = data || {};

  useEffect(() => {
    const product = getActiveProductFromPath();

    useTrackPageViewed({
      payload: {
        name: 'Migrate to OB Modal',
        title: 'Value',
        product,
        cta,
        ctaButton,
      },
      user: currentUser,
    });
  }, []);

  const checkIfTrue = (plan) => {
    switch (plan) {
      case true:
        return <CheckmarkIcon size="large" />;
      default:
        return <styles.DashIcon />;
    }
  };

  return (
    <ModalContext.Consumer>
      {({ openModal }) => (
        <styles.Holder>
          <styles.Hero>
            <img
              src="https://buffer-ui.s3.amazonaws.com/avatars/avatar-joel.jpg"
              width="117"
              height="117"
              alt="Joel Gascoigne avatar"
            />
            <Text type="p">
              Hey, it’s Joel the CEO here. We’re embarking on a new future here
              at Buffer that involves what we believe to be better plans and
              better pricing that works for you and your business.
            </Text>

            <styles.IconWrapper>
              <FlashIcon size="large" />
            </styles.IconWrapper>

            <Text type="h1">Introducing the Essentials plan</Text>
          </styles.Hero>

          <styles.SectionIntro>
            <styles.IntroducingEssentials />
            <styles.Feature>
              <styles.Label color={purple}>
                <FlashIcon size="medium" verticalAlign="middle" />
                <Text type="p">Included with Essentials</Text>
              </styles.Label>

              <Text type="h2">Take your posting power to the next level</Text>
              <Text type="p">
                Save hashtags, schedule Stories, and queue up as many posts as
                you’d like.
              </Text>
            </styles.Feature>

            <styles.InstagramPosting />
          </styles.SectionIntro>

          <styles.SectionOneBuffer>
            <styles.Feature>
              <styles.Label color={white}>
                <FlashIcon size="medium" verticalAlign="middle" />
                <Text type="p">Included with Essentials</Text>
              </styles.Label>

              <Text type="h2" color="white">
                Giving you the best of what we offer
              </Text>
              <Text type="p" color="white">
                You get the full package with our comprehensive publishing,
                analytics and engagement tools to power your business.
              </Text>
            </styles.Feature>
            <styles.BufferSuite />
          </styles.SectionOneBuffer>

          <styles.SectionAnalytics>
            <styles.Feature>
              <styles.Label color={white}>
                <FlashIcon size="medium" verticalAlign="middle" />
                <Text type="p">Included with Essentials</Text>
              </styles.Label>

              <Text type="h2" color="white">
                Know where to take your business next
              </Text>
              <Text type="p" color="white">
                Go deeper with comprehensive cross-network analytics that show
                you the bigger picture and help you shape your marketing
                strategy.
              </Text>
            </styles.Feature>

            <styles.OneBuffer />
          </styles.SectionAnalytics>

          <styles.BottomSection>
            <styles.TableContainer>
              <Text type="h2">There is so much to gain</Text>
              <Text type="p">
                Switch to Essentials to supercharge your social media strategy.
              </Text>

              <styles.FreePlanBorder />
              <styles.EssentialsPlanBorder />

              <styles.FeaturesTable>
                <thead>
                  <tr>
                    <th aria-label="Plans features" />
                    <th scope="col">
                      <styles.PlanLabel>
                        <Text type="p">Current Plan</Text>
                      </styles.PlanLabel>
                      <styles.PlanName>
                        <Text type="p">Publish Pro</Text>
                      </styles.PlanName>
                    </th>
                    <th scope="col">
                      <styles.PlanLabel highlight>
                        <FlashIcon size="medium" verticalAlign="middle" />
                        <Text type="p">New Plan</Text>
                      </styles.PlanLabel>
                      <styles.PlanName>
                        <Text type="p">Essentials</Text>
                      </styles.PlanName>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {features.map((feature) => (
                    <tr key={`row-${feature.title}`}>
                      <td>
                        <Text type="p">
                          <b>{feature.title}</b>
                        </Text>
                        <Text type="p">{feature.tagline}</Text>
                      </td>
                      <td>
                        <styles.FeatureIcon>
                          {checkIfTrue(feature.currentPlan)}
                        </styles.FeatureIcon>
                      </td>
                      <td>
                        <styles.FeatureIcon type="p">
                          {checkIfTrue(feature.suggestedPlan)}
                        </styles.FeatureIcon>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </styles.FeaturesTable>
            </styles.TableContainer>

            <styles.ButtonWrapper>
              <Button
                type="primary"
                size="large"
                label="Calculate New Price"
                onClick={() => {
                  openModal(MODALS.essentialsPricing, {
                    cta: 'Migrate to OB Modal',
                    ctaButton: 'Calculate New Price',
                  });
                }}
              />
            </styles.ButtonWrapper>
          </styles.BottomSection>
        </styles.Holder>
      )}
    </ModalContext.Consumer>
  );
};

export default function () {
  const user = useUser();
  const { data: migrationPreview } = useMigrationPlanPreview(user);
  const planFeatures = migrationPreview?.planFeatures || [];
  const features = planFeatures.map((feature) => ({
    ...feature,
    currentPlan: migrationPreview.currentPlan.supportedFeatures.includes(
      feature.id
    ),
    suggestedPlan: migrationPreview.suggestedPlan.supportedFeatures.includes(
      feature.id
    ),
  }));
  return <EssentialsPlan features={features} />;
}

EssentialsPlan.propTypes = {
  features: PropTypes.objectOf(PropTypes.object).isRequired,
};
