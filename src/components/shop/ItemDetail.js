import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


import { Tabs, Tab } from 'material-ui/Tabs';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import BackIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-left';




import {
    blue300,
    indigo900,
    orange200,
    deepOrange300,
    pink400,
    purple500,
    grey500,
    deepOrange700,
    grey50
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
    tab: {
        fontSize: '17px',
    },
    Scrollbars: {
        height: 0,
    },
    divList: {
        position: 'relative',//relative,absolute
        width: '100%',
        //textAlign: 'center',
        zIndex: 700,
    },
    div: {
        position: 'relative',//relative,absolute
        width: '100%',
        textAlign: 'center',
        zIndex: 600,
    }
};



class ItemDetail extends React.Component {
    updateStyle(docked, width, height) {
        if (docked) {
            styles.container = { ...styles.container, top: '0px' };
            styles.tabs = { ...styles.tabs, 'paddingLeft': 0, width: width - 255 };
            styles.Scrollbars = { ...styles.Scrollbars, height: height - 110 };

            styles.divList = { ...styles.divList, width: '50%' };

        } else {
            styles.container = { ...styles.container, top: '56px' };
            styles.tabs = { ...styles.tabs, 'paddingLeft': 0, width: '100%' };
            styles.Scrollbars = { ...styles.Scrollbars, height: height - 160 };
            styles.divList = { ...styles.divList, width: '100%' };
        }
    }
    componentWillMount() {
        this.props.setRole('SHOP');
        this.updateStyle(this.props.docked, this.props.width, this.props.height);
    }
    componentWillReceiveProps(nextProps, nextState) {
        this.updateStyle(nextProps.docked, nextProps.width, nextProps.height);
    }
    // componentWillUpdate(nextProps, nextState) {
    //     this.updateStyle(nextProps.docked)
    // }
    render() {
        console.log('Render');
        return (


            <div style={styles.container}>
                <div style={styles.tabs}>


                    <AppBar style={{ height: "48px" }}
                        iconElementLeft={<FlatButton label="Back" href='/shop/order' />}
                        iconElementRight={<FlatButton label="Back" href='/shop/order' />}
                    />



                    <div style={styles.divList}>
                        <Card>
                            <CardHeader
                                title="URL Avatar"
                                subtitle="Subtitle"
                                avatar="../images/jsa-128.jpg"
                            />
                            <CardMedia
                                overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
                            >
                                <img src="../images/grid-list/00-52-29-429_640.jpg" />
                            </CardMedia>


                            <CardTitle title="Card title" subtitle="Card subtitle" />
                            <CardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                         Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                         Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                         Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                    </CardText>
                        </Card>
                    </div>
                </div>
            </div>



        );
    }
}

function mapStateToProps(state) {
    return {
        width: state.navLeftMenu.width,
        docked: state.navLeftMenu.docked,
        role: state.auth.role,
    }
}

export default connect(mapStateToProps, actions)(ItemDetail);
