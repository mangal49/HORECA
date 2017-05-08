import React from 'react';
import ListItem from 'material-ui/List/ListItem';
import History from 'material-ui/svg-icons/action/history';
import EuroSymbol from 'material-ui/svg-icons/action/euro-symbol';
import Store from 'material-ui/svg-icons/action/store';
import { Link } from 'react-router';
import { connect } from 'react-redux';


import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

class ShopMenu extends React.Component {
    render() {
        return (
            <div>
                <ListItem
                    style={(this.props.selectMenu == 1) ? this.props.styleSelectMenu : this.props.styleMenu}
                    leftIcon={
                        <EuroSymbol />
                    }
                    //primaryText="สั่งซื้อสินค้า"
                    onTouchTap={() => { this.props.handleClose(); this.props.onSelectMenu(1); }}
                    containerElement={<Link to="/shop/order" />}
                >
                    <div style={this.props.styleTextMenu}>สั่งซื้อสินค้า</div>
                </ListItem>
                <ListItem
                    style={(this.props.selectMenu == 2) ? this.props.styleSelectMenu : this.props.styleMenu}
                    leftIcon={
                        <Store />
                    }
                    //primaryText="รับสินค้า"
                    onTouchTap={() => { this.props.handleClose(); this.props.onSelectMenu(2); }}
                    containerElement={<Link to="/shop/receive" />}
                    rightIcon={
                        <Badge
                            badgeContent={10}
                            secondary={true}
                            badgeStyle={{ top: 0, right: 0, marginTop: '13px', marginLeft: '-15px' }}
                            style={{ marginTop: '-10px' }}
                        >
                            <NotificationsIcon />
                        </Badge>

                    }
                >
                    <div style={this.props.styleTextMenu}>รับสินค้า</div>
                </ListItem>
                <ListItem
                    style={(this.props.selectMenu == 3) ? this.props.styleSelectMenu : this.props.styleMenu}
                    leftIcon={
                        <History />
                    }
                    //primaryText="สินค้าที่เคยสั่งซื้อ"
                    onTouchTap={() => { this.props.handleClose(); this.props.onSelectMenu(3); }}
                    containerElement={<Link to="/shop/oldorder" />}
                >
                    <div style={this.props.styleTextMenu}>สินค้าที่เคยสั่งซื้อ</div>
                </ListItem>
            </div >
        );
    }
}

ShopMenu.defaultProps = {
    selectMenu: 1
};


function mapStateToProps(state) {
    return {
        height: state.navLeftMenu.height,
    }
}

export default ShopMenu;