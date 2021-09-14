import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  grayDark,
  green,
  white,
  blue,
  grayLighter,
} from '@bufferapp/ui/style/colors';

import {
  fontWeightMedium,
  fontWeightBold,
  fontFamily,
  fontSizeSmall,
} from '@bufferapp/ui/style/fonts';

const StyledNavBarProducts = styled.nav`
  display: flex;
  position: relative;
  z-index: 2;
`;

const ProductLink = styled.a`
  position: relative;
  height: 100%;
  display: flex;
  color: #fff;
  padding: 0 20px;
  font-size: 15px;
  text-decoration: none;
  align-items: center;
  color: ${(props) => (props.active ? blue : grayDark)};
  background-color: ${(props) => (props.active ? grayLighter : 'transparent')};
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: ${(props) => (props.active ? blue : 'transparent')};
  }
  &:hover {
    color: ${blue};
    background-color: ${grayLighter};
  }

  @media screen and (min-width: 1200px) {
    padding: 0 28px;
  }
`;

const ProductText = styled.span`
  font-family: ${fontFamily};
  font-weight: ${fontWeightBold};
  text-transform: capitalize;
`;

const NewLabel = styled.span`
  color: ${white};
  font-family: ${fontFamily};
  font-weight: ${fontWeightMedium};
  font-size: ${fontSizeSmall};
  background: ${green};
  border-radius: 12px;
  padding: 2px 8px;
  margin-left: 8px;
  margin-top: 2px;
`;

const NavBarProducts = ({ activeProduct, currentOrganization }) => {
  const products = [
    {
      id: 'publish',
      label: 'Publishing',
      isNew: false,
    },
    {
      id: 'analyze',
      label: 'Analytics',
      isNew: false,
    },
    {
      id: 'engage',
      label: 'Engagement',
      isNew: false,
    },
  ];

  const isAdmin = currentOrganization?.role === 'admin';
  const hasStartPageFeatureFlip =
    currentOrganization?.featureFlips?.includes('startPage');

  const showStartPage = isAdmin && hasStartPageFeatureFlip;

  if (showStartPage) {
    products.push({ id: 'start-page', label: 'Start Page', isNew: true });
  }

  return (
    <StyledNavBarProducts>
      {products.map(({ id, label, isNew }) => (
        <ProductLink
          active={activeProduct === id}
          href={`https://${id}.buffer.com`}
          key={id}
          id={`product-${id}`}
        >
          <ProductText>{label}</ProductText>
          {isNew && (
            <NewLabel aria-label="This is a new product! Give it a try!">
              New!
            </NewLabel>
          )}
        </ProductLink>
      ))}
    </StyledNavBarProducts>
  );
};

NavBarProducts.propTypes = {
  activeProduct: PropTypes.oneOf([
    'publish',
    'analyze',
    'engage',
    'start-page',
  ]),
  currentOrganization: PropTypes.shape({
    role: PropTypes.string,
    featureFlips: PropTypes.arrayOf(PropTypes.string),
  }),
};

NavBarProducts.defaultProps = {
  activeProduct: undefined,
  currentOrganization: {},
};

export default NavBarProducts;
