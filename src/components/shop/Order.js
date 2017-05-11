import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { StickyContainer, Sticky } from 'react-sticky';

import { Tabs, Tab } from 'material-ui/Tabs';

import RaisedButton from 'material-ui/RaisedButton';
import Save from 'material-ui/svg-icons/content/save';

import ReactCSSTransitionGroup from "react-addons-css-transition-group";

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
};

class Order extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 'orderList',
            invoiceAmount: "",
            items: ['Click', 'To', 'Remove', 'An', 'Item'],
            showTabData: <OrderList />,
            on: false,
            transitionEnd: true,
            transitionName: 'orderList',
        };
    }


    updateStyle(docked, width, height, page) {
        let footerHeight = 0;
        if (page == 'orderList') footerHeight = 0;
        else {
            if (docked) footerHeight = 38 - 55;
            else footerHeight = 44 - 55;
        }
        if (docked) {
            styles.container = { ...styles.container, top: '0px' };
            styles.tabs = { ...styles.tabs, 'paddingLeft': 0, width: width - 255 };
            styles.Scrollbars = { ...styles.Scrollbars, height: height - 110 - footerHeight };
        } else {
            styles.container = { ...styles.container, top: '56px' };
            styles.tabs = { ...styles.tabs, 'paddingLeft': 0, width: '100%' };
            styles.Scrollbars = { ...styles.Scrollbars, height: height - 160 - footerHeight };
        }
    }

    updateShowInvoiceAmount(amount) {
        if (amount > 0) this.setState({ invoiceAmount: ` (${amount})` });
        else this.setState({ invoiceAmount: `` });
    }

    componentWillMount() {
        this.props.setRole('SHOP');
        this.updateStyle(this.props.docked, this.props.width, this.props.height, this.props.value);
        this.updateShowInvoiceAmount(this.props.invoiceOrder.length);
    }

    componentWillReceiveProps(nextProps, nextState) {
        this.updateStyle(nextProps.docked, nextProps.width, nextProps.height, nextState.value);
        this.updateShowInvoiceAmount(nextProps.invoiceOrder.length);
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        this.updateStyle(nextProps.docked, nextProps.width, nextProps.height, nextState.value);
        return true;
    }

    handleChange = (value) => {
        this.setState({
            value: value,
        });
    };

    toggle = (view) => {
        if (view == 'orderList' && this.state.on) {
            this.setState({
                on: false,
                transitionEnd: false,
                transitionName: 'invoiceList'
            });
        } else if (view == 'invoiceList' && !this.state.on) {
            this.setState({
                on: true,
                transitionEnd: false,
                transitionName: 'orderList'
            });
        }
    }

    handleTransitionEnd = () => {
        this.setState({ transitionEnd: true });
    }

    renderOff() {
        if (!this.state.on && this.state.transitionEnd) {
            return (
                <OrderList key="off" handleTransitionEnd={this.handleTransitionEnd} />
            )
        }
    }

    renderOn() {
        if (this.state.on && this.state.transitionEnd) {
            return (
                <InvoiceList key="on" handleTransitionEnd={this.handleTransitionEnd} />
            )
        }
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
                            onClick={() => { this.toggle('orderList') }}
                            style={{
                                ...styles.tab,
                                //color: 'black'
                            }}
                        />
                        <Tab label={`รายการที่สั่งซื้อ${this.state.invoiceAmount}`} value="invoiceList"
                            onClick={() => { this.toggle('invoiceList') }}
                            style={{
                                ...styles.tab,
                                //color: 'black'
                            }}
                        />
                    </Tabs>
                    <ReactCSSTransitionGroup
                        transitionName={this.state.transitionName}
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}
                    >
                        {this.renderOn()}
                        {this.renderOff()}
                    </ReactCSSTransitionGroup>
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
        invoiceOrder: state.shop.invoiceOrder,
    }
}

export default connect(mapStateToProps, actions)(Order);
