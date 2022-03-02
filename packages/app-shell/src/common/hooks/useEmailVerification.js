import { useMutation } from '@apollo/client';
import { ACCOUNT_INITIATE_EMAIL_VERIFICATION } from '../graphql/account';

const useEmailVerification = () => {
  const [initiateEmailVerification, { data, error }] = useMutation(
    ACCOUNT_INITIATE_EMAIL_VERIFICATION
  );

  let bannerOptions;

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
      text: 'Please verify your email address.',
      actionButton: {
        action: initiateEmailVerification,
        label: 'Re-send verification email',
      },
    };
  }

  return {
    bannerOptions,
  };
};

export default useEmailVerification;
