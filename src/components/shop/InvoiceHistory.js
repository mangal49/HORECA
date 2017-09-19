import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import DialogCancel from './DialogCancel'
import OrderDetailHistory from './OrderDetailHistory'

import SearchBar from '../SearchBar';
import { Scrollbars } from 'react-custom-scrollbars';
import MobileTearSheet from './MobileTearSheet';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

const styles = {
    Scrollbars: {
        height: 0,
    },
    divList: {
        position: 'relative',//relative,absolute
        width: '100%',
        textAlign: 'center',
        zIndex: 700,
    },
    root: {
        position: 'relative',//relative,absolute
        width: '100%',
        textAlign: 'center',
        zIndex: 600,
    },
    divContent: {
        float: 'left',
        width: '40%',
        marginTop: -20,
        marginLeft: -20,
    },
    listItemHeader: {
        textAlign: 'left', width: '100%',
        marginLeft: 10, marginTop: 10,
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
    },
    listItemDetail: {
        color: lightBlack,
        textAlign: 'left', width: '100%',
        marginLeft: 10, marginTop: 3,
        fontSize: '12px',
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
    },
    popupMenu: {
        fontSize: 13,
        color: darkBlack,
    }
};

const iconButtonElement = (
    <IconButton
        touch={true}
        //tooltip="more"
        tooltipPosition="bottom-left"
    >
        <MoreVertIcon color={grey400} />
    </IconButton>
);

class InvoiceHistory extends React.Component {
    state = {
        open: false,
        loading: true,
        dialogCancelOpen: false,
        showDisplay: "list",
    }

    constructor(props) {
        super(props);
    }
    handleOpenCancelDialog = () => {
        this.setState({ dialogCancelOpen: true });
    };
    handleCloseCancelDialog = () => {
        this.setState({ dialogCancelOpen: false });
    };
    handleOpenOrderDetail = () => {
        this.setState({ showDisplay: "detail" });
    }
    handleCloseOrderDetail = () => {
        this.setState({ showDisplay: "list" });
    }
    updateStyle(docked, width, height) {
        if (docked) {
            styles.tabs = { ...styles.tabs, 'paddingLeft': 0, width: width - 255 };
            styles.Scrollbars = { ...styles.Scrollbars, height: height - 160 };
            styles.divContent = { ...styles.divContent, marginLeft: 25, width: '90%', };
        } else {
            styles.tabs = { ...styles.tabs, 'paddingLeft': 0, width: '100%' };
            styles.Scrollbars = { ...styles.Scrollbars, height: height - 160 };
            styles.divContent = { ...styles.divContent, marginLeft: -10, width: '90%', };
        }
    }
    componentWillMount() {
        this.updateStyle(this.props.docked, this.props.width, this.props.height);
    }
    componentDidMount() {
        setTimeout(() => { this.setState({ loading: false }); }, 500);
    }
    componentWillReceiveProps = (nextProps) => {
        this.updateStyle(nextProps.docked, nextProps.width, nextProps.height);
    }

    componentWillUnmount() {
        this.props.handleTransitionEnd();
    }

