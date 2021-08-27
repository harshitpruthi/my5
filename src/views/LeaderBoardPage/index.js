import './leaderBoardPage.css';

import React, { PureComponent } from 'react';

import Button from '../../components/Button';
import Image from '../../components/Image';
import { createSelection } from '../../utils/api';

class LeaderBoardPage extends PureComponent {
    state = {
        captainColor: '',
        jokerColor: '',
        neutralColor: '',
        captainSelectedIndex: null,
        jokerSelectedIndex: null,
        neutralSelectedIndex: null,
        isCaptain: {},
        isJoker: {},
        isNeutral: {},
    }

    render() {

        return (
            <div className="ssp66MainDiv">
                <div className="ssp66BelowDiv page-padding" style={{ display: 'flex', alignItems: 'center' }}>
                    <i className="material-icons" style={{ fontSize: 18, color: 'var(--constantWhite)' }} onClick={() => { this.props.history.goBack() }}>keyboard_backspace</i>
                </div>
                <div className="page-padding">
                    <div className="fs16 ssp66SelectTxt clrText">Ready to take the chance</div>
                    <div style={{ marginTop: 30 }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="ssp66CaptainDiv"><span className="clrGreen ssp66CaptainTxt absolute-center">c</span></div>
                            <div className="fs14 clrText" style={{ marginLeft: 20 }}>Optional 'Captain' tag to increase weightage on a gaining stock</div>
                        </div>
                    </div>
                    <div style={{ marginTop: 30 }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="ssp66WeakDiv"><span className="clrRed ssp66WTxt absolute-center">w</span></div>
                            <div className="fs14 clrText" style={{ marginLeft: 20 }}>Optional 'Weak-link' tag to increase shorting weightage on a losing stock</div>
                        </div>
                    </div>

                    <div style={{ marginTop: 30, marginBottom: 20, borderBottom: '1px solid var(--border)', paddingBottom: 20 }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="ssp66NeutralDiv"><span className="ssp66WTxt absolute-center" style={{ color: 'var(--growwYellow)' }}>n</span></div>
                            <div className="fs14 clrText" style={{ marginLeft: 20 }}>Default 'neutral' tag to keep standard weightage</div>
                        </div>
                    </div>

                    {
                        this.props.location.state.allStocksData.map((data, index) => {
                            return (
                                <div key={index} className="abcMainDiv">
                                    <div className="lbp754MainDiv" style={{ display: 'flex' }}>
                                        <div className="lbp754DivImg">
                                            <Image src={data?.header?.logoUrl} width={20} height={20} />
                                        </div>
                                        <div className="clrText lbp88DisplayName">{data?.header.displayName}</div>
                                    </div>
                                    <div>
                                        <div className="abcCaptainDiv" style={{ backgroundColor: this.state.captainSelectedIndex === index ? 'var(--growwRed)' : '' }} onClick={() => this.onCaptainClick(data.header.searchId, 'CAPTAIN', index)}><span className="fs12 clrText absolute-center">c</span></div>
                                        <div className="abcWeakDiv" style={{ backgroundColor: this.state.jokerSelectedIndex === index ? 'var(--primaryClr)' : '' }} onClick={() => this.onWeakLinkClick(data.header.searchId, 'JOKER', index)} ><span className="fs12 clrText absolute-center">w</span></div>
                                        <div className="abcNeutralDiv" style={{ backgroundColor: this.state.jokerSelectedIndex !== index && this.state.captainSelectedIndex !== index ? 'var(--growwYellow)' : '' }} onClick={() => this.onNeutralClick(data.header.searchId, 'Neutral', index)}><span className=" fs12 absolute-center clrText" >n</span></div>
                                    </div>
                                </div>
                            )
                        })
                    }


                    <div className="col s12 login121EnterButton">
                        <Button
                            buttonText="Submit To Play"
                            width="94%"
                            height="50px"
                            fontSize="16px"
                            onClick={this.onSubmitClick}
                            loadingText="Submit to Play"
                            fixToBottom
                        // isDisabled={!loginButtonEnabled}
                        />
                    </div>
                </div>
            </div>
        )
    }

    onCaptainClick = (searchId, type, selectIndex) => {
        this.setState({
            captainSelectedIndex: selectIndex,
            isCaptain: {
                searchId,
                type
            }
        })
    }

    onWeakLinkClick = (searchId, type, selectIndex) => {
        this.setState({
            jokerSelectedIndex: selectIndex,
            isJoker: {
                searchId,
                type
            }
        })
    }

    onNeutralClick = (searchId, type, selectIndex) => {
        this.setState({
            neutralSelectedIndex: selectIndex,
            isNeutral: {
                searchId,
                type
            }
        })
    }

    onSubmitClick = () => {
        const getEmailId = localStorage.getItem('emailId');
        let neutralData = {};
        let filteredData = [];

        const filterNeutral = this.props.location.state.allStocksData.filter(obj => {

            return obj.header.searchId !== this.state.isCaptain.searchId && obj.header.searchId !== this.state.isJoker.searchId;
        });

        filterNeutral.map((data) => {
            neutralData = {
                "searchId": data.header.searchId,
                "type": 'NEUTRAL'
            }

            filteredData.push(neutralData)
        })

        const selection = [
            {
                "searchId": this.state.isCaptain.searchId,
                "type": this.state.isCaptain.type
            },
            {
                "searchId": this.state.isJoker.searchId,
                "type": this.state.isJoker.type
            },
            ...filteredData
        ]

        createSelection(getEmailId, selection).then((res) => {
            console.log(res)
        })
    }
}

export default LeaderBoardPage