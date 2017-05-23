import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import FlatButton from 'material-ui/FlatButton';
import DrawerMenu from './DrawerMenu';
import * as actions from '../actions';
import { connect } from 'react-redux';


// function handleTouchTap() {
//     alert('onTouchTap triggered on the title component');
// }

const styles = {
    title: {
        cursor: 'pointer',
        paddingLeft: '0px',
        width: '100%',
    },
    icon: {
        display: 'none'
    }
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
    updateStyle(docked) {
        if (docked) {
            styles.title = { ...styles.title, 'paddingLeft': 0 };
            styles.icon = { ...styles.icon, display: 'none' };
        } else {
            styles.title = { ...styles.title, 'paddingLeft': 0 };
            styles.icon = { ...styles.icon, display: '' };
        }
    }
    componentWillMount() {
        this.updateStyle(this.props.drawerDocked);
    }
    componentWillReceiveProps(nextProps) {
        this.updateStyle(nextProps.drawerDocked);
    }
    handleToggle = () => {
        this.props.renderNavLeftMenu(false, !this.props.drawerOpen);
    }
    render() {
        let showAppBar = '';
        if (this.props.drawerDocked) {
            showAppBar = 'none';
        }
        return (
            <div>
                <div style={{ display: showAppBar }}>
                    <AppBar
                        style={
                            {
                                boxShadow: 'rgba(0, 0, 0, 0) 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px',
                                height: '57px',
                                position: 'fixed',
                                width: '100%',
                            }
                        }
                        title={<span style={styles.title}>Horeca</span>}
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
        drawerDocked: state.navLeftMenu.docked
    }
}

export default connect(mapStateToProps, actions)(AppBarMenu);
