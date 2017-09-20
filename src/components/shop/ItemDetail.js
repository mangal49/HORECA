import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Back from 'material-ui/svg-icons/hardware/keyboard-arrow-left';

import Star from 'material-ui/svg-icons/toggle/star';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Loading from '../Loading';
import { Scrollbars } from 'react-custom-scrollbars';

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
        top: '56px',
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
        // paddingLeft: '25%',
        overflowX: 'hidden',
        top: '30px'
    },
    div: {
        position: 'relative',//relative,absolute
        width: '100%',
        textAlign: 'center',
        zIndex: 600,
    },
    labelColor: {
        color: 'white'
    }
};

class ItemDetail extends React.Component {
    static contextTypes = {
        router: PropTypes.object
    }
    updateStyle(docked, width, height) {
        if (docked) {
            styles.tabs = { ...styles.tabs, 'paddingLeft': 0, width: width - 255 };
            styles.Scrollbars = { ...styles.Scrollbars, height: height - 130 };
            styles.divList = { ...styles.divList, /*width: '50%', paddingLeft: '25%',*/ top: '30px' };

        } else {
            styles.tabs = { ...styles.tabs, 'paddingLeft': 0, width: '100%' };
            styles.Scrollbars = { ...styles.Scrollbars, height: height - 130 };
            styles.divList = { ...styles.divList, width: '100%', paddingLeft: '0%', top: '0px' };
        }
    }
    componentWillMount() {
        if (this.props.itemDetail.id == null) {
            this.context.router.push('/catalog');
        }
        this.updateStyle(this.props.docked, this.props.width, this.props.height);
    }

    componentDidMount() {
        this.props.notShowCartBalance();
    }
    componentWillReceiveProps(nextProps, nextState) {
        this.updateStyle(nextProps.docked, nextProps.width, nextProps.height);
    }
    changeFavorite = (id, sku_code, favorite) => {
        this.props.changeFavorite(id, sku_code, favorite);
    }

    render() {
        let star = null;
        if (this.props.itemDetail.favorite == true) {
            star = <Star color={"gold"} style={styles.Icon} />
        } else {
            star = <StarBorder color="black" style={styles.Icon} />
        }
        return (
            <div style={styles.container}>
                <div style={styles.tabs}>
                    <AppBar style={{ height: "48px" }}
                        iconElementLeft={<Link to={'/catalog'} > <FlatButton label="Back" labelStyle={styles.labelColor} /> </Link>}
                    >

                    </AppBar>

                    <Scrollbars
                        style={styles.Scrollbars}
                    >
                        <div style={styles.divList}>

                            <Card style={{ position: 'relative', boxShadow: 'none' }}>

                                <CardMedia style={{ textAlign: 'center', }}
                                    overlay={<CardTitle title={this.props.itemDetail.sku_name} subtitle={(this.props.itemDetail.sku_price * 1).toLocaleString() + " Bath / " + this.props.itemDetail.sku_unit} />}

                                >
                                    <img src={this.props.itemDetail.img}
                                        style={{
                                            minWidth: '0px', width: 'none',
                                            maxWidth: '450px', maxHeight: '400px',
                                            paddingBottom: 50,
                                        }}
                                    />
                                    <div
                                        style={{
                                            textAlign: 'right', marginRight: '-10px',
                                        }}
                                    >
                                        {/* <IconButton
                                            style={{ padding: 0, width: 25, marginRight: 25 }}
                                            onTouchTap={() => { this.changeFavorite(this.props.itemDetail.id, this.props.itemDetail.sku_code, this.props.itemDetail.favorite) }}
                                        >
                                            {star}
                                        </IconButton> */}
                                    </div>
                                </CardMedia>
                                <CardTitle title="Description" />
                                <CardText>
                                    &nbsp;&nbsp;&nbsp;&nbsp;{this.props.itemDetail.description}
                                </CardText>
                            </Card>
                        </div>
                    </Scrollbars>
                </div>
            </div>
        );
    }
}

//หากมีการเรียกใช้ Props จาก Redux ให้ mapStateToProps ด้วย
function mapStateToProps(state) {
    return {
        docked: state.navLeftMenu.docked,
        width: state.navLeftMenu.width,
        height: state.navLeftMenu.height,

        itemDetail: state.shop.showItemDetail,
    }
}

export default connect(mapStateToProps, actions)(ItemDetail);
