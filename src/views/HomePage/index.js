import './homePage.css';

import React, { PureComponent } from 'react';

import Button from '../../components/Button';
import Image from '../../components/Image';
import { getLeaderBoard } from '../../utils/api';
import gladImg from './images/glad-img.svg';
import ProfileIcon from './ProfileIcon';

const imageArr = [
    'https://assets-netstorage.groww.in/stock-assets/logos/INE002A01018.png',
    'https://assets-netstorage.groww.in/stock-assets/logos/INE467B01029.png',
    'https://assets-netstorage.groww.in/stock-assets/logos/INE040A01034.png',
    'https://assets-netstorage.groww.in/stock-assets/logos/INE009A01021.png',
    'https://assets-netstorage.groww.in/stock-assets/logos/INE030A01027.png'
]

class HomePage extends PureComponent {

    state = {
        leaderBoardData: [],
        loading: true
    }

    componentDidMount() {
        getLeaderBoard().then((res) => {
            this.setState({
                leaderBoardData: res.data.leaderBoard,
                loading: false
            })
        })
    }

    render() {
        const { leaderBoardData } = this.state;

        if (this.state.loading) {
            return <div></div>
        }

        if (leaderBoardData.length === 0 && !this.state.loading) {
            return (
                <>
                    <div className="absolute-center" style={{ flexDirection: 'column', marginTop: 200 }}>
                        <Image src={gladImg} width={200} height={200} />
                        <div className="clrText fs20" style={{ marginTop: 20 }}>Glad you could make it</div>
                        <div className="absolute-center clrGreen fs16 fw500 ssp88SelectStock" onClick={this.openSelectStockpopup}>
                            <i className="material-icons ssp88AddIcon">add</i>Add 5 Stocks from NIFTY100
                        </div>

                    </div>
                </>
            )
        }

        return (
            <>
                <div className="absolute-center ls7MainDiv">
                    <h1 className="ls7MainHead">My<span className="ls7Two">5</span></h1>
                </div>
                <div className="page-padding">
                    <h2 style={{ marginTop: 30 }} className="clrGreen fs16">This Week's LeaderBoard</h2>

                    {
                        leaderBoardData && leaderBoardData.map((data, index) => {
                            return (
                                <div key={index} style={{ padding: '20px 0px', borderBottom: '1px solid var(--border)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div className="pr11ImageWidth">
                                            <ProfileIcon
                                                userImg=''
                                                userName={data.emailId}
                                                isLoading={false}
                                                className="pr11Image"
                                                height={35}
                                                width={35}
                                            />
                                            <div className="clrText fs16" style={{ marginLeft: 10 }}>{data.emailId}</div>
                                        </div>

                                        <div className="clrText">
                                            {data.score.toFixed(2)}%
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', marginLeft: 50 }}>
                                        {
                                            imageArr.map((img, index) => {
                                                return (
                                                    <div key={index} style={{ marginRight: 10 }}>
                                                        <Image src={img} width={20} height={20} />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }

                    <div className="col s12 login121EnterButton">
                        <Button
                            buttonText="Prepare for next battle"
                            width="94%"
                            height="50px"
                            fontSize="16px"
                            onClick={() => { this.props.history.push('/add-stocks') }}
                            loadingText="SUBMIT"
                            fixToBottom
                        />
                    </div>
                </div>
            </>
        )

    }

    openSelectStockpopup = () => {
        this.props.history.push('/add-stocks')
    }
}

export default HomePage;