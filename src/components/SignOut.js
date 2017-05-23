import React from 'react';
import ListItem from 'material-ui/List/ListItem';
import Exit from 'material-ui/svg-icons/action/exit-to-app';
import { blueA200, red500, greenA200 } from 'material-ui/styles/colors';

class SignOut extends React.Component {

    ToSignOut = (e, id, obj) => {
        console.log(666666666666);
    }

    render() {
        return (
            <ListItem href='/signin'
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

export default SignOut;
