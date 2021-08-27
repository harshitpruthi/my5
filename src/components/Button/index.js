import './button.css';

import React from 'react';

import cn from 'classnames';
import PropTypes from 'prop-types';

import {
  Loader,
  LOADER_TYPE,
} from '../Loader';

class Button extends React.PureComponent {
  render() {
    const {
      buttonText,
      buttonType,
      fixToBottom,
      isDisabled,
      showLoader,
      loadingText
    } = this.props;

    const classname = cn({
      'btn51Btn': true,
      'btn51RipplePrimary btn51Primary': buttonType === 'Primary',
      'btn51RippleSecondary btn51Secondary': buttonType === 'Secondary',
      'btn51RippleTertiary btn51Tertiary': buttonType === 'Tertiary',
      'btn51Loading': showLoader,
      'btn51DisabledPrimary': isDisabled && buttonType === 'Primary',
      'btn51DisabledSecondary': isDisabled && buttonType === 'Secondary',
      'btn51DisabledTertiary': isDisabled && buttonType === 'Tertiary'
    });

    return (
      <div className={fixToBottom && 'btn51BottomFixed'}>
        <div
          className={classname}
          onClick={this.onButtonClick}
          style={this.getComputedStyle()}
        >
          {
            showLoader && !isDisabled ? <Loader loaderType={LOADER_TYPE.LINEAR} /> : null
          }

          <div className="absolute-center btn51ParentDimension">
            <span className="absolute-center"
              style={{ padding: '0px 25px' }}
            >
              {/* {
                iconName && iconPosition === 'Left' && this.getIconUI()
              } */}
              <span>{showLoader && !isDisabled ? loadingText : buttonText}</span>
              {/* {
                iconName && iconPosition === 'Right' && this.getIconUI()
              } */}
            </span>
          </div>

        </div>
      </div>
    );
  }


  // getIconUI = () => {
  //   const { iconName, iconPosition } = this.props;

  //   return (
  //     <IconStore
  //       iconName={iconName}
  //       fontSize={24}
  //       iconStyle={this.getComputedStyleForIcon()}
  //       iconClass={`btn51Icon${iconPosition} absolute-center`}
  //     />
  //   );
  // }


  onButtonClick = (e) => {
    const { onClick, showLoader, isDisabled } = this.props;

    if (!isDisabled && !showLoader) {
      onClick(e);
    }
  }


  getComputedStyle = () => {
    const {
      width,
      height,
      fontSize,
      textColor,
      backgroundColor,
      ...restProps
    } = this.props;

    return {
      width,
      height,
      fontSize,
      backgroundColor,
      color: textColor,
      ...restProps
    };
  }


  getComputedStyleForIcon = () => {
    const {
      fontSize,
      textColor
    } = this.props;

    return {
      fontSize,
      color: textColor
    };
  }

}

Button.propTypes = {
  buttonText: PropTypes.string,         // text to display on button

  width: PropTypes.oneOfType([          // width of button (can be in %)
    PropTypes.string,
    PropTypes.number
  ]),

  height: PropTypes.oneOfType([         // height of button
    PropTypes.string,
    PropTypes.number
  ]),

  buttonType: PropTypes.oneOf([              // type of button, to keep consistency there is no custum type
    'Primary', 'Secondary', 'Tertiary'
  ]),
  onClick: PropTypes.func,             // on click callback
  showLoader: PropTypes.bool,           // flag to show loading state
  loadingText: PropTypes.string,       // text to show on button while loading
  fixToBottom: PropTypes.bool,         // flag to stick button at bottom
  isDisabled: PropTypes.bool,          // flag to keep button disabled
  backgroundColor: PropTypes.string,   // background color

  //Props required for text styling
  textColor: PropTypes.string,         // text color
  fontSize: PropTypes.oneOfType([      // font size
    PropTypes.string,
    PropTypes.number
  ]),

  //Props for icon
  iconName: PropTypes.string,          // material icon name
  iconPosition: PropTypes.oneOf([      // icon position
    'Left', 'Right'
  ])
};

Button.defaultProps = {
  buttonText: '',
  width: 'auto',
  height: '45px',
  buttonType: 'Primary',
  onClick: () => { },
  fixToBottom: false,
  isDisabled: false,
  iconName: null,
  iconPosition: 'Left',
  showLoader: false,
  loadingText: 'Loading...',
  fontSize: null
};
export default Button;
