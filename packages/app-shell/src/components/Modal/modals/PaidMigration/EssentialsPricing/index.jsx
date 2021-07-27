import React from 'react';

import Text from '@bufferapp/ui/Text';
import Button from '@bufferapp/ui/Button';
import FlashIcon from '@bufferapp/ui/Icon/Icons/Flash';
import ArrowLeftIcon from '@bufferapp/ui/Icon/Icons/ArrowLeft';

import { MODALS } from '../../../../../common/hooks/useModal';
import { ModalContext } from '../../../../../common/context/Modal';
import { useUser } from '../../../../../common/context/User';
import useMigrationPlanPreview from '../hooks/useMigrationPlanPreview';
import useMigrateToOB from '../hooks/useMigrateToOB';

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
          label="Go back to plans"
          icon={<ArrowLeftIcon />}
        />
      </ButtonContainer>
    </LeftColumn>

    <RightColumn>
      <SummaryContainer>
        <Body>
          <Text type="h2">Your upgrade</Text>
          <SummaryDetails>
            {
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
                    next billing cycle begins on <b>August 3, 2021</b>
                  </Text>
                </SummaryNote>
              </>
            }
          </SummaryDetails>

          <Bottom>
            <TotalPrice>
              <sup>$</sup>
              <Text type="h2" as="p">
                {migrationPreview.migrationSummary.totalPrice}
              </Text>
            </TotalPrice>

            <PriceFooterWrapper>
              <Text type="p" color="grayDark">
                Billed monthly in USD
              </Text>
              <Text type="p" color="grayDark">
                Includes {migrationPreview.migrationSummary.channelCount} social
                channels
              </Text>
            </PriceFooterWrapper>

            <Button
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
  const {
    data: migrationPreview,
    loading,
    error: previewError,
  } = useMigrationPlanPreview(user);
  const {
    migrateToOB,
    success,
    error: migrateError,
    processing,
  } = useMigrateToOB(user);

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
          ctaButton: 'Go back',
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
