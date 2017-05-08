import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { StickyContainer, Sticky } from 'react-sticky';

import { Tabs, Tab } from 'material-ui/Tabs';
import { Scrollbars } from 'react-custom-scrollbars';



import {
    blue300,
    indigo900,
    orange200,
    deepOrange300,
    pink400,
    purple500,
    grey500,
    deepOrange700,
    grey50
} from 'material-ui/styles/colors';

import OrderList from './OrderList';
import InvoiceList from './InvoiceList';
import SearchBar from '../SearchBar';

const styles = {
    container: {
        position: 'relative',//relative,absolute
        top: '0px',
        width: '100%',
    },
    tabs: {
        position: 'fixed',
        width: '100%',
        zIndex: 900,
    },
    tab: {
        fontSize: '17px',
    },
    Scrollbars: {
        height: 0,
    },
    divList: {
        position: 'relative',//relative,absolute
        width: '100%',
        textAlign: 'center',
        zIndex: 700,
    },
    div: {
        position: 'relative',//relative,absolute
        width: '100%',
        textAlign: 'center',
        zIndex: 600,
    },
};

class Order extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 'orderList',
        };
    }

    updateStyle(docked, width, height) {
        if (docked) {
            styles.container = { ...styles.container, top: '0px' };
            styles.tabs = { ...styles.tabs, 'paddingLeft': 0, width: width - 255 };
            styles.Scrollbars = { ...styles.Scrollbars, height: height - 110 };
        } else {
            styles.container = { ...styles.container, top: '56px' };
            styles.tabs = { ...styles.tabs, 'paddingLeft': 0, width: '100%' };
            styles.Scrollbars = { ...styles.Scrollbars, height: height - 160 };
        }
    }

    componentWillMount() {
        this.props.setRole('SHOP');
        this.updateStyle(this.props.docked, this.props.width, this.props.height);
    }

    componentWillReceiveProps(nextProps, nextState) {
        this.updateStyle(nextProps.docked, nextProps.width, nextProps.height);
    }

    handleChange = (value) => {
        this.setState({
            value: value,
        });
    };

    changeView = () => {
        let view = null;
        if (this.state.value == 'orderList') {
            view = <OrderList />;
        } else {
            view = <InvoiceList />;
        }
        return view;
    }

    render() {

        return (
            <div style={styles.container}>

                <div style={styles.tabs}>
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        //inkBarStyle={{ backgroundColor: '#BDBDBD', }}
                        tabItemContainerStyle={{
                            //backgroundColor: '#FFF',
                        }}
                    >
                        <Tab label="รายการสินค้า" value="orderList"
                            style={{
                                ...styles.tab,
                                //color: 'black'
                            }}
                        />
                        <Tab label="รายการที่สั่งซื้อ" value="invoiceList"
                            style={{
                                ...styles.tab,
                                //color: 'black'
                            }}
                        />
                    </Tabs>

                    <SearchBar />
                    <div style={{ backgroundColor: '#FFF' /*'#F5F5F5'*/ }}>
                        <Scrollbars
                            style={styles.Scrollbars}
                        >
                            <div style={styles.divList}>
                                <div style={styles.div} id='detail' ref='detail'>
                                    {this.changeView()}
                                </div>
                            </div>
                        </Scrollbars>
                    </div>

                </div>
            </div >
        );
    }
}
function mapStateToProps(state) {
    return {
        role: state.auth.role,
        width: state.navLeftMenu.width,
        height: state.navLeftMenu.height,
        open: state.navLeftMenu.open,
        docked: state.navLeftMenu.docked,
    }
}

export default connect(mapStateToProps, actions)(Order);
