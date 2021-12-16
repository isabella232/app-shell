const useFeatureFlip = (user, featureFlip) => {
  if (!user || !user.featureFlips) return false;

  return user.featureFlips.includes(featureFlip);
};

export default useFeatureFlip;
