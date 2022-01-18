import {
  grayLighter,
  blue,
  grayDark,
  grayDarker,
  white,
  grayLight,
  blueLighter,
} from '@bufferapp/ui/style/colors';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: ${({ downgradedMessage, isFreePlan }) =>
    downgradedMessage || !isFreePlan ? '700px' : '650px'};
  align-items: center;
  border-radius: 8px;
  box-sizing: border-box;
`;

export const LoadingContainer = styled(Container)`
  width: 700px;
  justify-content: center;
`;

export const Left = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 24px 0px 24px;
  height: 100%;
  justify-content: center;
  box-sizing: border-box;
  background-image: url('https://buffer-ui.s3.amazonaws.com/Plan+Screen+-+Background.png');
  background-position-x: 85%;
  background-repeat: no-repeat;
  background-size: 400px;
  background-position-y: 0px;
`;

export const Right = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;

  h2 {
    margin-top: 0;
    margin-bottom: 19px;
  }
`;

export const PlanSelectorHeader = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    margin-top: 20px;
    margin-bottom: 10px;
  }
`;

export const SwitchContainer = styled.div`
  display: flex;
  align-items: center;

  p {
    color: #333333;
    font-family: Roboto, sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    margin-left: 8px;
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

export const AbsoluteSavings = styled.span`
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 0px;
  color: ${blue};
  text-align: right;
  width: 110px;
`;

export const ButtonContainer = styled.div`
  border-bottom-right-radius: 8px;
  height: 88px;
  padding: 24px 20px;
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

//SELECTION SCREEN STYLES

export const Wrapper = styled.div`
  border: ${(props) =>
    props.isSelectedPlan
      ? '1.5px solid transparent'
      : `1.5px solid ${grayLight}`};
  box-shadow: ${(props) =>
    props.isSelectedPlan
      ? `0px 0px 0px 1.5px ${blue}, 0px 4px 8px rgba(0, 0, 0, 0.04)`
      : `0px 4px 8px rgba(0, 0, 0, 0.04)`};
  border-radius: 3px;
  height: 500px;
  position: relative;
  padding: 32px 21px;
  flex: 1 1 0px;
  margin-right: 12px;
  box-sizing: border-box;
  background: ${white};
  cursor: pointer;
  width: 285px;

  transition-property: border-color;
  transition-duration: 250ms;
  transition-timing-function: ease-in-out;

  p {
    font-weight: 500;
    margin: 0;
  }

  div + p {
    max-width: 200px;
  }

  h3 {
    margin: 0;
  }

  &:focus,
  &:hover {
    border: ${(props) =>
      props.isSelectedPlan
        ? '1.5px solid transparent'
        : `1.5px solid ${blueLighter}`};
    outline: none;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 8px;
  margin-top: 10px;

  div:last-child {
    margin-right: 0;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  margin-bottom: 16px;

  h2 {
    font-size: 18px;
    line-height: 28px;
  }
`;

export const Check = styled.div`
  margin-left: auto;
  border: 1.5px solid
    ${({ isSelectedPlan }) => (isSelectedPlan ? blue : grayLight)};
  background: ${({ isSelectedPlan }) => (isSelectedPlan ? blue : white)};
  box-sizing: border-box;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: ${white};
    width: 18px;
    height: 18px;
  }
`;

export const CardFooter = styled.div`
  label {
    font-weight: 500;
    font-size: 12px;
    white-space: normal;
  }
`;

export const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 40%;
`;

export const CurrentLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  width: 64px;
  height: 25px;
  background: ${grayLighter};
  border-radius: 4px;

  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  font-size: 12px;
  line-height: 140%;
  letter-spacing: 0.4px;
  color: ${grayDarker};
  text-transform: uppercase;
  margin-left: 12px;
  box-sizing: border-box;
`;

export const Recommended = styled(CurrentLabel)`
  background: ${blue};
  color: ${white};
  width: 110px;
  z-index: 1;
  position: absolute;
  top: -12px;
  left: 0;
  right: 0;
  margin: auto;
`;

export const RadioButton = styled.div`
  position: absolute;
  top: 21px;
  right: 21px;

  border-radius: 50%;
  width: 24px;
  height: 24px;
  background-color: ${(props) =>
    props.selectedPlan ? `${blue}` : 'transparent'};

  border: ${(props) =>
    props.selectedPlan ? `2px solid ${blue}` : '2px solid rgb(224, 224, 224)'};
  transition: 0.2s all linear;
  margin-right: 5px;

  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: content-box;

  svg {
    fill: ${white};
  }
`;

export const Price = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: -4px;

  sup {
    font-family: 'Roboto', sans-serif;
  }

  sup:first-child {
    font-weight: bold;
    font-size: 20px;
    line-height: 100%;
  }

  sup::last-child {
    font-weight: 900;
    font-size: 14px;
    line-height: 140%;
  }

  p {
    color: black;
    margin-left: 2px;
    margin-right: 2px;
    font-weight: 600;
    font-size: 32px;
  }
`;

export const TotalPrice = styled(Price)`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  position: initial;

  p {
    margin: 0 2px;
    font-size: 30px;
    line-height: 30px;
  }
`;

export const BenefitList = styled.div`
  h3 {
    font-size: 14px;
    font-weight: 700;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    p {
      color: ${grayDark};
    }
  }

  &::before {
    content: '';
    border-top: 1px solid ${grayLight};
    width: 237px;
    display: block;
    margin-bottom: 8px;
    margin-top: 16px;
  }
`;

export const Benefit = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 2px;

  p {
    font-size: 12px;
    color: ${grayDark};
  }

  svg {
    fill: ${blue};
    margin-right: 8px;
  }
`;

export const DowngradeMessage = styled.li`
  display: flex;
  max-width: 610px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  font-size: 14px;
  color: ${blue};

  svg {
    fill: ${blue};
    height: 22px;
    width: 22px;
    margin-top: -4px;
    margin-right: 5px;
  }
`;
