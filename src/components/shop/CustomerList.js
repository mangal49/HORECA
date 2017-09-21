import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import AppBar from 'material-ui/AppBar';
import SearchBar from '../SearchBar';
import { Scrollbars } from 'react-custom-scrollbars';
import MobileTearSheet from './MobileTearSheet';

import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors';

import IconButton from 'material-ui/IconButton';
import Check from 'material-ui/svg-icons/action/check-circle';


const styles = {
    container: {
        position: 'relative',//relative,absolute
        top: '0px',
        width: '100%',
    },
    tabs: {
        position: 'fixed',
        width: '100%',
        zIndex: 900,
    },
    Scrollbars: {
        height: 0,
    },
    divList: {
        position: 'relative',//relative,absolute
        width: '100%',
        textAlign: 'center',
        zIndex: 700,
    },
    root: {
        position: 'relative',//relative,absolute
        width: '100%',
        textAlign: 'center',
        zIndex: 600,
    },
    divContent: {
        float: 'left',
        width: '40%',
        marginTop: -20,
        marginLeft: -20,
    },
    listItemHeader: {
        textAlign: 'left', width: '100%',
        marginLeft: 10, paddingTop: 13,
        height: '20px',
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
    },
    listItemDetail: {
        color: lightBlack,
        textAlign: 'left', width: '100%',
        marginLeft: 10, paddingTop: 6,
        height: '18px',
        fontSize: '12px',
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
    },
    divAmount: {
        float: 'right',
        width: '40%',
        marginRight: 10
    },
};

class CustomerList extends React.Component {
    static contextTypes = {
        router: PropTypes.object
    }
    state = {
        showCustomer : []
    }
    updateStyle(docked, width, height) {
        if (docked) {
            styles.container = { ...styles.container, top: '56px' };
            styles.tabs = { ...styles.tabs, 'paddingLeft': 0, width: width - 255 };
            styles.Scrollbars = { ...styles.Scrollbars, height: height - 160 };
            styles.divContent = { ...styles.divContent, marginLeft: 25, width: '50%', };
            
            styles.divAmount = { ...styles.divAmount, marginRight: 10, width: '40%', };
        } else {
            styles.container = { ...styles.container, top: '56px' };
            styles.tabs = { ...styles.tabs, 'paddingLeft': 0, width: '100%' };
            styles.Scrollbars = { ...styles.Scrollbars, height: height - 160 };
            styles.divContent = { ...styles.divContent, marginLeft: -10, width: '50%', };

            styles.divAmount = { ...styles.divAmount, marginRight: -10, width: '50%', };
        }
    }
    componentWillMount() {
        this.props.showMenuTabCatalog();
        this.updateStyle(this.props.docked, this.props.width, this.props.height);
        this.findCustomer();
    }
    componentDidMount(){
    }

    componentWillReceiveProps(nextProps, nextState) {
        this.updateStyle(nextProps.docked, nextProps.width, nextProps.height);
    }

    findCustomer() {
        this.setState({ showCustomer:this.props.listCustomer, });
    }
    selectCustomer(cust){
        this.props.selectCustomer(cust);
    }

    render(){
        return (
            <div style={styles.container}>
                <div style={styles.tabs}>
                    <AppBar 
                        title="เลือกร้านที่ต้องการสั่งซื้อ"
                        titleStyle={{
                            fontSize:16, marginTop:-10,
                        }}
                        style={{ height: "48px" }}
                        iconStyleLeft={{display:'none'}}
                    />
                    {/* <SearchBar searchShowFavorite={false} /> */}
                    <div style={{ backgroundColor: '#FFF' /*'#F5F5F5'*/ }}>
                        <Scrollbars style={styles.Scrollbars} >
                            <div style={styles.divList}>
                                <div style={styles.root}>
                                    <MobileTearSheet>
                                        <List>
                                            {this.state.showCustomer.map((cust, index) => {
                                                return (
                                                        <div key={index}>
                                                            <ListItem
                                                                leftAvatar={
                                                                    <Avatar
                                                                        //color={"white"}
                                                                        //size={45}
                                                                        //backgroundColor={"red"}
                                                                        src={cust.cust_img}
                                                                        size={45}
                                                                        style={{marginTop:3}}
                                                                    />
                                                                }
                                                                //rightIconButton={rightIconMenu}
                                                                style={{ height: 35 }}
                                                                disabled={true}
                                                            >
                                                                <div style={styles.divContent}>
                                                                    <div style={styles.listItemHeader}>{cust.ship_to_name}</div>
                                                                    <div style={styles.listItemDetail}>
                                                                        &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>{cust.cust_name}</span><br />
                                                                        &nbsp;&nbsp;&nbsp;<span style={{ color: lightBlack }}>{cust.ship_branch_name}</span> 
                                                                    </div>
                                                                </div>
                                                                <div style={styles.divAmount}>
                                                                    <div style={{ marginTop: -15 }} >
                                                                        <IconButton
                                                                            style={{ float: 'right', marginRight: 0, marginTop: 5 }}
                                                                            onTouchTap={(e) => { this.selectCustomer(cust) }}
                                                                        >
                                                                            <Check
                                                                                style={{ cursor: 'pointer',fontSize:100, }}
                                                                                viewBox={'50 50 50 50'}
                                                                                color="gold"
                                                                                hoverColor="green"
                                                                                //onTouchTap={this.handleOpen}
                                                                                viewBox="0 0 24 24"
                                                                            />
                                                                        </IconButton>
                                                                    </div>
                                                                </div>
                                                            </ListItem>
                                                            <Divider inset={true} />
                                                        </div>
                                                    );
                                            })}
                                        </List>
                                    </MobileTearSheet> 
                                </div>
                            </div>
                        </Scrollbars>
                    </div>
                </div>
            </div>
        );
    }
}

//หากมีการเรียกใช้ Props จาก Redux ให้ mapStateToProps ด้วย
function mapStateToProps(state) {
    return {
        role: state.auth.role,
        width: state.navLeftMenu.width,
        height: state.navLeftMenu.height,
        open: state.navLeftMenu.open,
        docked: state.navLeftMenu.docked,

        listCustomer: state.auth.user_data.list_customer,
    }
}

export default connect(mapStateToProps, actions)(CustomerList);
