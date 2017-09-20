import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Tabs, Tab } from 'material-ui/Tabs';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

// import {
//     blue300,
//     indigo900,
//     orange200,
//     deepOrange300,
//     pink400,
//     purple500,
//     grey500,
//     deepOrange700,
//     grey50
// } from 'material-ui/styles/colors';

import CatalogList from './CatalogList';
import OrderList from './OrderList';

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
        fontSize: '16px',
    },
};

class Catalog extends React.Component {
    state = {
        transitionEnd: true,
        numberOfPieces: "",
    }

    constructor(props) {
        super(props);
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

    updateShowNumberOfPieces(amount) {
        if (amount > 0) this.setState({ numberOfPieces: ` (${amount})` });
        else this.setState({ numberOfPieces: `` });
    }

    componentWillMount() {
        this.props.showCartBalance();
        this.updateStyle(this.props.docked, this.props.width, this.props.height);
        this.updateShowNumberOfPieces(this.props.allOrder.length);
        this.setState({
            value: this.props.showTab.value,
            on: this.props.showTab.on,
            transitionName: this.props.showTab.transitionName,
        });
    }

    componentWillReceiveProps(nextProps, nextState) {
        this.updateStyle(nextProps.docked, nextProps.width, nextProps.height);
        this.updateShowNumberOfPieces(nextProps.allOrder.length);
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
        if (view == 'CatalogList' && this.state.on != 1 /*&& this.state.on*/) {
            this.props.showMenuTabCatalog();
            this.setState({
                on: 1,
                transitionEnd: false,
                transitionName: 'tabTwo'
            });
        } else if (view == 'FavoriteList' && this.state.on != 2 /*&& !this.state.on*/) {
            this.props.showMenuTabFavorite();
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
        } else if (view == 'OrderList' && this.state.on != 3 /*&& !this.state.on*/) {
            this.props.showMenuTabCatalog();
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
                <CatalogList key="off" handleTransitionEnd={this.handleTransitionEnd} favorite={false} />
            )
        }
    }

    render_Tab2() {
        if (this.state.on == 2 && this.state.transitionEnd) {
            return (
                <CatalogList key="on" handleTransitionEnd={this.handleTransitionEnd} favorite={true} />
            )
        }
    }

    render_Tab3() {
        if (this.state.on == 3 && this.state.transitionEnd) {
            return (
                <OrderList key="on" handleTransitionEnd={this.handleTransitionEnd} />
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
                        <Tab label="สินค้า" value="CatalogList"
                            onClick={() => { this.toggle('CatalogList') }}
                            style={styles.tab}
                        />
                        <Tab label="รายการโปรด" value="FavoriteList"
                            onClick={() => { this.toggle('FavoriteList') }}
                            style={styles.tab}
                        />
                        <Tab label={`สั่งซื้อ${this.state.numberOfPieces}`} value="OrderList"
                            onClick={() => { this.toggle('OrderList') }}
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
        showTab: state.shop.showTab,
    }
}

Catalog.defaultProps = {
    value: 'CatalogList',
    on: 1,
    transitionName: 'tabOne',
};

export default connect(mapStateToProps, actions)(Catalog);
