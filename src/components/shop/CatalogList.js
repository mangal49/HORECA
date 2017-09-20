import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Loading from '../Loading';

import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Star from 'material-ui/svg-icons/toggle/star';

import Check from 'material-ui/svg-icons/action/check-circle';
import Description from 'material-ui/svg-icons/action/description';

import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Scrollbars } from 'react-custom-scrollbars';

import Paper from 'material-ui/Paper';

import Add from 'material-ui/svg-icons/content/add-circle';
import Remove from 'material-ui/svg-icons/content/remove-circle';

import SearchBar from '../SearchBar';

//import ReactCSSTransitionGroup from "react-addons-css-transition-group";


const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        paddingTop: '5px',
    },
    gridList: {
        width: '95%',
        height: '100%',
        paddingBottom: '10px'
    },
    Icon: {
        cursor: 'pointer',
    },
    titleStyle: {
        //color: 'rgb(0, 188, 212)',
    },
    Paper: {
        height: 190,
        width: '100%',
        textAlign: 'center',
        display: 'inline-block',
        padding: 5,
        //overFlow: 'hidden',
        paddingBottom: 40,
        backgroundColor: "white",
    },
    divShowTitle: {
        float: 'left', textAlign: 'left',
        display: 'inline', width: '75%',
        marginTop: '5px',
    },
    Scrollbars: {
        height: 0,
    },
    divList: {
        position: 'relative',//relative,absolute
        width: '100%',
        textAlign: 'center',
        zIndex: 700,
        //overflow: 'hidden',
    },
    IconAdd: {
        position: 'absolute',
        padding: 0,
        top: 35,
        width: 35,
        background: 'linear-gradient(to left, rgba(0,0,0,1) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)',
    },
    IconRemove: {
        position: 'absolute',
        padding: 0,
        top: 35,
        width: 35,
        background: 'linear-gradient(to right, rgba(0,0,0,1) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)',
    },
    line: {
        margin: 0,
        marginTop: "0px",
        marginBottom: "0px",
        marginLeft: 0,
        height: "1px",
        border: "none",
        backgroundColor: "#E0E0E0"
    }
};

