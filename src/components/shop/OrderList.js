import React from 'react';
import Loading from '../Loading';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import MobileTearSheet from './MobileTearSheet';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';

import IconButton from 'material-ui/IconButton';
import Add from 'material-ui/svg-icons/content/add-circle';
import Remove from 'material-ui/svg-icons/content/remove-circle';
import NoteAdd from 'material-ui/svg-icons/action/note-add';

import TextField from 'material-ui/TextField';
import { Scrollbars } from 'react-custom-scrollbars';

import RaisedButton from 'material-ui/RaisedButton';
import Save from 'material-ui/svg-icons/content/save';

import Toggle from 'material-ui/Toggle';

import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors';

import DialogOrderDescription from './DialogOrderDescription'

const styles = {
    Scrollbars: {
        height: 0,
    },
    divContent: {
        position: 'relative',//relative,absolute
        width: '100%',
        textAlign: 'center',
        zIndex: 700,
        overflowX: 'hidden',
    },
    Icon: {
        cursor: 'pointer',
    },
    avatar: {
        marginLeft: 20,
    },
    divSKU: {
        float: 'left',
        width: '50%',
        marginTop: -20,
        marginLeft: 25,
    },
    divAmount: {
        float: 'right',
        width: '40%',
        marginRight: 10
    },
    divBalance: {
        color: lightBlack,
        fontSize: '14px',
        right: 32 + 10,
        bottom: 10,
        position: 'absolute',
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
    }
};

class OrderList extends React.Component {
    state = {
        serviceCharge: false,
        dialogOpen: false,
    }
    constructor(props) {
        super(props);
    }
    handleOpenDialog = () => {
        this.setState({ dialogOpen: true });
    };
    handleCloseDialog = () => {
        this.setState({ dialogOpen: false });
    };
    updateStyle(docked, width, height) {
        if (docked) {
            let footerHeight = 38 - 55;
            styles.Scrollbars = { ...styles.Scrollbars, height: height - 163 - footerHeight };
            styles.avatar = { ...styles.avatar, marginLeft: 20, };

            styles.divSKU = { ...styles.divSKU, marginLeft: 25, /*width: '50%',*/ };
            styles.divAmount = { ...styles.divAmount, marginRight: 10, width: '40%', };
            styles.divBalance = { ...styles.divBalance, right: 32 + 10 };
        } else {
            let footerHeight = 44 - 55;
            styles.Scrollbars = { ...styles.Scrollbars, height: height - 157 - footerHeight };
            styles.avatar = { ...styles.avatar, marginLeft: -15, };

            styles.divSKU = { ...styles.divSKU, marginLeft: -10, /*width: '50%',*/ };
            styles.divAmount = { ...styles.divAmount, marginRight: -20, width: '50%', };
            styles.divBalance = { ...styles.divBalance, right: 32 - 20 };
        }
    }
    componentWillMount() {
        this.updateStyle(this.props.docked, this.props.width, this.props.height);
    }
    componentWillReceiveProps(nextProps, nextState) {
        this.updateStyle(nextProps.docked, nextProps.width, nextProps.height);
    }
    componentDidMount() {
        // setTimeout(() => { this.setState({ loading: false }); }, 500);
        // alert(this.refs.divBalance.offsetWidth);
    }
    componentWillUnmount() {
        this.props.handleTransitionEnd();
    }
    updateOrder(e, sku) {
        // const re = /[0-9:]+/g;
        // if (!re.test(e.key) && (e.keyCode !== 8 && e.keyCode !== 46)) {
        //     e.preventDefault();
        // } else {
        //     alert(e.target.value);
        //     this.props.updateOrder(sku, "REPLACE", e.target.value);
        // }
        if (Number(e.target.value) > Number(sku.qty_available)) {
            alert("สินค้ามีจำนวน " + sku.qty_available.toLocaleString() + " " + sku.sku_unit);
            this.props.updateOrder(sku, "REPLACE", sku.qty_available);
        } else {
            this.props.updateOrder(sku, "REPLACE", e.target.value);
        }
    }
    addOrder = (sku) => {
        if ((Number(sku.order_amount) + 1) > Number(sku.qty_available)) {
            alert("สินค้ามีจำนวน " + sku.qty_available.toLocaleString() + " " + sku.sku_unit);
        } else {
            this.props.updateOrder(sku, "UPDATE", 1);
        }
    }
    removeOrder = (sku) => {
        this.props.updateOrder(sku, "UPDATE", -1);
    }
    handleFocus = (e) => {
        e.target.select();
    }

