import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import Text from '@bufferapp/ui/Text';
import Button from '@bufferapp/ui/Button';
import FlashIcon from '@bufferapp/ui/Icon/Icons/Flash';
import ArrowLeftIcon from '@bufferapp/ui/Icon/Icons/ArrowLeft';

import { MODALS } from '../../../../../common/hooks/useModal';
import { ModalContext } from '../../../../../common/context/Modal';
import { useUser, UserContext } from '../../../../../common/context/User';
import useMigrationPlanPreview from '../hooks/useMigrationPlanPreview';
import useMigrateToOB from '../hooks/useMigrateToOB';

import { useTrackPageViewed } from '../../../../../common/hooks/useSegmentTracking';
import { getActiveProductFromPath } from '../../../../../common/utils/getProduct';

import {
  Holder,
  FeaturesList,
  LeftColumn,
  RightColumn,
  TotalPrice,
  Detail,
  DetailList,
  Bottom,
  Body,
  SummaryContainer,
  Separator,
  SummaryNote,
  SummaryDetails,
  PriceFooterWrapper,
  ButtonContainer,
} from './style';

const PeriodEndString = ({ migrationPreview }) => {
  const currentUser = useContext(UserContext);
  const { data } = useContext(ModalContext);
  const { cta, ctaButton } = data || {};

  useEffect(() => {
    const product = getActiveProductFromPath();

    useTrackPageViewed({
      payload: {
        name: 'Migrate to OB Modal',
        title: 'OB Pricing',
        product,
        cta,
        ctaButton,
      },
      user: currentUser,
    });
  }, []);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  if (migrationPreview?.currentPlan?.periodEnd) {
    const date = new Date(migrationPreview.currentPlan.periodEnd);
    return (
      <>
        on{' '}
        <b>
          {months[date.getMonth()]} {date.getDate()}, {date.getFullYear()}
        </b>
      </>
    );
  }

  return null;
};

export const Content = ({
  migrationPreview,
  handleMigrate,
  handleDismiss,
  processing,
}) => (
  <Holder>
    <LeftColumn>
      <Text type="h2">Why supercharge your plan to Essentials?</Text>

      <Text type="p">
        By upgrading your plan today you are gaining so many features.
      </Text>

      <FeaturesList>
        <li>
          <FlashIcon size="large" />
          <Text type="p">Comprehensive analytics</Text>
        </li>
        <li>
          <FlashIcon size="large" />
          <Text type="p">Intelligent answers and suggestions</Text>
        </li>
        <li>
          <FlashIcon size="large" />
          <Text type="p">Advanced Instagram features</Text>
        </li>
        <li>
          <FlashIcon size="large" />
          <Text type="p">The entirety of the Buffer platform</Text>
        </li>
      </FeaturesList>

      <ButtonContainer>
        <Button
          type="text"
          disabled={processing}
          onClick={handleDismiss}
          label="Go back"
          icon={<ArrowLeftIcon />}
        />
      </ButtonContainer>
    </LeftColumn>

    <RightColumn>
      <SummaryContainer>
        <Body>
          <Text type="h2">Your upgrade</Text>
          <SummaryDetails>
            <>
              <DetailList>
                {migrationPreview.migrationSummary.details.map((detail) => (
                  <Detail key={detail}>
                    <Text type="p">{detail}</Text>
                  </Detail>
                ))}
              </DetailList>
              <Separator />
              <SummaryNote>
                <Text type="p">
                  Payment made today is pro rata of new plan price until the
                  next billing cycle begins{' '}
                  <PeriodEndString migrationPreview={migrationPreview} />
                </Text>
              </SummaryNote>
            </>
          </SummaryDetails>

          <Bottom>
            <TotalPrice>
              <sup>$</sup>
              <Text type="h2" as="p">
                {migrationPreview.currentPlan.interval === 'month'
                  ? migrationPreview.migrationSummary.totalPrice
                  : `${migrationPreview.migrationSummary.totalPrice}/yearly`}
              </Text>
            </TotalPrice>
            <PriceFooterWrapper>
              {migrationPreview.currentPlan.interval === 'month' && (
                <Text type="p" color="grayDark">
                  Billed monthly in USD
                </Text>
              )}

              <Text type="p" color="grayDark">
                Includes {migrationPreview.migrationSummary.channelCount} social
                channels
              </Text>
            </PriceFooterWrapper>
            <Button
              fullWidth
              disabled={processing}
              type="primary"
              onClick={handleMigrate}
              label="Supercharge My Plan"
            />
          </Bottom>
        </Body>
      </SummaryContainer>
    </RightColumn>
  </Holder>
);

const EssentialsPricing = ({ openModal }) => {
  const user = useUser();
  const { data: migrationPreview, loading } = useMigrationPlanPreview(user);
  const { migrateToOB, success, processing } = useMigrateToOB(user);

  if (loading) {
    return null;
  }

  if (success && !processing) {
    openModal(MODALS.upgradeSuccess, {
      cta: 'Migrate to OB Modal',
      ctaButton: 'Supercharge My Plan',
    });

    return null;
  }

  return (
    <Content
      migrationPreview={migrationPreview}
      handleDismiss={() => {
        openModal(MODALS.essentialsPlan, {
          cta: 'planSelection',
          ctaButton: 'Go back to plans',
        });
      }}
      handleMigrate={() => {
        migrateToOB(user);
      }}
      processing={processing}
    />
  );
};

export default function () {
  return (
    <ModalContext.Consumer>
      {({ openModal }) => <EssentialsPricing openModal={openModal} />}
    </ModalContext.Consumer>
  );
}

PeriodEndString.propTypes = {
  migrationPreview: PropTypes.objectOf(PropTypes.object).isRequired,
};

Content.propTypes = {
  migrationPreview: PropTypes.objectOf(PropTypes.object).isRequired,
  handleMigrate: PropTypes.func,
  handleDismiss: PropTypes.func,
  processing: PropTypes.func,
};

EssentialsPricing.propTypes = {
  openModal: PropTypes.func.isRequired,
};
