import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Tabs, Tab } from 'material-ui/Tabs';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import SaleOrderHistory from './SaleOrderHistory';
import InvoiceHistory from './InvoiceHistory';
import DeliveredHistory from './DeliveredHistory';

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
        fontSize: '14px',
    },
};

class Order extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 'SaleOrderHistory',
            on: 1,
            transitionEnd: true,
            transitionName: 'tabOne', // This is a CSS name
        };
    }


    updateStyle(docked, width, height) {
        if (docked) {
            //styles.container = { ...styles.container, top: '0px' };
            styles.container = { ...styles.container, top: '56px' };
            styles.tabs = { ...styles.tabs, 'paddingLeft': 0, width: width - 255 };
        } else {
            styles.container = { ...styles.container, top: '56px' };
            styles.tabs = { ...styles.tabs, 'paddingLeft': 0, width: '100%' };
        }
    }

    componentWillMount() {
        this.props.notShowCartBalance();
        this.updateStyle(this.props.docked, this.props.width, this.props.height);
    }

    componentWillReceiveProps(nextProps, nextState) {
        this.updateStyle(nextProps.docked, nextProps.width, nextProps.height);
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        this.updateStyle(nextProps.docked, nextProps.width, nextProps.height);
        return true;
    }

    handleChange = (value) => {
        this.setState({
            value: value,
        });
    };

    toggle = (view) => {
        if (view == 'SaleOrderHistory' && this.state.on != 1 /*&& this.state.on*/) {
            this.setState({
                on: 1,
                transitionEnd: false,
                transitionName: 'tabTwo'
            });
        } else if (view == 'InvoiceHistory' && this.state.on != 2 /*&& !this.state.on*/) {
            if (this.state.on == 1) {
                this.setState({
                    on: 2,
                    transitionEnd: false,
                    transitionName: 'tabOne'
                });
            } else if (this.state.on == 3) {
                this.setState({
                    on: 2,
                    transitionEnd: false,
                    transitionName: 'tabTwo'
                });
            }
        } else if (view == 'DeliveredHistory' && this.state.on != 3 /*&& !this.state.on*/) {
            this.setState({
                on: 3,
                transitionEnd: false,
                transitionName: 'tabOne'
            });
        }
    }

    handleTransitionEnd = () => {
        this.setState({ transitionEnd: true });
    }

    render_Tab1() {
        if (this.state.on == 1 && this.state.transitionEnd) {
            return (
                <SaleOrderHistory key="off" handleTransitionEnd={this.handleTransitionEnd} />
            )
        }
    }

    render_Tab2() {
        if (this.state.on == 2 && this.state.transitionEnd) {
            return (
                <InvoiceHistory key="on" handleTransitionEnd={this.handleTransitionEnd} />
            )
        }
    }

    render_Tab3() {
        if (this.state.on == 3 && this.state.transitionEnd) {
            return (
                <DeliveredHistory key="on" handleTransitionEnd={this.handleTransitionEnd} />
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
                        <Tab label="Sale Order" value="SaleOrderHistory"
                            onClick={() => { this.toggle('SaleOrderHistory') }}
                            style={styles.tab}
                        />
                        <Tab label="Invoice" value="InvoiceHistory"
                            onClick={() => { this.toggle('InvoiceHistory') }}
                            style={styles.tab}
                        />
                        <Tab label="Delivered" value="DeliveredHistory"
                            onClick={() => { this.toggle('DeliveredHistory') }}
                            style={styles.tab}
                        />
                    </Tabs>
                    <ReactCSSTransitionGroup
                        transitionName={this.state.transitionName}
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}
                    >
                        {this.render_Tab1()}
                        {this.render_Tab2()}
                        {this.render_Tab3()}
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
        allOrder: state.shop.allOrder,
    }
}

export default connect(mapStateToProps, actions)(Order);
