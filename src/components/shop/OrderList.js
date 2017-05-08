import React from 'react';
import ReactDOM from 'react-dom';
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
        overflow: 'hidden',
        paddingBottom: '10px'
    },
    Icon: {
        cursor: 'pointer',
    },
    titleStyle: {
        //color: 'rgb(0, 188, 212)',
    },
    Paper: {
        height: 220,
        width: '100%',
        textAlign: 'center',
        display: 'inline-block',
        padding: 5,
        overFlow: 'hidden',
        paddingBottom: 40,
        backgroundColor: "white",
    },
    divShowTitle: {
        float: 'left', textAlign: 'left',
        display: 'inline', width: '50%',
        marginTop: '8px', marginLeft: '7px',
    },
    customContentStyle: {
        width: '98%',
        maxWidth: 'none',
    },
};

class OrderList extends React.Component {
    state = {
        showCol: 4,
        showTileData: [],
        open: false,
        loading: true
    }
    updateState(width) {
        this.divShowTitle = { ...this.divShowTitle, width: '70%' };
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
        this.updateState(this.props.width);
        this.setState({ showTileData: this.props.tilesData });
        this.props.updateShowOrder(this.props.tilesData);
        this.findOrders(this.props.searchFavorite);
    }
    componentDidMount() {
        //this.findOrders(this.props.searchFavorite);
        setTimeout(() => { this.setState({ loading: false }); }, 500);
    }
    componentWillReceiveProps = (nextProps) => {
        this.updateState(nextProps.width);
        this.findOrders(nextProps.searchFavorite, nextProps.searchText);
    }
    changeFavorite = (id) => {
        this.props.changeFavorite(id);
    }
    findOrders(favorite = this.props.searchFavorite, searchText = this.props.searchText) {
        let rs = this.props.tilesData.filter((tiles) => {
            if (favorite) {
                return tiles.favorite;
            } else {
                return true;
            }
        });
        let rs2 = rs.filter((tiles) => {
            return tiles.title.indexOf(searchText) > -1;
        });
        this.setState({ showTileData: rs2 });
    }
    selectOrder = (e, id, obj) => {
        this.props.addToInvoice(obj);
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
    handleOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    render() {
        if (this.state.loading) {
            return (
                <Loading />
            );
        }
        let i = 0;
        return (
            <div style={styles.root}>
                <GridList
                    cellHeight={220}
                    style={styles.gridList}
                    cols={this.state.showCol}
                >
                    {this.state.showTileData.map((tile, index) => {
                        let key = tile.img + (i++);
                        let checkInvoice = this.props.invoiceOrder.findIndex((rs) => { return rs.id == tile.id });
                        let paperBackground = '';
                        if (checkInvoice > -1) {
                            paperBackground = '#C8E6C9';
                        } else {
                            paperBackground = 'white';
                        }
                        let star = null;
                        if (tile.favorite) {
                            star = <Star color={"gold"} style={styles.Icon} />
                        } else {
                            star = <StarBorder color="black" style={styles.Icon} />
                        }
                        return (
                            <Paper
                                style={{ ...styles.Paper, backgroundColor: paperBackground }}
                                zDepth={1}
                                key={key}
                                ref={key}
                            >
                                <GridTile
                                    titleStyle={styles.titleStyle}
                                    style={{ cursor: 'pointer', }}
                                    onTouchTap={(e) => { this.selectOrder(e, tile.id, tile) }}
                                >
                                    <img src={tile.img} />
                                </GridTile>
                                <div
                                    style={{
                                        marginTop: '-5px',
                                    }}
                                >
                                    <div
                                        style={styles.divShowTitle}
                                    >
                                        <div style={{
                                            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                        }}
                                        >
                                            {tile.title}
                                        </div>
                                        <div style={{
                                            fontSize: '12px', color: 'gray',
                                            whiteSpace: 'nowrap', overflow: 'hidden',
                                            textOverflow: 'ellipsis', marginTop: '-2px'
                                        }}
                                        >{tile.author}</div>
                                    </div>
                                    <div
                                        style={{
                                            float: 'right', textAlign: 'right', display: 'inline', marginRight: '-10px',
                                        }}
                                    >
                                        <IconButton
                                            style={{ padding: 0, width: 25 }}
                                            onTouchTap={() => { this.changeFavorite(tile.id) }}
                                        >
                                            {star}
                                        </IconButton>
                                        <Link to="/shop/itemdetail">
                                            <IconButton
                                                style={{ padding: 0, width: 25, marginRight: 10 }}
                                            >
                                                <Description
                                                    color="black"
                                                    style={styles.Icon}
                                                    onTouchTap={this.handleOpen}
                                                />
                                            </IconButton>
                                        </Link>
                                    </div>
                                </div>
                            </Paper>
                        );
                    })}
                </GridList>
            </div>
        );
    }
}

OrderList.defaultProps = {
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
        tilesData: state.shop.tilesData,
        invoiceOrder: state.shop.invoiceOrder,
    }
}

export default connect(mapStateToProps, actions)(OrderList);
