import React from 'react';
import Text from '@bufferapp/ui/Text';
import Switch from '@bufferapp/ui/Switch';
import Button from '@bufferapp/ui/Button';
import {
  ButtonContainer,
  SwitchContainer,
  PlanSelectorHeader,
  Right,
  Left,
  Wrapper,
  Container,
  CardContainer,
  LoadingSummary,
  LoadingText,
} from '../style';

const Loader = () => {
  return (
    <Container>
      <Left loading>
        <PlanSelectorHeader>
          <LoadingText />
          <SwitchContainer>
            <Switch
              isOn={false}
              handleSwitch={() => {}}
              label="Monthly"
              id="switch-off"
              disabled={true}
            />
            <p>
              Yearly <span>20% discount</span>
            </p>
          </SwitchContainer>
        </PlanSelectorHeader>
        <CardContainer>
          <Wrapper loading>
            <LoadingText />
          </Wrapper>
          <Wrapper loading>
            <LoadingText />
          </Wrapper>
        </CardContainer>
      </Left>
      <Right>
        <LoadingSummary>
          <LoadingText />
        </LoadingSummary>
        <ButtonContainer>
          <Button
            type="primary"
            onClick={() => {}}
            label={'...'}
            fullWidth
            disabled={true}
          />
        </ButtonContainer>
      </Right>
    </Container>
  );
};

export default Loader;
