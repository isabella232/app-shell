import React from 'react';
import PropTypes from 'prop-types';

import Button from '@bufferapp/ui/Button';
import Text from '@bufferapp/ui/Text';
import CrossIcon from '@bufferapp/ui/Icon/Icons/Cross';

import { orangeDark } from '@bufferapp/ui/style/colors';

import {
  BannerStyled,
  BannerCloseButton,
  Wrapper,
  ButtonWrapper,
} from './style';

export default class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
    };
    this.closeBanner = this.closeBanner.bind(this);
  }

  closeBanner() {
    this.setState({ isOpen: false });
    const { onCloseBanner } = this.props;
    if (onCloseBanner) {
      onCloseBanner();
    }
  }

  renderBannerContent(themeColor) {
    const { customHTML, text, actionButton } = this.props;
    if (customHTML) {
      return <Wrapper>{customHTML}</Wrapper>;
    }
    return (
      <Wrapper>
        <Text type="paragraph" color="#FFF">
          {text}
        </Text>
        <ButtonWrapper>
          {actionButton.label && actionButton.action && (
            <Button
              type={themeColor === 'orange' ? 'orange' : 'primary'}
              onClick={actionButton.action}
              label={actionButton.label}
              size="small"
            />
          )}
        </ButtonWrapper>
      </Wrapper>
    );
  }

  render() {
    const { isOpen } = this.state;
    const { themeColor, dismissible } = this.props;

    if (isOpen) {
      return (
        <BannerStyled themeColor={themeColor}>
          {this.renderBannerContent(themeColor)}
          {dismissible && (
            <BannerCloseButton>
              <Button
                type="text"
                icon={
                  <CrossIcon
                    color={themeColor === 'blue' ? '#fff' : orangeDark}
                  />
                }
                hasIconOnly
                onClick={this.closeBanner}
                label="Close"
                size="small"
              />
            </BannerCloseButton>
          )}
        </BannerStyled>
      );
    }
    return null;
  }
}

Banner.propTypes = {
  /** The main text of the banner */
  text: PropTypes.string,

  /** The text of the Call To Action of the banner */
  actionButton: PropTypes.shape({
    label: PropTypes.string,
    action: PropTypes.func,
  }),

  /** Custom HTML */
  customHTML: PropTypes.shape({ __html: PropTypes.string }),

  /** Theme color. Can be `'blue'` or `'orange'` */
  themeColor: PropTypes.oneOf(['blue', 'orange']),

  /** Handler when the banner closes */
  onCloseBanner: PropTypes.func,

  /** Allow functionality to dismiss banner **/
  dismissible: PropTypes.bool,
};

Banner.defaultProps = {
  text: '',
  actionButton: {},
  customHTML: null,
  themeColor: 'blue',
  onCloseBanner: null,
  dismissible: true,
};