    render() {
        let display = <div>xxx</div>;
        if (this.state.showDisplay == "list") {
            const rightIconMenu = (
                <IconMenu iconButtonElement={iconButtonElement}>
                    <MenuItem onClick={this.handleOpenOrderDetail}>
                        <div style={styles.popupMenu}>View Invoice</div>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={this.handleOpenCancelDialog}>
                        <div style={styles.popupMenu}>Cancel Invoice</div>
                    </MenuItem>
                </IconMenu>
            );
            display = <div>
                <SearchBar searchShowFavorite={false} />
                <div style={{ backgroundColor: '#FFF' /*'#F5F5F5'*/ }}>
                    <Scrollbars style={styles.Scrollbars} >
                        <div style={styles.divList}>
                            <div style={styles.root}>
                                <MobileTearSheet>
                                    <List>
                                        <ListItem
                                            leftAvatar={
                                                <Avatar
                                                    color={"white"}
                                                    size={45}
                                                    backgroundColor={"red"}
                                                ><div style={{ fontSize: 11 }}>Cancel</div></Avatar>
                                            }
                                            rightIconButton={rightIconMenu}
                                            style={{ height: 70 }}
                                        >
                                            <div style={styles.divContent}>
                                                <div style={styles.listItemHeader}>Invoice-00001</div>
                                                <div style={styles.listItemDetail}>
                                                    &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Cancel Date :</span> <span style={{ color: darkBlack }}>20/01/2017</span><br />
                                                    &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Balance :</span> <span style={{ color: darkBlack }}>12,290 Bath</span>
                                                </div>
                                            </div>
                                        </ListItem>
                                        <Divider inset={true} />
                                        <ListItem
                                            leftAvatar={
                                                <Avatar
                                                    color={"white"}
                                                    size={45}
                                                    backgroundColor={"green"}
                                                ><div style={{ fontSize: 11 }}>Invoice</div></Avatar>
                                            }
                                            rightIconButton={rightIconMenu}
                                            style={{ height: 70 }}
                                        >
                                            <div style={styles.divContent}>
                                                <div style={styles.listItemHeader}>Invoice-00002</div>
                                                <div style={styles.listItemDetail}>
                                                    &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Order No. :</span> <span style={{ color: darkBlack }}>Order-00002</span><br />
                                                    &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Balance :</span> <span style={{ color: darkBlack }}>12,290 Bath</span>
                                                </div>
                                            </div>
                                        </ListItem>
                                        <Divider inset={true} />
                                        <ListItem
                                            leftAvatar={
                                                <Avatar
                                                    color={"white"}
                                                    size={45}
                                                    backgroundColor={"green"}
                                                ><div style={{ fontSize: 11 }}>Invoice</div></Avatar>
                                            }
                                            rightIconButton={rightIconMenu}
                                            style={{ height: 70 }}
                                        >
                                            <div style={styles.divContent}>
                                                <div style={styles.listItemHeader}>Invoice-00003</div>
                                                <div style={styles.listItemDetail}>
                                                    &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Order No. :</span> <span style={{ color: darkBlack }}>Order-00003</span><br />
                                                    &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Balance :</span> <span style={{ color: darkBlack }}>12,290 Bath</span>
                                                </div>
                                            </div>
                                        </ListItem>
                                        <Divider inset={true} />
                                        <ListItem
                                            leftAvatar={
                                                <Avatar
                                                    color={"white"}
                                                    size={45}
                                                    backgroundColor={"green"}
                                                ><div style={{ fontSize: 11 }}>Invoice</div></Avatar>
                                            }
                                            rightIconButton={rightIconMenu}
                                            style={{ height: 70 }}
                                        >
                                            <div style={styles.divContent}>
                                                <div style={styles.listItemHeader}>Invoice-00004</div>
                                                <div style={styles.listItemDetail}>
                                                    &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Order No. :</span> <span style={{ color: darkBlack }}>Order-00004</span><br />
                                                    &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>Balance :</span> <span style={{ color: darkBlack }}>12,290 Bath</span>
                                                </div>
                                            </div>
                                        </ListItem>
                                    </List>
                                </MobileTearSheet>
                            </div>
                        </div>
                    </Scrollbars>
                </div>
                <DialogCancel
                    dialogCancelOpen={this.state.dialogCancelOpen}
                    handleClose={this.handleCloseCancelDialog}
                />
            </div>
        } else if (this.state.showDisplay == "detail") {
            display = <OrderDetailHistory
                handleCloseOrderDetail={this.handleCloseOrderDetail}
                dialogCancelOpen={this.state.dialogCancelOpen}
                handleClose={this.handleCloseCancelDialog}
                handleOpen={this.handleOpenCancelDialog}
            />
        }

        return display;
    }
}


// SaleOrderHistory.defaultProps = {

// };

function mapStateToProps(state) {
    return {
        docked: state.navLeftMenu.docked,
        width: state.navLeftMenu.width,
        height: state.navLeftMenu.height,
        searchText: state.search.text,
    }
}

export default connect(mapStateToProps, actions)(InvoiceHistory);