import './homePage.css';

import React, { PureComponent } from 'react';

import Image from '../../components/Image';
import gladImg from './images/glad-img.svg';

class HomePage extends PureComponent {
    render() {

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

    openSelectStockpopup = () => {
        this.props.history.push('/add-stocks')
    }
}

export default HomePage;