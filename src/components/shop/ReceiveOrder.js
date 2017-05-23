import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';



import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import BackIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-left';

import Star from 'material-ui/svg-icons/toggle/star';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Loading from '../Loading';
import { Scrollbars } from 'react-custom-scrollbars';


import { List, ListItem } from 'material-ui/List';

import Divider from 'material-ui/Divider';

import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import Avatar from 'material-ui/Avatar';
import SearchBar from '../SearchBar';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {
    blue50,
    blue100,
    blue200,
    blue300,
    indigo900,
    orange200,
    deepOrange300,
    pink400,
    purple500,
    grey500,
    deepOrange700,
    grey50,
    darkBlack,
    lightBlue400
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

    Scrollbars: {
        height: 0,
    },
    divList: {
        position: 'relative',
        width: '100%',
        zIndex: 700,
        overflowX: 'hidden'
    },
    ListStyle: {
        margin: 5
    },
    root: {


    },
};




class ReceiveOrder extends React.Component {


    state = {
        showOrderData: [],
        open: false,
        loading: true
    }


    updateStyle(docked, width, height) {
        if (docked) {
            styles.tabs = { ...styles.tabs, 'paddingLeft': 0, width: width - 255 };
            styles.Scrollbars = { ...styles.Scrollbars, height: height - 110 };
            styles.root = { ...styles.root, width: '95%', marginLeft: '30px' }
        } else {
            styles.tabs = { ...styles.tabs, 'paddingLeft': 0, width: '100%' };
            styles.Scrollbars = { ...styles.Scrollbars, height: height - 160 };
        }
    }
    updateState(width) {
        this.divShowTitle = { ...this.divShowTitle, width: '70%' };
    }
    componentWillMount() {
        this.updateState(this.props.width);
        //this.setState({ showTileData: this.props.tilesData });
        this.props.updateShowOrder(this.props.tilesData);
        this.findOrders(this.props.searchFavorite);
        this.updateStyle(this.props.docked, this.props.width, this.props.height);

        this.setState({ showOrderData: this.props.orderNumbers });
    }
    componentDidMount() {
        //this.findOrders(this.props.searchFavorite);
        //setTimeout(() => { this.setState({ loading: false }); }, 500);
    }
    componentWillReceiveProps = (nextProps) => {
        this.updateState(nextProps.width);
        this.findOrders(nextProps.searchFavorite, nextProps.searchText);
        this.updateStyle(nextProps.docked, nextProps.width, nextProps.height);
    }
    changeFavorite = (id) => {
        this.props.changeFavorite(id);
    }
    componentWillUnmount() {
        this.props.handleTransitionEnd();
    }
    findOrders(favorite = this.props.searchFavorite, searchText = this.props.searchText) {
        let rs = this.props.tilesData.filter((tiles) => {
            if (favorite) {
                return tiles.favorite;
            } else {
                return true;
            }
        });
        let rs2 = rs.filter((tiles) => {
            return tiles.title.indexOf(searchText) > -1;
        });
        //this.setState({ showTileData: rs2 });
    }
    selectOrder = (e, id, obj) => {
        this.props.addToInvoice(obj);
    }
    handleOpen = (SelectedTile) => {
        //save แต่ไม่มีการเรียกใช้ mapStateToProps ก็ได้
        //ในตัวอย่างนี้เราจะใช้ Props ที่หน้า itemDetai
        //save in to Redux
        this.props.UpdateFindItem(SelectedTile);

    };

    render() {


        let i = 0;

        return (
            <div>
                <SearchBar searchShowFavorite={false} />
                <div style={{ backgroundColor: '#FFF' }}>
                    <Scrollbars style={styles.Scrollbars} >

                        <div style={styles.divList}>
                            <div style={styles.div} id='detail' ref='detail'>
                                <div style={styles.root}>
                                    <List>

                                        {this.state.showOrderData.map((orders, index) => {
                                            let key = orders.id + (i++);
                                            let order_status = orders.orderStatus;
                                            let status_color = '';
                                            if (orders.orderStatus != 'confirm') {

                                                if (orders.orderStatus == 'shipping') { status_color = orange200; }
                                                else { status_color = blue50; }

                                                return (

                                                    <div key={key}>
                                                        <ListItem key={key} style={{ color: blue300 }}
                                                            primaryText={orders.orderNumber}
                                                            secondaryTextLines={2}
                                                            secondaryText={
                                                                <p>
                                                                    <span style={{ color: darkBlack }}> Create By {orders.createBy}</span><br />
                                                                    Lasted order {orders.lastUpdate}
                                                                </p>
                                                            }
                                                            leftAvatar={
                                                                <Avatar color={deepOrange300}
                                                                    backgroundColor={status_color}
                                                                >{orders.createBy.substring(0, 1)}</Avatar>}

                                                            rightAvatar={<Avatar size={30} style={styles.ListStyle}>{orders.amount}</Avatar>}
                                                        />
                                                        <Divider />
                                                    </div>
                                                )
                                            }
                                        })}

                                    </List>
                                </div>
                            </div>
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

        orderNumbers: state.shop.orderNumbers,

        width: state.navLeftMenu.width,
        height: state.navLeftMenu.height,
        searchText: state.search.text,
        searchFavorite: state.search.favorite,
        tilesData: state.shop.tilesData,
        invoiceOrder: state.shop.invoiceOrder,
        docked: state.navLeftMenu.docked,
    }
}


export default connect(mapStateToProps, actions)(ReceiveOrder);
