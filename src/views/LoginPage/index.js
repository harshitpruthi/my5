import './loginPage.css';

import React from 'react';

import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { submitEmailForLogin } from '../../utils/api';

class LoginPage extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            emailId: '',
            errorMessage: '',
            password: '',
            passwordHidden: true,
        }
    }

    render() {

        const { emailId, errorMessage, passwordHidden, password } = this.state;
        const loginButtonEnabled = this.isValidPassword();

        return (
            <div className="page-padding" style={{ background: '#121212', height: '100vh' }}>
                <div className="absolute-center ls77MainDiv">
                    <h1 className="ls77MainHead">My<span className="ls77Two">5</span></h1>
                </div>

                <div className="col s12 login121ManualEmailInput"
                    onClick={this.showEnterEmailScreen}
                >
                    <TextInput
                        isMaterialUI={true}
                        label="EMAIL ADDRESS"
                        id="login_email1"
                        value={emailId}
                        onInput={this.onEmailInput}
                        showError={errorMessage === '' ? false : true}
                        errorText={errorMessage}
                        onEnterPress={this.onEmailNextClick}
                        fontSize="15px"
                    />
                </div>
                <div className="col s12 login121Password">
                    <span className="login121ShowHide"
                        onClick={this.onShowHidePasswordClick}
                    >
                        <i className={`material-icons ${passwordHidden ? 'visibility' : 'visibility_off'}`}
                            style={{ fontSize: 22 }}
                        />
                    </span>
                    <TextInput
                        isMaterialUI={true}
                        label='ENTER PASSWORD'
                        id="login_password1"
                        inputType={passwordHidden ? 'password' : 'text'}
                        value={password}
                        onInput={this.onPasswordInput}
                        showError={errorMessage === '' ? false : true}
                        errorText={errorMessage}
                        onEnterPress={this.onPasswordNextClick}
                        fontSize="15px"
                    />
                </div>

                <div className="col s12 login121EnterButton">
                    <Button
                        buttonText="SUBMIT"
                        width="100%"
                        height="50px"
                        fontSize="16px"
                        onClick={this.onPasswordNextClick}
                        loadingText="SUBMIT"
                        isDisabled={!loginButtonEnabled}
                    />
                </div>
            </div>
        )
    }

    onEmailInput = (e) => {
        this.setState({
            emailId: (e.target.value).trim(),
            errorMessage: ''
        });
    }


    onShowHidePasswordClick = () => {
        this.setState(prevState => ({
            passwordHidden: !prevState.passwordHidden
        }), () => {
            // focus on password TextInput after toggling visbility
            this.onInputFocus();
        });
    }

    onInputFocus = () => {
        document.getElementById('login_password1').focus();
    }

    onPasswordInput = e => {
        this.setState({
            password: e.target.value,
            errorMessage: ''
        });
    }

    isValidPassword() {
        const { password } = this.state;

        // for existing user if they have created a password in the past,
        // without new limits of password length greater that 8 characters
        if (password?.length >= 6) {
            return true;

        } else if (password?.length >= 8) {
            // for new users, password should always be greater than 8 characters
            return true;

        } else {
            return false;
        }
    }


    onPasswordNextClick = () => {
        const { password, emailId } = this.state;

        submitEmailForLogin(emailId, password).then((res) => {
            if (res.status === 200) {
                localStorage.setItem('emailId', emailId);
                this.props.history.push('/home')
            }
        }).catch((err) => {
            // if (err.response.status === 404) {
            //     this.props.history.push('/home')
            // }
        })
    }
}

export default LoginPage;