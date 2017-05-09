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

import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors';

const styles = {
    Icon: {
        cursor: 'pointer',
    },
    divContent: {
        float: 'left',
        width: '40%',
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
    }
};

class InvoiceList extends React.Component {
    state = {
        loading: true
    }
    updateStyle(docked, width, height) {
        if (docked) {
            styles.divContent = { ...styles.divContent, marginLeft: 25, width: '50%', };
            styles.divAmount = { ...styles.divAmount, marginRight: 10, width: '40%', };
            styles.divLine = { ...styles.divLine, marginRight: 20, };
            styles.avatar = { ...styles.avatar, marginLeft: 20, };
        } else {
            styles.divContent = { ...styles.divContent, marginLeft: 0, width: '30%', };
            styles.divAmount = { ...styles.divAmount, marginRight: -20, width: '70%', };
            styles.divLine = { ...styles.divLine, marginRight: 0, };
            styles.avatar = { ...styles.avatar, marginLeft: 0, };
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
    render() {
        if (this.state.loading) {
            return (
                <Loading />
            );
        }
        return (
            <MobileTearSheet>
                <List
                    style={{ textAlign: 'center', }}
                >
                    {this.props.invoiceOrder.map((item, index) => {
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
                                <Divider style={{ width: '90%', marginLeft: '5%' }} />
                            </div>
                        );
                    })}
                </List>
            </MobileTearSheet>
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
