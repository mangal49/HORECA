import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Avatar from 'material-ui/Avatar';
import ListItem from 'material-ui/List/ListItem';
import Chip from 'material-ui/Chip';


import IconButton from 'material-ui/IconButton';
import Edit from 'material-ui/svg-icons/editor/border-color';

// import {
//     blue300,
//     indigo900,
//     orange200,
//     deepOrange300,
//     pink400,
//     purple500,
// } from 'material-ui/styles/colors';

const styles = {
    Avatar: {
        marginTop: '-5px',
        zIndex: 1000,
        backgroundColor: "#FFFFFF",
    },
    chip: {
        textAlign: 'center',
        marginLeft: '53px',
        marginTop: '-18px',
        //width: '100%',
        zIndex: 900,
    },
    styleHrAvatar: {
        margin: 0,
        marginTop: "0px",
        marginBottom: "0px",
        marginLeft: 0,
        height: "1px",
        border: "none",
        backgroundColor: "#BDBDBD"
    },
    UserText: {
        color: 'rgba(0, 138, 255, 0.85)',
        fontSize: '12px',
    }
};

class AvatarShow extends React.Component {
    componentWillMount() {
        this.props.fetchUserData();
    }
    componentWillUnmount() {
        //document.body.innerHTML = '';
    }
    clearDefaultCust(){
        this.props.clearDefaultCustomer();
        this.props.handleClose();
    }

    render() {
        let showChangeCust = null
        if(this.props.user_data.default_customer.ship_to_name && this.props.user_data.list_customer.length>1){
            showChangeCust =    <IconButton
                                    style={{  
                                            marginRight: 0, marginTop: 3,padding:0 ,
                                            position: 'absolute',
                                            right:5,bottom:15,
                                        }}
                                    onTouchTap={(e) => { this.clearDefaultCust() }}
                                >
                                    <Edit
                                        style={{ cursor: 'pointer',fontSize:100, }}
                                        viewBox={'50 50 50 50'}
                                        color="gold"
                                        hoverColor="green"
                                        viewBox="0 0 24 24"
                                    />
                                </IconButton>
        }
        return (
            /*<ListItem
                disabled={true}
                leftAvatar={
                    <Avatar src="../images/uxceo-128.jpg"
                        size={90}
                    />
                }
                style={{ textAlign: 'right', height: '64px', backgroundColor: "rgb(0, 188, 212)", marginTop: "0px" }}
            >
                <div style={styleNameAvatar}>MK Restaurant</div>
            </ListItem>*/
            <div>
                <ListItem
                    disabled={true}
                    style={{ textAlign: 'center', height: '71px', backgroundColor: "#eeeeee" }}
                >
                    <div>
                        <Avatar 
                            src={this.props.user_data.default_customer.cust_img}
                            size={45}
                            style={styles.Avatar}
                        />
                        <div>
                            {this.props.user_data.default_customer.ship_to_name}
                            {showChangeCust}
                            <br />
                            <span style={styles.UserText} >{this.props.user_data.full_name}</span>
                        </div>
                    </div>
                </ListItem>
                <hr style={styles.styleHrAvatar} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        role: state.auth.role,
        user_data: state.auth.user_data,
    }
}

export default connect(mapStateToProps, actions)(AvatarShow);
