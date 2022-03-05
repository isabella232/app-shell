import React from 'react';
import Button from '@bufferapp/ui/Button';
import Text from '@bufferapp/ui/Text';

import Banner from '../../../../components/Banner';
import useEmailVerification from '../../../../common/hooks/useEmailVerification';

import * as Styles from './styles';

const EmailVerificationBanner = () => {
  const { bannerOptions, renderCustomHTML } = useEmailVerification();

  if (renderCustomHTML) {
    return (
      <Banner
        themeColor="orange"
        dismissible={false}
        customHTML={
          <>
            <Text type="paragraph" color="#fff">
              Please verify your email address. Check out our{' '}
              <a href="">help guide</a> to read more.
            </Text>
            <Styles.ButtonWrapper>
              <Button
                type="orange"
                onClick={bannerOptions.actionButton.action}
                label={bannerOptions.actionButton.label}
                size="small"
              />
            </Styles.ButtonWrapper>
          </>
        }
      />
    );
  }

  return (
    <Banner
      themeColor="orange"
      text={bannerOptions.text}
      actionButton={bannerOptions.actionButton}
      dismissible={false}
    />
  );
};

export default EmailVerificationBanner;
