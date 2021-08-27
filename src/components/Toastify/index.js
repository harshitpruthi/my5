import './toastify.css';

import React from 'react';

import cn from 'classnames';
import PropTypes from 'prop-types';

export const TOASTIFY_TYPE = {
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  INFO: 'INFO'
};

export const TOASTIFY_POSITION = {
  TOP: 'TOP',
  BOTTOM: 'BOTTOM'
};

class Toastify extends React.PureComponent {
  timeoutHandler = null;


  state = {
    open: false,
    msg: this.props.msg // Initially load the msg state from props, this state is then source of truth
  }


  componentDidUpdate(prevProps) {
    const { msg } = this.props;

    if (msg) {
      this.setState({ msg });
    }
  }


  componentWillUnmount() {
    clearTimeout(this.timeoutHandler);
  }


  render() {
    const { open, msg } = this.state;
    const { msgType, position, showCloseBtn } = this.props;

    return (
      <div
        className={
          cn('sb10Toastify', {
            'sb10ToastifyShow': open,
            'sb10ToastifySuccess': msgType === TOASTIFY_TYPE.SUCCESS,
            'sb10ToastifyError': msgType === TOASTIFY_TYPE.ERROR,
            'sb10ToastifyInfo': msgType === TOASTIFY_TYPE.INFO,
            'sb10ToastifyPositionTop': position === TOASTIFY_POSITION.TOP,
            'sb10ToastifyPositionBottom': position === TOASTIFY_POSITION.BOTTOM
          })
        }
      >
        <div className="absolute-center">
          <div>{msg}</div>
          {
            showCloseBtn
              ?
              <i className="material-icons sb10ToastifyCloseIcn" height={22}
                width={22} onClick={this.close}>close</i>
              : null
          }
        </div>
      </div>
    );
  }


  open = (msg, timeOut = this.props.timeOut, autoClose = this.props.autoClose) => {
    // msg argument is optional
    this.setState({
      open: true,
      msg: (msg) ? this.state.msg : msg
    });

    if (autoClose) {
      this.timeoutHandler = setTimeout(this.close, timeOut);
    }
  }


  close = () => {
    // clear any timeout and then proceed
    clearTimeout(this.timeoutHandler);

    this.setState({
      open: false
    });
  }
}


Toastify.propTypes = {
  ref: PropTypes.shape({ current: PropTypes.instanceOf(Toastify) }),
  msg: PropTypes.string,
  timeOut: PropTypes.number, /* how much time we have to show toasify */
  msgType: PropTypes.string, /* status can be SUCCESS, ERROR, INFO */
  position: PropTypes.string,
  showCloseBtn: PropTypes.bool,
  autoClose: PropTypes.bool
};

Toastify.defaultProps = {
  timeOut: 4000,
  msgType: TOASTIFY_TYPE.INFO,
  position: TOASTIFY_POSITION.BOTTOM,
  showCloseBtn: false,
  autoClose: true
};

export default Toastify;
