import React from 'react';
import Button from '@bufferapp/ui/Button';
import Text from '@bufferapp/ui/Text';

import Banner from '../../../../components/Banner';
import useEmailVerification from '../../../../common/hooks/useEmailVerification';

import * as Styles from './styles';

const EmailVerificationBanner = () => {
  const { bannerOptions, renderCustomHTML } = useEmailVerification();

  if (renderCustomHTML) {
    //  We need to render custom HTML as we're using a link, rather than text.
    return (
      <Banner
        themeColor="orange"
        dismissible={false}
        customHTML={
          <>
            <Text type="paragraph" color="#fff">
              Please verify your email address. You can visit our{' '}
              <a
                href="https://support.buffer.com/hc/en-us/articles/4563021461907-Verifying-your-Buffer-email-address"
                target="_blank"
                rel="noopener noreferrer"
              >
                help guide
              </a>{' '}
              for more info.
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
