import React, { useState } from 'react';
import styled from 'styled-components';
import Text from '@bufferapp/ui/Text';
import PlaceholderIcon from '@bufferapp/ui/Icon/Icons/Placeholder';

import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement
} from "@stripe/react-stripe-js";

import {
  Field as StyledField,
  Input,
  Error,
} from '../style'

import {
  gray,
  redDark,
} from '@bufferapp/ui/style/colors';

const options ={
  style: {
    base: {
      color: "#636363",
      fontSize: "18px",
      fontFamily: 'Roboto, Open Sans, sans-serif',
      letterSpacing: "0.025em",
      "::placeholder": {
        color: gray
      }
    },
    invalid: {
      color: redDark
    }
  }
};

const ImgWrapper = styled.div`
  height: 18px;
  overflow: hidden;
  img {
    position: relative;
    top: -7px;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  align-items: center;

  > div {
    margin-left: 16px;
    width: 100%;
  }

  ${ImgWrapper} {
    width: 32px;
    margin-left: 0px;
  }
`;

const Card = ({ brand }) => {
  switch(brand) {
    case 'visa':
      return (<ImgWrapper><img alt='visa' src='https://buffer-ui.s3.amazonaws.com/card-icon-visa.png' /></ImgWrapper>);
    case 'amex':
      return (<ImgWrapper><img alt='amex' src='https://buffer-ui.s3.amazonaws.com/card-icon-amex.png' /></ImgWrapper>);
    case 'diners_club':
      return (<ImgWrapper><img alt='diners_club' src='https://buffer-ui.s3.amazonaws.com/card-icon-diners.png' /></ImgWrapper>);
    case 'discover':
      return (<ImgWrapper><img alt='discover' src='https://buffer-ui.s3.amazonaws.com/card-icon-discover.png' /></ImgWrapper>);
    case 'jcb':
      return (<ImgWrapper><img alt='jcb' src='https://buffer-ui.s3.amazonaws.com/card-icon-jcb.png' /></ImgWrapper>);
    case 'mastercard':
      return (<ImgWrapper><img alt='mastercard' src='https://buffer-ui.s3.amazonaws.com/card-icon-mastercard.png' /></ImgWrapper>);
    default:
      return (<PlaceholderIcon size="medium" />);
  }
}

const Field = ({ label, enableSubmit }) => {
  const [focus, setFocus] = useState(false);
  const [data, setData] = useState({});

  return (<StyledField>
    <Text type='label' >{label}
      <Input focus={focus} hasError={!!data.error} >
        {label === 'Credit card number' && <CardWrapper>
          <Card brand={data.brand} />
          <CardNumberElement
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              onChange={(value) => { enableSubmit(); setData(value); }}
              options={options}
          />
        </CardWrapper>}
        {label === 'Expiration date' && <CardExpiryElement
          options={options}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={(value) => {setData(value)}}
        />}
        {label === 'CVC' && <CardCvcElement
          options={options}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={(value) => {setData(value)}}
        />}
      </Input>
      <Error error={data.error} />
    </Text>
  </StyledField>);
}

export default Field;
