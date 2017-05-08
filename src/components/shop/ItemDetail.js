import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router';

const styles = {
    container : {
        position: 'fixed',
        top : '56px',
    },
    content :{
        position: 'relative',
        top : 0,
    }
};

class ItemDetail extends React.Component {
    updateStyle(docked){
        if (docked) {
            styles.container = { ...styles.container , top: '0px'};
        } else {
            styles.container = { ...styles.container , top: '56px'};
        }
    }
    componentWillMount() {
        this.props.setRole('SHOP');
        this.updateStyle(this.props.docked)
    }
    componentWillReceiveProps(nextProps, nextState) {
        this.updateStyle(nextProps.docked)
    }
    // componentWillUpdate(nextProps, nextState) {
    //     this.updateStyle(nextProps.docked)
    // }
    render() {
        return (
            <div style={styles.container}>
                <div style={styles.content}>
                    <Link to='/shop/order'>Back</Link>
                    <div>Item Detail 1</div>
                    <div>Item Detail 2</div>
                    <div>Item Detail 3</div>
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

export default connect(mapStateToProps,actions)(ItemDetail);
