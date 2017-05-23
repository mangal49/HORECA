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


import ReceiveOrder from './ReceiveOrder';
import Received from './Received'

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

class Receive extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 'ReceiveOrder',
            //invoiceAmount: "",
            //items: ['Click', 'To', 'Remove', 'An', 'Item'],
            showTabData: <ReceiveOrder />,
            on: false,
            transitionEnd: true,
            transitionName: 'tabOne',
        };
    }


    updateStyle(docked, width, height) {
        if (docked) {
            styles.container = { ...styles.container, top: '0px' };
            styles.tabs = { ...styles.tabs, 'paddingLeft': 0, width: width - 255 };
        } else {
            styles.container = { ...styles.container, top: '56px' };
            styles.tabs = { ...styles.tabs, 'paddingLeft': 0, width: '100%' };
        }
    }


    componentWillMount() {
        this.props.setRole('SHOP');
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
        if (view == 'ReceiveOrder' && this.state.on) {
            this.setState({
                on: false,
                transitionEnd: false,
                transitionName: 'tabTwo'
            });
        } else if (view == 'Received' && !this.state.on) {
            this.setState({
                on: true,
                transitionEnd: false,
                transitionName: 'tabOne'
            });
        }


    }


    handleTransitionEnd = () => {
        this.setState({ transitionEnd: true });
    }

    renderOff() {

        if (!this.state.on && this.state.transitionEnd) {
            return (
                <ReceiveOrder key="off" handleTransitionEnd={this.handleTransitionEnd} />
            )
        }
    }

    renderOn() {
        if (this.state.on && this.state.transitionEnd) {
            return (
                <Received key="on" handleTransitionEnd={this.handleTransitionEnd} />
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
                        tabItemContainerStyle={{
                        }}
                    >
                        <Tab label="รับสินค้า" value="ReceiveOrder"
                            onClick={() => { this.toggle('ReceiveOrder') }}
                            style={{
                                ...styles.tab,
                                //color: 'black'
                            }}
                        />
                        <Tab label={`รับแล้ว ${this.state.transitionName}`} value="Received"
                            onClick={() => { this.toggle('Received') }}
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

export default connect(mapStateToProps, actions)(Receive);