    render() {
        return (
            <div>
                <div style={{ backgroundColor: '#FFF' /*'#F5F5F5'*/ }}>
                    <Scrollbars
                        style={styles.Scrollbars}
                    >
                        <div style={styles.divContent}>
                            <MobileTearSheet>
                                <List
                                    style={{ textAlign: 'center', }}
                                >
                                    {this.props.allOrder.map((item, index) => {
                                        let showService = item.service_price > 0 && <div style={{
                                            color: lightBlack,
                                            fontSize: '11px',
                                            textAlign: 'left', width: '100%',
                                            marginLeft: 10, marginTop: 8,
                                            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                        }}
                                        >
                                            Slice Shabu 10Kg. , Steak 5Kg.
                                        </div>
                                        return (
                                            <div key={index}>
                                                <ListItem
                                                    leftAvatar={
                                                        <div>
                                                            <Avatar src={item.img} size={60} style={styles.avatar} />
                                                            <IconButton
                                                                style={{
                                                                    position: 'absolute',
                                                                    padding: 0,
                                                                    bottom: 0,
                                                                    width: 22,
                                                                    height: 27,
                                                                    background: 'white',
                                                                    right: 0,
                                                                }}
                                                            >
                                                                <NoteAdd
                                                                    onTouchTap={this.handleOpenDialog}
                                                                    color={'black'}
                                                                    hoverColor="gold"
                                                                    style={{
                                                                        cursor: 'pointer',
                                                                        fontSize: 5,
                                                                    }}
                                                                    size={10}
                                                                />
                                                            </IconButton>
                                                        </div>
                                                    }
                                                    style={{ height: 50 }}
                                                    disabled={true}
                                                >
                                                    <div style={styles.divSKU}>
                                                        <div style={{
                                                            textAlign: 'left', width: '100%',
                                                            marginLeft: 10, marginTop: 10, fontSize: 13,
                                                            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                                        }}
                                                        >
                                                            {item.sku_name}
                                                        </div>
                                                        <div style={{
                                                            color: lightBlack, fontSize: '12px',
                                                            textAlign: 'left', width: '100%',
                                                            marginLeft: 10, marginTop: 10,
                                                            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                                        }}
                                                        >
                                                            {item.sku_price.toLocaleString()} บาท / {item.sku_unit}
                                                        </div>
                                                        {showService}
                                                    </div>
                                                    <div style={styles.divAmount}>
                                                        <div style={{ marginTop: -10 }} >
                                                            <IconButton
                                                                style={{ float: 'right', marginRight: 0, marginTop: 5 }}
                                                                onTouchTap={(e) => { this.addOrder(item) }}
                                                            >
                                                                <Add
                                                                    style={{ ...styles.Icon }}
                                                                    color="green"
                                                                    onTouchTap={this.handleOpen}
                                                                    viewBox="0 0 24 24"
                                                                />
                                                            </IconButton>
                                                            <TextField
                                                                value={item.order_amount.toLocaleString()}
                                                                floatingLabelText={"จำนวน(" + item.sku_unit + ")"}
                                                                floatingLabelStyle={{ fontSize: 12 }}
                                                                style={{ width: 40, float: 'right', marginTop: -20, marginRight: -5 }}
                                                                inputStyle={{
                                                                    textAlign: 'center'
                                                                }}
                                                                type={"number"}
                                                                onChange={(e) => this.updateOrder(e, item)}
                                                                onFocus={(e) => this.handleFocus(e)}
                                                            />
                                                            <IconButton
                                                                style={{ float: 'right', marginRight: -5, marginTop: 5 }}
                                                                onTouchTap={(e) => { this.removeOrder(item) }}
                                                            >
                                                                <Remove
                                                                    style={styles.Icon}
                                                                    color="red"
                                                                    onTouchTap={this.handleOpen}
                                                                />
                                                            </IconButton>
                                                        </div>
                                                        <div ref="divBalance" style={styles.divBalance}>
                                                            {(item.order_amount * item.sku_price).toLocaleString()} บาท
                                                        </div>
                                                    </div>
                                                </ListItem>
                                                <Divider style={{ width: '100%' }} />
                                            </div>
                                        );
                                    })}
                                </List>
                            </MobileTearSheet>
                        </div>
                    </Scrollbars>
                </div>
                <div
                    style={{
                        positiion: 'fixed',
                        bottom: -200, zIndex: 900,
                        //borderStyle: 'solid', borderColor: '#d9d9d9',
                        //borderWidth: '1px 0px 0px 0px',
                        paddingTop: 3,
                        textAlign: 'center',
                    }}
                >
                    <RaisedButton
                        label="ยืนยันการสั่งซื้อ"
                        style={{ width: '99%' }}
                        primary={true}
                        labelStyle={{ fontSize: '17px', color: 'white' }}
                        icon={<Save color={"white"} style={{ marginTop: -5 }} />}
                    //backgroundColor="#a4c639"
                    />
                </div>
                <DialogOrderDescription
                    dialogOpen={this.state.dialogOpen}
                    handleClose={this.handleCloseDialog}
                />
            </div >
        );
    }
}

function mapStateToProps(state) {
    return {
        allOrder: state.shop.allOrder,
        docked: state.navLeftMenu.docked,
        width: state.navLeftMenu.width,
        height: state.navLeftMenu.height,
    }
}

export default connect(mapStateToProps, actions)(OrderList);
