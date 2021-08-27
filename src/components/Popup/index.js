import React from 'react';
import PropTypes from 'prop-types';
import Rodal from './Rodal';

class Popup extends React.PureComponent {
  constructor(props) {
    super(props);
    if (props.onLoad) {
      props.onLoad();
    }
  }


  componentWillUnmount() {
    if (this.props.onUnLoad) {
      this.props.onUnLoad();
    }
  }


  render() {
    const { visible, onClose, height, width, customStyles, animation, closeMaskOnClick, closeOnEsc, children, showCloseButton } = this.props;

    return (
      <Rodal
        visible={visible}
        onClose={onClose}
        height={height}
        width={width}
        customStyles={customStyles}
        animation={animation}
        closeMaskOnClick={closeMaskOnClick}
        closeOnEsc={closeOnEsc}
        showCloseButton={showCloseButton}
      >
        {children}
      </Rodal>
    );
  }
}


Popup.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  closeMaskOnClick: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  closeOnEsc: PropTypes.bool,
  customStyles: PropTypes.object, // margin-bottom should always be 0 so the popup will pop up from bottom
  animation: PropTypes.string  // type of animation - zoom, fade, flip, door, rotate, slideUp, slideDown, slideLeft, slideRight
};


Popup.defaultProps = {
  width: '100%',
  height: 'fit-content',
  closeMaskOnClick: true,
  closeOnEsc: true,
  customStyles: {},
  animation: 'slideUp',
  showCloseButton: false
};


export default Popup;
