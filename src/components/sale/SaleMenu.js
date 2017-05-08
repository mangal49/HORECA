import React from 'react';
import ListItem from 'material-ui/List/ListItem';
import Group from 'material-ui/svg-icons/social/group';
import Settings from 'material-ui/svg-icons/action/settings';
import { Link } from 'react-router';

class SaleMenu extends React.Component {
    render() {
        return (
            <div>
                <ListItem
                    style={(this.props.selectMenu == 1) ? this.props.styleSelectMenu : this.props.styleMenu}
                    leftIcon={
                        <Group />
                    }
                    //primaryText="ยืนยันรายการสั่งซื้อ"
                    onTouchTap={() => { this.props.handleClose(); this.props.onSelectMenu(1); }}
                    containerElement={<Link to="/sale/acceptorder" />}
                >
                    <div style={this.props.styleTextMenu}>ยืนยันรายการสั่งซื้อ</div>
                </ListItem>
                <ListItem
                    style={(this.props.selectMenu == 2) ? this.props.styleSelectMenu : this.props.styleMenu}
                    leftIcon={
                        <Settings />
                    }
                    //primaryText="Sale"
                    onTouchTap={() => { this.props.handleClose(); this.props.onSelectMenu(2); }}
                    containerElement={<Link to="/sale/acceptorder" />}
                >
                    <div style={this.props.styleTextMenu}>Sale</div>
                </ListItem>
                <ListItem
                    style={(this.props.selectMenu == 3) ? this.props.styleSelectMenu : this.props.styleMenu}
                    leftIcon={
                        <Settings />
                    }
                    //primaryText="Sale"
                    onTouchTap={() => { this.props.handleClose(); this.props.onSelectMenu(3); }}
                    containerElement={<Link to="/sale/acceptorder" />}
                >
                    <div style={this.props.styleTextMenu}>Sale</div>
                </ListItem>
            </div>
        );
    }
}

export default SaleMenu;