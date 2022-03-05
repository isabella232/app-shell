import { useMutation } from '@apollo/client';
import { ACCOUNT_INITIATE_EMAIL_VERIFICATION } from '../graphql/account';

const useEmailVerification = () => {
  const [initiateEmailVerification, { data, error }] = useMutation(
    ACCOUNT_INITIATE_EMAIL_VERIFICATION
  );

  let bannerOptions;
  let renderCustomHTML;

  if (data) {
    // Success after re-send verification email attempt
    bannerOptions = {
      text: 'We just sent you an email! Please check your inbox to complete verification steps.',
      actionButton: {},
    };
  } else if (error) {
    // Error during the re-send verification email attempt
    bannerOptions = {
      text: error.accountInitiateEmailVerificationError?.userFriendlyMessage,
      actionButton: {},
    };
  } else {
    // Email verification needed
    bannerOptions = {
      actionButton: {
        action: initiateEmailVerification,
        label: 'Re-send verification email',
      },
    };
    renderCustomHTML = true;
  }

  return {
    bannerOptions,
    renderCustomHTML,
  };
};

export default useEmailVerification;
