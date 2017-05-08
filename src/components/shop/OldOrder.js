import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class OldOrder extends React.Component {
    componentWillMount() {
        this.props.setRole('SHOP');
    }

    render() {
        return (
            <div>Old Order</div>
        );
    }
}
function mapStateToProps(state) {
    return {
        role: state.auth.role
    }
}

export default connect(mapStateToProps, actions)(OldOrder);
