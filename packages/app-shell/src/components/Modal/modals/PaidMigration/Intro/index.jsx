import Text from '@bufferapp/ui/Text';
import Button from '@bufferapp/ui/Button';
import FlashIcon from '@bufferapp/ui/Icon/Icons/Flash';

import {
  Holder,
  ButtonContainer,
  IconWrapper,
  BackgroundLayerBottom,
  BackgroundLayerTop,
} from './style';

const Intro = () => {
  return (
    <Holder>
      <BackgroundLayerBottom></BackgroundLayerBottom>
      <BackgroundLayerTop></BackgroundLayerTop>
      <IconWrapper>
        <FlashIcon size="large" />
      </IconWrapper>

      <Text type="h3">Supercharge your plan with Essentials</Text>

      <ButtonContainer>
        <Button type="text" label="Remind Me Later" onClick={() => {}} />
        <Button type="primary" label="Learn More" onClick={() => {}} />
      </ButtonContainer>
    </Holder>
  );
};

export default Intro;
