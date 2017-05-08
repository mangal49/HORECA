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
};

class InvoiceList extends React.Component {
    state = {
        loading: true
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
                                    leftAvatar={<Avatar src={item.img} size={80} />}
                                    style={{ height: 100 }}
                                >
                                    <div style={{ float: 'left', width: '40%' }}>
                                        <div style={{ textAlign: 'left', marginLeft: 35, marginTop: 10, }}>
                                            {item.title}
                                        </div>
                                        <div style={{
                                            color: lightBlack,
                                            textAlign: 'left',
                                            marginLeft: 35,
                                            marginTop: 5,
                                            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                            width: '80%'
                                        }}
                                        >
                                            {item.author}
                                        </div>
                                    </div>
                                    <div style={{ float: 'right', width: '50%', marginRight: '-25px' }}>
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
                                            style={{
                                                float: 'right',
                                                height: 80, width: 2,
                                                marginTop: -10,
                                                borderStyle: 'solid', borderColor: '#d9d9d9',
                                                borderWidth: '0px 0px 0px 1px',
                                                marginRight: -10
                                            }}
                                        >
                                            &nbsp;
                                        </div>
                                    </div>
                                </ListItem>
                                <Divider />
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
        width: state.navLeftMenu.width,
    }
}

export default connect(mapStateToProps)(InvoiceList);
