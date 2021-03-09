import React from 'react';
import PropTypes from 'prop-types';

/**
 * Primary UI component for user interaction
 */
export const SelectionScreen = ({ children }) => {
  return <div>{children}</div>;
};

SelectionScreen.propTypes = {
  //   /**
  //    * Is this the principal call to action on the page?
  //    */
  //   primary: PropTypes.bool,
  //   /**
  //    * What background color to use
  //    */
  //   backgroundColor: PropTypes.string,
  //   /**
  //    * How large should the button be?
  //    */
  //   size: PropTypes.oneOf(['small', 'medium', 'large']),
  //   /**
  //    * Button contents
  //    */
  //   label: PropTypes.string.isRequired,
  //   /**
  //    * Optional click handler
  //    */
  //   onClick: PropTypes.func,
};

SelectionScreen.defaultProps = {};
