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

import TextField from 'material-ui/TextField';
import { Scrollbars } from 'react-custom-scrollbars';

import RaisedButton from 'material-ui/RaisedButton';
import Save from 'material-ui/svg-icons/content/save';

import Toggle from 'material-ui/Toggle';

import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors';

const styles = {
    Icon: {
        cursor: 'pointer',
    },
    divContent: {
        float: 'left',
        width: '40%',
        marginTop:-20,
        marginLeft:-20,
    },
    divAmount: {
        float: 'right',
        width: '50%',
        marginRight: '-25px'
    },
    divLine: {
        float: 'right',
        height: 80,
        width: 2,
        marginTop: -10,
        borderStyle: 'solid', borderColor: '#d9d9d9',
        borderWidth: '0px 0px 0px 1px',
        marginRight: -10
    },
    avatar: {
        marginLeft: 20
    },
    Scrollbars: {
        height: 0,
    },
    divList: {
        position: 'relative',//relative,absolute
        width: '100%',
        textAlign: 'center',
        zIndex: 700,
        overflowX: 'hidden',
    },
    div: {
        position: 'relative',//relative,absolute
        width: '100%',
        textAlign: 'center',
        zIndex: 600,
    },
    balance:{
        color: darkBlack,
        float: 'right',
        marginTop: "50px",
        width: '50%',
        fontSize: '14px',
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
    }
};

class InvoiceList extends React.Component {
    state = {
        loading: true,
        serviceCharge: false,
    }
    updateStyle(docked, width, height) {
        if (docked) {
            styles.divContent = { ...styles.divContent, marginLeft: 25, width: '50%', };
            styles.divAmount = { ...styles.divAmount, marginRight: 10, width: '40%', };
            styles.divLine = { ...styles.divLine, marginRight: 20, };
            styles.avatar = { ...styles.avatar, marginLeft: 20, };

            let footerHeight = 38 - 55;
            styles.tabs = { ...styles.tabs, 'paddingLeft': 0, width: width - 255 };
            styles.Scrollbars = { ...styles.Scrollbars, height: height - 163 - footerHeight };

            styles.balance = {...styles.balance,width:'50%',marginRight:'-41%'};

        } else {
            styles.divContent = { ...styles.divContent, marginLeft: -10, width: '61%', };
            styles.divAmount = { ...styles.divAmount, marginRight: -20, width: '49%', };
            styles.divLine = { ...styles.divLine, marginRight: 0, };
            styles.avatar = { ...styles.avatar, marginLeft: -15, };

            let footerHeight = 44 - 55;
            styles.tabs = { ...styles.tabs, 'paddingLeft': 0, width: '100%' };
            styles.Scrollbars = { ...styles.Scrollbars, height: height - 157 - footerHeight };

            
            styles.balance = {...styles.balance,width:'50%',marginRight:'-71%'};
        }
    }
    componentWillMount() {
        this.updateStyle(this.props.docked, this.props.width, this.props.height);
    }
    componentWillReceiveProps(nextProps, nextState) {
        this.updateStyle(nextProps.docked, nextProps.width, nextProps.height);
    }
    componentDidMount() {
        setTimeout(() => { this.setState({ loading: false }); }, 500);
    }
    componentWillUnmount() {
        this.props.handleTransitionEnd();
    }

    handleToggle = (event, toggled) => {
        this.setState({
            [event.target.name]: toggled,
        });
    };

    render() {
        // if (this.state.loading) {
        //     return (
        //         <Loading />
        //     );
        // }
        let balance = 0;
        return (
            <div>
                <div style={{ backgroundColor: '#FFF' /*'#F5F5F5'*/ }}>
                    <Scrollbars
                        style={styles.Scrollbars}
                    >
                        <div style={styles.divList}>
                            <div style={styles.div} id='detail' ref='detail'>

                                <MobileTearSheet>
                                    <List
                                        style={{ textAlign: 'center', }}
                                    >
                                        {this.props.invoiceOrder.map((item, index) => {
                                            balance += (item.amount * item.sku_price);
                                            let showService = item.service_price > 0 && <div style={{
                                                                                            color: lightBlack,
                                                                                            textAlign: 'left',width: '100%',
                                                                                            marginLeft: 10, marginTop: 5,
                                                                                            fontSize:'14px',
                                                                                            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                                                                        }}
                                                                                        >
                                                                                            <Toggle
                                                                                                name="serviceCharge"
                                                                                                value="serviceCharge"
                                                                                                label={`Slice ${item.service_price} บาท / ${item.sku_unit}`}
                                                                                                toggled={this.state.serviceCharge}
                                                                                                onToggle={this.handleToggle}
                                                                                                style={{width:'30%',color: lightBlack,fontSize:'12px'}}
                                                                                            />
                                                                                        </div>
                                            return (
                                                <div key={index}>
                                                    <ListItem
                                                        leftAvatar={<Avatar src={item.img} size={60} style={styles.avatar} />}
                                                        style={{ height: 50 }}
                                                        disabled={true}
                                                    >
                                                        <div style={styles.divContent}>
                                                            <div style={{
                                                                textAlign: 'left',width: '100%',
                                                                marginLeft: 10,marginTop: 10,
                                                                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                                            }}
                                                            >
                                                                {item.sku_name}
                                                            </div>
                                                            <div style={{
                                                                color: lightBlack,
                                                                textAlign: 'left',width: '100%',
                                                                marginLeft: 10, marginTop: 10,
                                                                fontSize:'11px',
                                                                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                                            }}
                                                            >
                                                                {item.sku_price.toLocaleString()} บาท / {item.sku_unit}
                                                                &nbsp;
                                                                ( {item.min_weight} - {item.max_weight} {item.sku_unit}/ชิ้น )
                                                            </div>
                                                            {showService}
                                                        </div>
                                                        <div style={styles.divAmount}>
                                                            <div style={{ marginTop: -10 }} >
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
                                                                    defaultValue={item.amount.toLocaleString()}
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
                                                                <div style={styles.balance}>
                                                                    {(item.amount * item.sku_price).toLocaleString()} บาท
                                                                </div>  
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
            </div >
        );
    }
}

function mapStateToProps(state) {
    return {
        invoiceOrder: state.shop.invoiceOrder,
        docked: state.navLeftMenu.docked,
        width: state.navLeftMenu.width,
        height: state.navLeftMenu.height,
    }
}

export default connect(mapStateToProps)(InvoiceList);
