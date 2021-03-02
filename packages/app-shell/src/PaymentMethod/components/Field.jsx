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

const CardWrapper = styled.div`
  display: flex;
  align-items: center;

  > div {
    margin-left: 16px;
    width: 100%;
  }
`;

const Card = ({ brand }) => {
  switch(brand) {
    case 'visa':
      return ('visa');
    case 'amex':
      return ('amex');
    case 'diners_club':
      return ('diners_club');
    case 'discover':
      return ('discover');
    case 'jcb':
      return ('jcb');
    case 'mastercard':
      return ('mastercard');
    default:
      return (<PlaceholderIcon size="medium" />);
  }
}

const Field = ({ label }) => {
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
              onChange={(value) => {setData(value)}}
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
      {!!data.error && <Error error={data.error} />}
    </Text>
  </StyledField>);
}

export default Field;
