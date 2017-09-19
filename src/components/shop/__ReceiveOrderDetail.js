import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


import { Tabs, Tab } from 'material-ui/Tabs';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Back from 'material-ui/svg-icons/hardware/keyboard-arrow-left';

import Loading from '../Loading';
import { Scrollbars } from 'react-custom-scrollbars';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";


import MobileTearSheet from './MobileTearSheet';
import { List, ListItem } from 'material-ui/List';


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

const styles = {
    container: {
        position: 'relative',
        top: '0px',
    },
    content: {
        position: 'relative',
        top: 0,
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
        //textAlign: 'center',
        zIndex: 700,
        // paddingLeft: '25%',
        overflowX: 'hidden',
        top: '30px'
    },
    div: {
        position: 'relative',//relative,absolute
        width: '100%',
        textAlign: 'center',
        zIndex: 600,
    },
    labelColor: {
        color: 'white'
    }
};



class ReceiveOrderDetail extends React.Component {

    state = {
        showCol: 4,
        showTileData: [],
        open: false,
        loading: true,
        orderObj: []
    }


    updateStyle(docked, width, height) {
        if (docked) {
            styles.container = { ...styles.container, top: '0px' };
            styles.tabs = { ...styles.tabs, 'paddingLeft': 0, width: width - 255 };
            styles.Scrollbars = { ...styles.Scrollbars, height: height - 110 };

            styles.divList = { ...styles.divList, /*width: '50%', paddingLeft: '25%',*/ top: '30px' };

        } else {
            styles.container = { ...styles.container, top: '56px' };
            styles.tabs = { ...styles.tabs, 'paddingLeft': 0, width: '100%' };
            styles.Scrollbars = { ...styles.Scrollbars, height: height - 160 };
            styles.divList = { ...styles.divList, width: '100%', paddingLeft: '0%', top: '0px' };
        }
    }
    componentWillMount() {
        this.props.setRole('SHOP');
        this.updateStyle(this.props.docked, this.props.width, this.props.height);
        this.setState({
            showTileData: this.props.tilesData,
            orderObj: this.props.orderObj,
        });
    }
    componentDidMount() {
        //setTimeout(() => { this.setState({ loading: false }); }, 11500);
        console.log("Test  " + this.state.orderObj.id);

    }
    componentWillReceiveProps(nextProps, nextState) {
        this.updateStyle(nextProps.docked, nextProps.width, nextProps.height);
    }

    render() {

        // console.log(this.props.selectOrder);

        return (
            <div style={styles.container}>
                <div style={styles.tabs}>
                    <AppBar style={{ height: "48px" }}
                        iconElementLeft={<Link to={'/shop/receive'} > <FlatButton label="Back" labelStyle={styles.labelColor} /> </Link>}
                    >
                    </AppBar>

                    <Scrollbars
                        style={styles.Scrollbars}
                    >
                        <div style={styles.divList}>

                            <MobileTearSheet>
                                {/*<List
                                    style={{ textAlign: 'center', }}
                                >
                                    {this.props.orderObj.map((item, index) => {
                                        return (
                                            <div key={index}>
                                                <ListItem
                                                    leftAvatar={<Avatar src={item.img} size={80} style={styles.avatar} />}
                                                    style={{ height: 65 }}
                                                    disabled={true}
                                                >
                                                    <div style={styles.divContent}>
                                                        <div style={{
                                                            textAlign: 'left',
                                                            marginLeft: 35,
                                                            marginTop: 10,
                                                            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                                            width: '100%'
                                                        }}
                                                        >
                                                            {item.title}
                                                        </div>
                                                        <div style={{
                                                            color: lightBlack,
                                                            textAlign: 'left',
                                                            marginLeft: 35,
                                                            marginTop: 5,
                                                            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                                            width: '100%'
                                                        }}
                                                        >
                                                            {item.author}
                                                        </div>
                                                    </div>
                                                    <div style={styles.divAmount}>
                                                        <IconButton
                                                            style={{ float: 'right', marginRight: 0, marginTop: 5 }}
                                                        >
                                                            <Add
                                                                color="green"
                                                                style={{ ...styles.Icon }}
                                                                onTouchTap={this.handleOpen}
                                                                viewBox="0 0 24 24"
                                                            />
                                                        </IconButton>
                                                        <TextField
                                                            defaultValue={item.amount}
                                                            floatingLabelText="จำนวน"
                                                            style={{ width: 40, float: 'right', marginTop: -20, marginRight: -5 }}
                                                            inputStyle={{
                                                                textAlign: 'center'
                                                            }}
                                                        />
                                                        <IconButton
                                                            style={{ float: 'right', marginRight: -5, marginTop: 5 }}
                                                        >
                                                            <Remove
                                                                color="red"
                                                                style={styles.Icon}
                                                                onTouchTap={this.handleOpen}
                                                            />
                                                        </IconButton>
                                                        <div
                                                            style={styles.divLine}
                                                        >
                                                            &nbsp;
                                                            </div>
                                                    </div>
                                                </ListItem>
                                                <Divider style={{ width: '100%' }} />
                                            </div>
                                        );
                                    })}
                                </List>*/}
                            </MobileTearSheet>
                        </div>

                    </Scrollbars>

                </div>
            </div>



        );
    }
}

//หากมีการเรียกใช้ Props จาก Redux ให้ mapStateToProps ด้วย
function mapStateToProps(state) {
    return {
        width: state.navLeftMenu.width,
        docked: state.navLeftMenu.docked,
        role: state.auth.role,
        tilesData: state.shop.tilesData,
        invoiceOrder: state.shop.invoiceOrder,
        orderObj: state.shop.orderObj,
        height: state.navLeftMenu.height
    }
}

export default connect(mapStateToProps, actions)(ReceiveOrderDetail);
