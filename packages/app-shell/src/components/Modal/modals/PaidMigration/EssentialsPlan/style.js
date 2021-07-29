import styled from 'styled-components';

import {
  blue,
  gray,
  grayDark,
  grayLight,
  purpleLight,
  teal,
} from '@bufferapp/ui/style/colors';

export const Holder = styled.div`
  width: 900px;
  height: 600px;
  box-sizing: border-box;
  padding-top: 80px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export const Hero = styled.div`
  width: 100%;
  text-align: center;
  background-image: url('https://buffer-ui.s3.amazonaws.com/shapes/wavy-gradient-bg.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position-y: 100%;
  padding-bottom: 55px;

  img {
    margin: 0 auto 20px;
    display: block;
  }

  h1 {
    margin-top: 69px;
    margin-bottom: 0;
  }

  p {
    color: ${grayDark};
    max-width: 460px;
    margin: 0 auto;
  }
`;

export const IconWrapper = styled.div`
  text-align: center;
  margin-top: 69px;

  svg {
    width: 32px;
    height: 32px;
    color: ${purpleLight};
  }
`;

export const SectionIntro = styled.div`
  background-color: #f8fafc;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SectionOneBuffer = styled.div`
  background-color: ${blue};
  padding-top: 230px;
`;

export const SectionAnalytics = styled.div`
  background-color: ${teal};
  background: linear-gradient(0deg, white 30%, ${teal} 40%);
  padding-top: 120px;
`;

export const IntroducingEssentials = styled.div`
  width: 900px;
  height: 785px;
  margin-top: -65px;
  margin-bottom: -200px;
  background-image: url('https://buffer-ui.s3.amazonaws.com/screenshots/introducing.png');
  background-repeat: no-repeat;
  background-size: contain;
`;

export const Feature = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    margin-top: 15px;
    margin-bottom: 0;
  }

  p {
    max-width: 340px;
    margin-top: 15px;
  }
`;

export const InstagramPosting = styled.div`
  width: 900px;
  height: 726px;
  margin-bottom: -200px;
  background-image: url('https://buffer-ui.s3.amazonaws.com/screenshots/instagram-posting.png');
  background-repeat: no-repeat;
  background-size: contain;
`;

export const BufferSuite = styled.div`
  width: 900px;
  height: 323px;
  background-image: url('https://buffer-ui.s3.amazonaws.com/screenshots/buffer-suite.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position-x: right;
`;

export const OneBuffer = styled.div`
  width: 900px;
  height: 602px;
  margin-top: 20px;
  background-image: url('https://buffer-ui.s3.amazonaws.com/screenshots/one-buffer.png');
  background-repeat: no-repeat;
  background-size: contain;
`;

export const Label = styled.div`
  border: 2px solid ${(props) => props.color};
  padding: 5px 12px;
  border-radius: 3px;
  width: fit-content;
  margin: 0 auto;

  svg {
    color: ${(props) => props.color};
    margin-right: 7px;
  }

  p {
    color: ${(props) => props.color};
    display: inline;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    font-weight: 600;
    font-size: 12px;
  }
`;

export const BottomSection = styled.div`
  margin-top: -70px;
  background-color: #f8fafc;
  padding-bottom: 100px;
  background-image: url('https://buffer-ui.s3.amazonaws.com/shapes/gray-swirl.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position-y: bottom;
`;

export const TableContainer = styled.div`
  position: relative;
  max-width: 720px;
  margin: 0 auto;

  p:first-of-type {
    max-width: 272px;
  }
`;

export const FeaturesTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  position: relative;
  z-index: 9;
  margin-top: -65px;

  td,
  th {
    padding: 10px 25px;
    text-align: center;

    &:nth-child(2) {
      box-shadow: inset -1em 0em #f8fafc, inset 1em 0em #f8fafc;
    }

    &:nth-child(3) {
      box-shadow: inset 1em 0em #f8fafc, inset -1em 0em #f8fafc;
    }

    &:nth-child(2),
    &:nth-child(3) {
      background-color: white;
      width: 154px;
      text-align: center;
    }
  }

  thead {
    th {
      padding: 25px;
      text-align: center;
      position: relative;

      &:last-child {
        position: relative;

        &:before {
          content: '';
          height: 20px;
          background: white;
          width: 88%;
          display: block;
          position: absolute;
          top: -8px;
          left: 10px;
          border-radius: 4px;
        }
      }

      span {
        font-size: 24px;
      }

      /* feature category name */
      &:nth-child(1) {
        text-align: left;
        font-weight: 600;
        vertical-align: bottom;
      }

      &:nth-child(2) {
        &:before {
          content: '';
          display: block;
          width: 107px;
          height: 67px;
          position: absolute;
          top: -54px;
          right: -94px;
          transform: rotate(15deg);
          z-index: 9;
          background-image: url('https://buffer-ui.s3.amazonaws.com/shapes/arrow.png');
          background-repeat: no-repeat;
          background-size: contain;
          background-position-y: bottom;
        }
      }
    }
  }

  tbody {
    tr {
      border-top: 1px solid ${grayLight};

      &:last-child {
        td:last-child {
          position: relative;

          &:after {
            content: '';
            height: 20px;
            background: white;
            width: 88%;
            display: block;
            position: absolute;
            bottom: -8px;
            left: 10px;
            border-radius: 4px;
          }
        }
      }
    }

    td {
      text-align: left;
      margin-bottom: 7px;
      line-height: 1.2rem;
      padding: 15px 5px;
    }

    p {
      margin-top: 5px;
      margin-bottom: 5px;

      &:last-of-type {
        font-size: 12px;
      }
    }

    svg {
      width: 40px;
    }
  }
`;

export const PlanLabel = styled.div`
  background-color: ${(props) => (props.highlight ? blue : grayLight)};
  width: fit-content;
  text-align: center;
  margin: 0 auto;
  border-radius: 3px;
  padding: 4px 12px;

  p {
    text-transform: uppercase;
    color: ${(props) => (props.highlight ? 'white' : grayDark)};
    font-size: 12px;

    letter-spacing: 1.5px;
    font-weight: 600;
    margin: 0;
    display: inline-block;
  }

  svg {
    color: white;
    margin-right: 9px;
  }
`;

export const PlanName = styled.div`
  margin-top: 10px;

  p {
    font-size: 20px;
    font-weight: 600;
    margin: 0;
    line-height: 30px;
  }
`;

export const FeatureIcon = styled.div`
  display: flex;
  justify-content: center;

  svg {
    color: ${blue};
  }
`;

export const DashIcon = styled.div`
  width: 12px;
  height: 3px;
  border-radius: 10px;
  background-color: ${gray};
`;

export const FreePlanBorder = styled.div`
  border: 2px solid ${gray};
  position: absolute;
  height: 96%;
  border-radius: 5px;
  width: 175px;
  left: 325px;
  z-index: 99;
  top: 40px;
  pointer-events: none;
`;

export const EssentialsPlanBorder = styled.div`
  border: 3px solid ${blue};
  position: absolute;
  height: 97%;
  border-radius: 5px;
  width: 173px;
  right: 12px;
  z-index: 99;
  top: 35px;
  pointer-events: none;
`;

export const ButtonWrapper = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: center;
`;