class CatalogList extends React.Component {
    state = {
        showCol: 4,
        showSKU: [],
    }
    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props) {
        super(props);
    }
    updateStyle(docked, width, height) {
        if (docked) {
            styles.tabs = { ...styles.tabs, 'paddingLeft': 0, width: width - 255 };
            styles.Scrollbars = { ...styles.Scrollbars, height: height - 180 };
        } else {
            styles.tabs = { ...styles.tabs, 'paddingLeft': 0, width: '100%' };
            styles.Scrollbars = { ...styles.Scrollbars, height: height - 180 };
        }
    }
    updateState(width) {
        //this.divShowTitle = { ...this.divShowTitle, width: '80%' };
        if (width <= this.props.widthCol_1) {
            this.setState({ showCol: 1 });
        } else if (width > this.props.widthCol_1 && width <= this.props.widthCol_2) {
            this.setState({ showCol: 2 });
        } else if (width > this.props.widthCol_2 && width <= this.props.widthCol_3) {
            this.setState({ showCol: 3 });
        } else if (width > this.props.widthCol_3 && width <= this.props.widthCol_4) {
            this.setState({ showCol: 4 });
        } else if (width > this.props.widthCol_4) {
            this.setState({ showCol: 5 });
        }
    }
    componentWillMount() {
        this.props.fetchSKU();
        this.updateState(this.props.width);
        this.updateStyle(this.props.docked, this.props.width, this.props.height);
        this.props.updateSearchFavorite(this.props.favorite);
        //this.props.updateShowOrder(this.props.allSKU);
        //this.findOrders(this.props.searchFavorite);
    }
    componentDidMount() {
        //this.findOrders(this.props.searchFavorite);
        //setTimeout(() => { this.setState({ loading: false }); }, 500);
    }
    componentWillReceiveProps = (nextProps) => {
        this.updateStyle(nextProps.docked, nextProps.width, nextProps.height);
        this.updateState(nextProps.width);
        //this.setState({ showSKU: this.props.allSKU });
        this.findOrders(nextProps.searchFavorite, nextProps.searchText);
    }
    changeFavorite = (sku) => {
        this.props.changeFavorite(sku.id, sku.sku_code, sku.favorite);
        this.findOrders(this.props.searchFavorite, this.props.searchText);
    }
    componentWillUnmount() {
        this.props.handleTransitionEnd();
    }
    findOrders(favorite = this.props.searchFavorite, searchText = this.props.searchText) {
        let rs = this.props.allSKU.filter((sku) => {
            if (Number(favorite) == 1) {
                return Number(sku.favorite) == 1;
            } else {
                return Number(sku.favorite) == 0;
            }
        });
        let rs2 = rs.filter((sku) => {
            return sku.sku_name.indexOf(searchText) > -1;
        });
        this.setState({ showSKU: rs2 });
    }
    selectOrder = (sku) => {
        this.props.addToOrder(sku);
        //e.currentTarget.style.backgroundColor;
        //this.refs[key]
        // var img = e.target;
        // var gridTile = img.parentElement;
        // var paper = gridTile.parentElement;
        // if (paper.style.backgroundColor == 'white') {
        //     paper.style.backgroundColor = '#C8E6C9'
        // } else {
        //     paper.style.backgroundColor = 'white';
        // }
    }

    showItemDetail = (sku) => {
        this.props.showItemDetail(sku);
        this.context.router.push('/itemDetail');
    }

    render() {
        if (this.props.displayLoading) {
            return (
                <div style={{ textAlign: 'center' }}>
                    <Loading />
                </div>
            );
        }
        let i = 0;
        return (
            <div>
                <SearchBar searchShowFavorite={false} />
                <div style={{ backgroundColor: '#FFF' /*'#F5F5F5'*/ }}>
                    <Scrollbars style={styles.Scrollbars} >
                        <div style={styles.divList}>
                            <div style={styles.root}>
                                <GridList
                                    cellHeight={190}
                                    style={styles.gridList}
                                    cols={this.state.showCol}
                                >
                                    {this.state.showSKU.map((sku, index) => {
                                        let key = sku.img + (i++);
                                        let checkInvoice = this.props.allOrder.findIndex((rs) => { return rs.id == sku.id });
                                        let invoiceData = this.props.allOrder.find((rs) => { return rs.id == sku.id });
                                        let paperBackground = '';
                                        let iconChangeAmount = '';
                                        if (checkInvoice > -1) {
                                            paperBackground = '#80DEEA';
                                            {/* iconChangeAmount =
                                                <div>
                                                    <IconButton style={{ ...styles.IconRemove, left: 5, }} >
                                                        <Remove color="#EF5350" style={styles.Icon} />
                                                    </IconButton>
                                                    <IconButton style={{ ...styles.IconAdd, right: 5, }} >
                                                        <Add color="#64DD17" style={styles.Icon} />
                                                    </IconButton>
                                                    <div
                                                        style={{
                                                            position: 'absolute',
                                                            bottom: 40, right: '32.5%',
                                                            width: '35%', height: '25px',
                                                            padding: 0, color: 'white', fontSize: '22px',
                                                            background: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)',
                                                        }}
                                                    >
                                                        {invoiceData.amount}
                                                    </div>
                                                </div>; */}

                                        } else {
                                            paperBackground = 'white';
                                        }
                                        iconChangeAmount =
                                            <div>
                                                <IconButton
                                                    style={{
                                                        position: 'absolute', padding: 0,
                                                        top: 0, width: 25, height: 30, right: 0,
                                                        background: 'black',
                                                    }}
                                                >
                                                    <Description
                                                        color="white" hoverColor="gold"
                                                        style={{
                                                            cursor: 'pointer', fontSize: 5,
                                                        }}
                                                        onTouchTap={() => { this.showItemDetail(sku) }}
                                                    //onTouchTap={() => { this.handleOpen(sku) }}
                                                    />
                                                </IconButton>
                                            </div>;
                                        let star = null;
                                        if (Number(sku.favorite)) star = <Star color={"gold"} style={styles.Icon} />
                                        else star = <StarBorder color={"black"} style={styles.Icon} />

                                        return (
                                            <Paper
                                                style={{ ...styles.Paper, backgroundColor: paperBackground, position: 'relative' }}
                                                zDepth={1} key={key}
                                            >
                                                <GridTile
                                                    titleStyle={styles.titleStyle}
                                                    style={{ cursor: 'pointer', position: 'relative' }}
                                                    onTouchTap={(e) => { this.selectOrder(sku) }}
                                                >
                                                    <img src={sku.img} />
                                                </GridTile>
                                                <hr style={styles.line} />
                                                <div style={{ marginTop: '-1px' }} >
                                                    <div style={styles.divShowTitle} >
                                                        <div style={{
                                                            whiteSpace: 'nowrap', overflow: 'hidden',
                                                            textOverflow: 'ellipsis', fontSize: '13px',
                                                        }}
                                                        >
                                                            <strong>{sku.sku_name}</strong>
                                                        </div>
                                                        <div style={{
                                                            fontSize: '12px', color: 'black',
                                                            whiteSpace: 'nowrap', overflow: 'hidden',
                                                            textOverflow: 'ellipsis', marginTop: '0px',
                                                            marginLeft: 5,
                                                        }}
                                                        >
                                                            {Number(sku.sku_price).toLocaleString()} บาท / {sku.sku_unit}
                                                        </div>
                                                        {/* <div style={{
                                                            fontSize: '10px', color: 'black',
                                                            whiteSpace: 'nowrap', overflow: 'hidden',
                                                            textOverflow: 'ellipsis', marginTop: '-2px',
                                                            marginLeft: 5,
                                                        }}
                                                        >
                                                            {sku.min_weight} - {sku.max_weight} {sku.sku_unit}
                                                        </div> */}
                                                    </div>
                                                    <div
                                                        style={{
                                                            float: 'right', textAlign: 'right',
                                                            display: 'inline', marginRight: '-10px',
                                                        }}
                                                    >
                                                        <IconButton
                                                            style={{
                                                                padding: 0, width: 25,
                                                                marginRight: 13, marginTop: -3
                                                            }}
                                                            onTouchTap={() => { this.changeFavorite(sku) }}
                                                        >{/* style={{ padding: 0, width: 25 }} */}
                                                            {star}
                                                        </IconButton>
                                                        {/* <Link to={'/shop/itemdetail/' + sku.id} >
                                                            <IconButton
                                                                style={{ padding: 0, width: 25, marginRight: 10 }}
                                                            >
                                                                <Description
                                                                    color="black"
                                                                    style={styles.Icon}
                                                                    onTouchTap={() => { this.handleOpen(sku) }}
                                                                />
                                                            </IconButton>
                                                        </Link> */}
                                                    </div>
                                                </div>
                                                {iconChangeAmount}
                                            </Paper>
                                        );
                                    })}
                                </GridList>
                            </div>
                        </div>
                    </Scrollbars>
                </div>
            </div>
        );
    }
}

CatalogList.defaultProps = {
    widthCol_1: 300,
    widthCol_2: 600,
    widthCol_3: 1000,
    widthCol_4: 1300,
};

function mapStateToProps(state) {
    return {
        width: state.navLeftMenu.width,
        height: state.navLeftMenu.height,
        searchText: state.search.text,
        searchFavorite: state.search.favorite,
        allSKU: state.shop.allSKU,
        allOrder: state.shop.allOrder,
        docked: state.navLeftMenu.docked,
        displayLoading: state.common.displayLoading,
    }
}

export default connect(mapStateToProps, actions)(CatalogList);
