import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import ListItem from 'material-ui/List/ListItem';
import Exit from 'material-ui/svg-icons/action/exit-to-app';
import { blueA200, red500, greenA200 } from 'material-ui/styles/colors';

class SignOut extends React.Component {

    ToSignOut = (e, id, obj) => {
        this.props.signoutUser();
    }

    render() {
        return (
            <ListItem
                style={{ ...this.props.styleMenu, /*backgroundColor: '#FFCDD2'*/ }}
                leftIcon={
                    <Exit color={blueA200} hoverColor={greenA200} />
                }
                //primaryText="ออกจากระบบ"
                onTouchTap={() => { this.props.handleClose(); }}
            >
                {/*<a href='/shop/order' ></a>*/}
                <div style={this.props.styleTextMenu} onTouchTap={(e) => { this.ToSignOut() }}>ออกจากระบบ</div>
            </ListItem>
        );
    }
}

export default connect(null, actions)(SignOut);
