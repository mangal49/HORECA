import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


import { Tabs, Tab } from 'material-ui/Tabs';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Back from 'material-ui/svg-icons/hardware/keyboard-arrow-left';

import Star from 'material-ui/svg-icons/toggle/star';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Loading from '../Loading';
import { Scrollbars } from 'react-custom-scrollbars';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";


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

    state = {
        showCol: 4,
        showTileData: [],
        open: false,
        loading: true
    }


    updateStyle(docked, width, height) {
        if (docked) {
            styles.container = { ...styles.container, top: '0px' };
            styles.tabs = { ...styles.tabs, 'paddingLeft': 0, width: width - 255 };
            styles.Scrollbars = { ...styles.Scrollbars, height: height - 110 };

            styles.divList = { ...styles.divList, /*width: '50%', paddingLeft: '25%',*/ top: '30px' };

        } else {
            styles.container = { ...styles.container, top: '56px' };
            styles.tabs = { ...styles.tabs, 'paddingLeft': 0, width: '100%' };
            styles.Scrollbars = { ...styles.Scrollbars, height: height - 160 };
            styles.divList = { ...styles.divList, width: '100%', paddingLeft: '0%', top: '0px' };
        }
    }
    componentWillMount() {
        this.props.setRole('SHOP');
        this.updateStyle(this.props.docked, this.props.width, this.props.height);
        this.setState({
            showTileData: this.props.tilesData,
            item: this.props.findItem,
        });


    }
    componentDidMount() {
        //setTimeout(() => { this.setState({ loading: false }); }, 11500);


    }
    componentWillReceiveProps(nextProps, nextState) {
        this.updateStyle(nextProps.docked, nextProps.width, nextProps.height);
    }
    changeFavorite = (id) => {
        this.props.changeFavorite(id);
    }
    render() {


        let star = null;
        if (this.state.item.favorite == true) {
            star = <Star color={"gold"} style={styles.Icon} />
        } else {
            star = <StarBorder color="black" style={styles.Icon} />
        }
        return (
            <div style={styles.container}> title={}
                <div style={styles.tabs}>
                    <AppBar style={{ height: "48px" }}
                        iconElementLeft={<Link to={'/shop/order'} > <FlatButton label="Back" labelStyle={styles.labelColor} /> </Link>}

                    >

                    </AppBar>

                    <Scrollbars
                        style={styles.Scrollbars}
                    >
                        <div style={styles.divList}>

                            <Card style={{ position: 'relative', boxShadow: 'none' }}>

                                <CardMedia style={{ textAlign: 'center' }}
                                    overlay={<CardTitle title={this.state.item.sku_name} subtitle={this.state.item.sku_price.toLocaleString() + "/" + this.state.item.sku_unit} />}

                                >

                                    <img src={'../' + this.state.item.img} style={{ minWidth: '0px', width: 'none' }} />

                                    <div
                                        style={{
                                            textAlign: 'right', marginRight: '-10px',
                                        }}
                                    >
                                        <IconButton
                                            style={{ padding: 0, width: 25, marginRight: 25 }}
                                            onTouchTap={() => { this.changeFavorite(this.state.item.id) }}
                                        >
                                            {star}
                                        </IconButton>
                                    </div>
                                </CardMedia>


                                <CardTitle title="Card title" subtitle="Card subtitle" />

                                <CardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                         Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                         Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                         Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
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
        width: state.navLeftMenu.width,
        docked: state.navLeftMenu.docked,
        role: state.auth.role,
        tilesData: state.shop.tilesData,
        invoiceOrder: state.shop.invoiceOrder,
        findItem: state.itemDetail.findItem,
        height: state.navLeftMenu.height
    }
}

export default connect(mapStateToProps, actions)(ItemDetail);
