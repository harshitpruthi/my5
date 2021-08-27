import './selectStockPage.css';

import React, { PureComponent } from 'react';

import Button from '../../components/Button';

class SelectStockPage extends PureComponent {
    render() {

        return (
            <div className="ssp66MainDiv">
                <div className="ssp66BelowDiv page-padding" style={{ display: 'flex', alignItems: 'center' }}>
                    <i className="material-icons" style={{ fontSize: 18, color: 'var(--constantWhite)' }}>keyboard_backspace</i>
                    <div className="clrText" style={{ marginLeft: 10 }}>Select Stocks</div>
                </div>
                <div className="page-padding">
                    <div className="fs16 ssp66SelectTxt clrText">Select 5 stocks to compete tomorrow</div>
                    <div style={{ marginTop: 30 }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="ssp66CaptainDiv"><span className="clrGreen ssp66CaptainTxt absolute-center">C</span></div>
                            <div className="fs14 clrText" style={{ marginLeft: 20 }}>Optional 'Captain' tag to increase weightage on a gaining stock</div>
                        </div>
                    </div>
                    <div style={{ marginTop: 30 }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="ssp66WeakDiv"><span className="clrRed ssp66WTxt absolute-center">W</span></div>
                            <div className="fs14 clrText" style={{ marginLeft: 20 }}>Optional 'Weak-link' tag to increase shorting weightage on a losing stock</div>
                        </div>
                    </div>

                    <div className="absolute-center clrGreen fs16 fw500 ssp66SelectStock" onClick={this.openSelectStockpopup}>
                        <i className="material-icons ssp66AddIcon">add</i>Add 5 Stocks from NIFTY100
                    </div>

                    <div className="col s12 login121EnterButton">
                        <Button
                            buttonText="Submit To Play"
                            width="94%"
                            height="50px"
                            fontSize="16px"
                            onClick={() => { }}
                            loadingText="SUBMIT"
                            fixToBottom
                        // isDisabled={!loginButtonEnabled}
                        />
                    </div>
                </div>
            </div>
        )
    }

    openSelectStockpopup = () => {
        this.props.history.push('/add-stocks')
    }
}

export default SelectStockPage