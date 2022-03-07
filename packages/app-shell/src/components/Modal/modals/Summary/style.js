import {
  blue,
  grayDark,
  grayDarker,
  grayLight,
} from '@bufferapp/ui/style/colors';
import styled from 'styled-components';

export const SummaryContainer = styled.div`
  width: 285px;
  background-color: #fcfcfc;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  box-shadow: inset 1px 0px 0px #bdbdbd;
  height: 100%;
  padding: ${(props) => (props.sbbEnabled ? '22px 0 24px' : '70px 0 24px')};
  box-sizing: border-box;
  position: relative;

  h2 {
    margin-left: 8px;
    margin-bottom: 16px;
  }
`;

export const Body = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  position: relative;
  height: calc(100% - 40px);

  ${(props) =>
    props.sbbEnabled &&
    `
      display: flex;
      flex-direction: column;
    `}
`;

export const Bottom = styled.div`
  position: absolute;
  bottom: 16px;
  margin-left: 8px;

  label {
    display: inline-block;
    margin-bottom: 8px;
    font-weight: 700;
  }
`;

export const DetailList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  p {
    margin-top: 0;
    margin-bottom: 0;
    display: inline-block;
    font-weight: 500;
  }
`;

export const Detail = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 6px;
`;

export const DiscountReminder = styled.div`
  display: flex;
  margin-top: 4px;

  p {
    font-family: 'Roboto', sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px;
    letter-spacing: 0px;
    color: ${blue};
    margin-bottom: 0;
    margin-top: 0;
  }
  svg {
    fill: ${blue};
    margin-right: 4px;
  }
`;

export const Price = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  sup {
    font-family: 'Roboto', sans-serif;
    font-weight: 800;
    font-size: 18px;
  }

  sup:first-child {
    font-weight: bold;
    font-size: 24px;
    line-height: 100%;
  }

  p {
    color: black;
    margin-left: 2px;
    margin-right: 2px;
  }
`;

export const TotalPrice = styled(Price)`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  position: initial;

  p {
    margin: 0 2px;
    font-size: 40px;
    line-height: 30px;
  }
`;

export const BoldPrice = styled.span`
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 17px;
  letter-spacing: 0px;
`;

export const Separator = styled.span`
  height: 2px;
  width: 100%;
  display: block;
  background-color: #eeeeee;
  margin-bottom: 16px;
  margin-top: 16px;
`;

export const SummaryNote = styled.div`
  p {
    font-weight: 600;
    color: ${grayDark};
    margin: 0;
  }

  b {
    font-weight: 600;
    color: ${grayDarker};
  }
`;

export const SummaryDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  background: #ffffff;
  border: 1px solid ${grayLight};
  box-sizing: border-box;
  border-radius: 4px;
  padding: 20px 16px;

  ${Detail}, p {
    font-size: 12px;
  }
`;

export const Title = styled.div`
  margin-bottom: 16px;

  p {
    margin-top: 0;
    margin-bottom: 0;
    display: inline-block;
    font-weight: bold;
    font-size: 14px;
  }
`;

export const PriceFooterWrapper = styled.div`
  p {
    margin-bottom: 0;
    margin-top: 0;
    font-size: 12px;
    font-weight: 500;
  }
`;
