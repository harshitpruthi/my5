import './addStocksPage.css';

import React, { PureComponent } from 'react';

import Button from '../../components/Button';
import Image from '../../components/Image';
import Toastify from '../../components/Toastify';
import {
  getAllStocks,
  getPriceforBatch,
} from '../../utils/api';

class AddStocksPage extends PureComponent {
    toastifyRef = React.createRef();

    constructor(props) {
        super(props)

        this.state = {
            allStocks: [],
            stocksList: [],
            testArr: [],
            dummy: false
        }
    }

    componentDidMount() {
        getAllStocks().then((res) => {
            this.setState({
                allStocks: res?.data.childAssets
            }, () => {

                const nseCodes = [];

                this.state.allStocks?.forEach(peer => {
                    if (peer.header?.nseScriptCode) {
                        nseCodes.push(peer.header?.nseScriptCode);

                    }
                });

                getPriceforBatch(nseCodes).then((res) => {

                })
            })
        })
    }

    render() {
        const { allStocks } = this.state;

        return (
            <div className="asp88MainDiv">
                <div className="asp88BelowDiv page-padding" style={{ display: 'flex', alignItems: 'center' }}>
                    <i className="material-icons" style={{ fontSize: 18, color: 'var(--constantWhite)' }} onClick={() => { this.props.history.goBack() }}>keyboard_backspace</i>
                    {/* <div className="clrText" style={{ marginLeft: 10 }}>Add Stocks</div> */}
                </div>
                <div className="page-padding">
                    <div className="fs16 asp88SelectTxt clrText">Select 5 stocks to compete tomorrow</div>
                </div>

                <div style={{ height: '75vh', overflow: 'auto' }}>
                    {
                        allStocks && allStocks.map((data, index) => {

                            return (
                                <div key={data.header.isin} className="asp88DisplayNameDiv">
                                    <div style={{ display: 'flex' }}>
                                        <div className="mvc754DivImg">
                                            <Image src={data?.header?.logoUrl} width={40} height={40} />
                                        </div>
                                        <div className="clrText asp88DisplayName">{data?.header.displayName}</div>
                                    </div>

                                    <ul>
                                        <li key={index}>
                                            <div className="toppings-list-item">
                                                <div className="left-section">
                                                    <input
                                                        type="checkbox"
                                                        id={`custom-checkbox-${index}`}
                                                        name={data.header.searchId}
                                                        value={data.header.searchId}
                                                        onInput={() => this.onChangeBtn(data)}
                                                    />
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="col s12 login121EnterButton">
                    <Button
                        buttonText="PROCEED"
                        width="94%"
                        height="50px"
                        fontSize="16px"
                        onClick={this.onProceedClick}
                        loadingText="SUBMIT"
                        fixToBottom
                        isDisabled={this.state.testArr.length > 5 ? true : false}
                    />
                </div>

                <Toastify
                    ref={this.toastifyRef}
                    msgType='ERROR'
                    msg='You have selected more than 5 stocks'
                    timeOut={8000}
                />
            </div>
        )
    }

    onChangeBtn = (data) => {
        if (this.state.stocksList.length < 5) {
            this.state.stocksList.push(data);

            this.setState({
                testArr: this.state.stocksList
            }, () => {
                // console.log(this.state.testArr)
            })

        } else {
            this.toastifyRef.current.open('You have selected more than 5 stocks')
        }
    }


    onProceedClick = () => {
        // const userEmail = localStorage.getItem('emailId');
        // createSelection(userEmail).then((res) => {
        //     console.log(res)
        // })
        this.props.history.push({
            pathname: '/leaderboard',
            state: { allStocksData: this.state.testArr }
        });
    }
}

export default AddStocksPage;