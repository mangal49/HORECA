import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import FlatButton from 'material-ui/FlatButton';
import DrawerMenu from './DrawerMenu';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors';


// function handleTouchTap() {
//     alert('onTouchTap triggered on the title component');
// }

const styles = {
    title: {
        cursor: 'pointer',
        paddingLeft: '0px',
        width: '100%',
        textAlign:'center',
    },
    icon: {
        display: 'none'
    },
    appBar:{
        boxShadow: 'rgba(0, 0, 0, 0) 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px',
        height: '57px',
        position: 'fixed',
        width: '100%',
    },
    titleStyle:{
        width: '100%',
    },
    showText:{
        textAlign: 'center',
    },
    showSum:{
        marginRight: 30,
        float:'right',
        fontSize:"16px",
        color: lightBlack,
    },
};

/**
 * This example uses an [IconButton](/#/components/icon-button) on the left, has a clickable `title`
 * through the `onTouchTap` property, and a [FlatButton](/#/components/flat-button) on the right.
 */
class AppBarMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = { drawerStatus: false };
    }
    updateStyle(docked,width) {
        if (docked) {
            styles.title = { ...styles.title, 'paddingLeft': 0 };
            styles.icon = { ...styles.icon, display: 'none' };

            styles.titleStyle = { ...styles.titleStyle, textAlign: "center", width: width - 255};
            styles.showText = { ...styles.showText, textAlign: "center"};
            styles.showSum = { ...styles.showSum, marginRight: 30};
        } else {
            styles.title = { ...styles.title, 'paddingLeft': 0 };
            styles.icon = { ...styles.icon, display: '' };

            styles.titleStyle = { ...styles.titleStyle, textAlign: "left", width: '100%'};
            styles.showText = { ...styles.showText, textAlign: "left"};
            styles.showSum = { ...styles.showSum, marginRight: 0};
        }
    }
    componentWillMount() {
        this.updateStyle(this.props.drawerDocked,this.props.width);
    }
    componentWillReceiveProps(nextProps) {
        this.updateStyle(nextProps.drawerDocked,nextProps.width);
    }
    handleToggle = () => {
        this.props.renderNavLeftMenu(false, !this.props.drawerOpen);
    }
    render() {
        let showAppBar = '';
        if (this.props.drawerDocked) {
            //showAppBar = 'none';
        }
        let balance = null;
        balance = this.props.invoiceOrder.reduce((sum, sku) => {
            return sum + (sku.amount*sku.sku_price)
        },0);

        return (
            <div>
                <div style={{ display: showAppBar }}>
                    <AppBar
                        style={styles.appBar}
                        title={
                                
                                <div style={styles.titleStyle}>
                                    <span style={styles.showText}>Horeca</span>
                                    <span style={styles.showSum}>{ balance > 0 && `( ${balance.toLocaleString()} บาท )`}</span>
                                </div>
                            }
                        titleStyle={styles.titleStyle}
                        //onTitleTouchTap={handleTouchTap}
                        /*iconElementRight={<FlatButton label="Save" />}*/
                        iconElementLeft={<IconButton style={styles.icon}><NavigationMenu onTouchTap={() => this.handleToggle()} /></IconButton>}
                    />
                </div>
                <DrawerMenu
                    open={this.props.drawerOpen}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        drawerOpen: state.navLeftMenu.open,
        drawerDocked: state.navLeftMenu.docked,
        width: state.navLeftMenu.width,
        invoiceOrder: state.shop.invoiceOrder,
    }
}

export default connect(mapStateToProps, actions)(AppBarMenu);
