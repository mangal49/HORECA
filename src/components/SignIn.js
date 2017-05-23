import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import { blueA200, red500, greenA200 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';


import TextField from 'material-ui/TextField';

import Checkbox from 'material-ui/Checkbox';

import Divider from 'material-ui/Divider';

import { Link } from 'react-router';

const styles = {

    box: {
        // width: '500px',
        //border: '3px solid #9E9E9E',
        borderRadius: '5px',
        margin: '0',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',

    },
    btn: {
        margin: 12,
    },
    txtUsername: {
        height: '35px',
        width: '300px',
        borderRadius: '5px 5px 0 0',
        paddingLeft: '5px',

        fontSize: '16px',
        color: '#494949',
        border: '1px solid #9E9E9E'
    },
    txtPassword: {
        height: '35px',
        width: '302px',
        borderRadius: ' 0 0 5px 5px',
        paddingLeft: '4px',
        marginTop: '-1px',

        fontSize: '16px',
        color: '#494949',
        border: '1px solid #9E9E9E'
    },
    heading: {

        // height: '35px',
        textAlign: 'center'
    }

};

class Signin extends React.Component {
    componentWillMount() {
        // this.props.setRole('SHOP');


    }

    componentDidMount() {

        //console.log('cadetblue');
    }



    render() {
        //document.body.style.backgroundColor = "#424242";

        document.body.style.background = 'url(../images/TSaWwNF.jpg';
        document.body.style.backgroundSize = 'cover';
        //webkit-background-size: cover
        document.body.style.webkitBackgroundSize = 'cover';


        document.body.style.backgroundAttachment = 'fixed';
        return (
            <div>
                <div style={styles.box}>

                    <div style={{ padding: '16px' }}>

                        <div style={styles.heading}>
                            <img src='../images/cloud.png' style={{ width: '150px' }} />
                            <h2 style={{ color: 'white' }}>Sign in to HORECA </h2>
                        </div>

                        <div>

                            <input type='textbox' name='username' placeholder='Username' style={styles.txtUsername} defaultValue='Taylor.Swift@hotmaial.com' />
                            <br />
                            <input type='password' name='username' placeholder='Password' style={styles.txtPassword} />


                            <br />
                        </div>

                        <div style={{ textAlign: 'center' }}>

                            {/*<Link to={'/shop/order'} ></Link>*/}
                            <RaisedButton label="Sign-In" primary={true} style={styles.btn} href='/shop/order' />

                            <RaisedButton label="Reset" style={styles.btn} />

                        </div>

                        <div>
                            <Checkbox style={{ color: 'white', fill: 'black' }}
                                iconStyle={{ color: 'white', fill: 'white' }}
                                labelStyle={{ color: 'white' }}
                                label="Keep me signed in"
                                style={{ marginBottom: 16 }}
                            />
                        </div>
                        <Divider />
                        <div style={{ marginTop: 16 }}>
                            <a href='#' style={{ color: 'white', textDecoration: 'none' }}>Forgot Username or Password?</a>
                        </div>
                    </div>
                </div>
            </div >

        );
    }
}
function mapStateToProps(state) {
    return {
        role: state.auth.role
    }
}

export default connect(mapStateToProps, actions)(Signin);
