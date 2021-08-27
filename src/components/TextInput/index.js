import './textinput.css';

import React from 'react';

import cn from 'classnames';
import PropTypes from 'prop-types';

class TextInput extends React.PureComponent {
  render() {
    const {
      isMaterialUI, prefixComponent, suffixComponent, placeholder, inputStyle, label,
      errorText, fontSize, id, autoComplete, value, inputType, onInput, maxTextLimit,
      inputClass, fullWidth, name, minNumber, maxNumber, disabled, disableCopyPaste,
      removeUnderLineOnDisabled, infoText, inputMode, noErrorText, showParentDivUnderline,
      parentDivClass, errorTextClass, pattern
    } = this.props;

    const showError = (errorText !== '');

    const barClass = cn({
      txt88Bar: true,
      txt88BarError: showError
    });

    let labelClass = '';

    if (isMaterialUI) {
      labelClass = cn({
        txt88MlabelError: showError
      });

    } else {
      labelClass = this.props.labelClass;
    }

    let parentClassName = '';

    if (isMaterialUI) {
      parentClassName = 'txt88Mgroup';

    } else {
      parentClassName = cn(
        'txt88Parent',
        parentDivClass,
        {
          'txt88RemoveUnderline': (disabled && (!removeUnderLineOnDisabled)) || (!showParentDivUnderline),
          'txt88Pad0': !label
        });
    }

    return (
      <div id="txtinput88"
        className={cn({ 'txt88Width': fullWidth })}
      >

        {!isMaterialUI && label && <div className={`txt88Label ${labelClass}`}>{label}</div>}

        <div className={parentClassName} >
          {prefixComponent()}
          <input
            className={`txt88Input ${inputClass} ${isMaterialUI ? 'txt88InputMUI' : ''}`}
            style={fontSize === '' ? isMaterialUI ? { padding: '10px 10px 10px 2px', ...inputStyle } : { ...inputStyle } : isMaterialUI ? { padding: '10px 10px 10px 2px', fontSize: fontSize, ...inputStyle } : { fontSize: fontSize, ...inputStyle }}
            id={id}
            name={name}
            type={inputType}
            onInput={onInput}
            value={value}
            maxLength={maxTextLimit}
            min={minNumber}
            max={maxNumber}
            inputMode={inputMode}
            placeholder={isMaterialUI ? '' : placeholder}
            disabled={disabled ? 'disabled' : false}
            onCopy={disableCopyPaste ? (e) => this.onCopy(e) : () => { }}
            onPaste={disableCopyPaste ? (e) => this.onPaste(e) : () => { }}
            onKeyDown={(e) => this.onKeyDown(e)}
            onKeyUp={(e) => this.onKeyUp(e)}
            autoComplete={autoComplete}
            required
            pattern={pattern}
            ref={(ref) => { this.txtinput = ref; }}
          />
          {
            isMaterialUI
              ? <>
                <span className={barClass} />

                <label className={labelClass}
                  style={fontSize === '' ? {} : { fontSize: fontSize }}
                >{label}</label>

                {errorText ? <div className="txt88MErrorText">{errorText}</div> : null}

                {!showError && noErrorText !== '' ? <div className="txt88MNoErrorText">{noErrorText}</div> : null}
              </>
              : null
          }
          {suffixComponent()}
        </div>

        {
          !isMaterialUI
            ? <div>
              {errorText ? <div className={`txt88ErrorText ${errorTextClass}`}>{errorText}</div> : null}
              {infoText ? <div className="txt88InfoText">{infoText}</div> : null}
            </div>
            : null
        }
      </div>
    );
  }


  focus = () => {
    if (this.txtinput) {
      this.txtinput.focus();
    }
  }


  onCopy = (e) => {
    e.preventDefault();
  }


  onPaste = (e) => {
    e.preventDefault();
  }


  onKeyDown = (event) => {
    const { onKeyDown } = this.props;

    onKeyDown(event);
  }


  onKeyUp = (event) => {
    const { onEnterPress, onBackspace } = this.props;

    if (event.keyCode === 13) {
      if (onEnterPress) {
        onEnterPress(event);
      }

      return false;
      // returning false will prevent the event from bubbling up.
    } else if (event.keyCode === 8) {
      if (onBackspace) {
        onBackspace(event);
        return false;
      }

    } else {
      return true;
    }

    return true;
  }
}


TextInput.propTypes = {
  isMaterialUI: PropTypes.bool,
  showParentDivUnderline: PropTypes.bool,
  fullWidth: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onInput: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  id: PropTypes.string,
  inputType: PropTypes.string,
  errorText: PropTypes.string,
  noErrorText: PropTypes.string,
  disabled: PropTypes.bool,
  disableCopyPaste: PropTypes.bool,
  onEnterPress: PropTypes.func,
  onBackspace: PropTypes.func,
  maxTextLimit: PropTypes.number,
  minNumber: PropTypes.number,
  maxNumber: PropTypes.number,
  fontSize: PropTypes.string,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.string,
  prefixComponent: PropTypes.func,
  suffixComponent: PropTypes.func,
  removeUnderLineOnDisabled: PropTypes.bool,
  infoText: PropTypes.string,
  labelClass: PropTypes.string,
  inputClass: PropTypes.string,
  parentDivClass: PropTypes.string,
  inputStyle: PropTypes.object,
  errorTextClass: PropTypes.string,
  pattern: PropTypes.string,
  onKeyDown: PropTypes.func
};


TextInput.defaultProps = {
  isMaterialUI: false,
  showParentDivUnderline: true,
  inputType: 'text',
  fontSize: '',
  id: '',
  errorText: '',
  noErrorText: '',
  disabled: false,
  value: '',
  disableCopyPaste: false,
  maxTextLimit: 250,
  minNumber: 0,
  maxNumber: 10000000,
  autoComplete: 'on',
  placeholder: 'Enter text',
  prefixComponent: () => { },
  suffixComponent: () => { },
  onInput: () => { },
  removeUnderLineOnDisabled: false,
  infoText: '',
  labelClass: '',
  inputClass: '',
  parentDivClass: '',
  fullWidth: false,
  inputStyle: {},
  inputMode: 'text',
  errorTextClass: '',
  pattern: undefined,
  onKeyDown: () => { }
};

export default TextInput;
