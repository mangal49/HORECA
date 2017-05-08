import React from 'react';
import ListItem from 'material-ui/List/ListItem';
import Exit from 'material-ui/svg-icons/action/exit-to-app';

class SignOut extends React.Component {
    render() {
        return (
            <ListItem
                style={{ ...this.props.styleMenu, /*backgroundColor: '#FFCDD2'*/ }}
                leftIcon={
                    <Exit />
                }
                //primaryText="ออกจากระบบ"
                onTouchTap={() => { this.props.handleClose(); }}
            >
                <div style={this.props.styleTextMenu}>ออกจากระบบ</div>
            </ListItem>
        );
    }
}

export default SignOut;
