import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class AcceptOrder extends React.Component {

    componentWillMount() {
        this.props.setRole('SALE');
    }

    render() {
        return (
            <div>AcceptOrder</div>
        );
    }
}
function mapStateToProps(state) {
    return {
        role: state.auth.role
    }
}

export default connect(mapStateToProps, actions)(AcceptOrder);
