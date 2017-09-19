import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const customContentStyle = {
    width: '98%',
    maxWidth: 'none',
};

class DialogCancel extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const dialogActions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.props.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={this.props.handleClose}
            />,
        ];
        return (
            <Dialog
                title="Reason for cancel order."
                actions={dialogActions}
                open={this.props.dialogCancelOpen}
                onRequestClose={this.props.handleClose}
                contentStyle={customContentStyle}
                modal={true}
            >
                <TextField
                    hintText=""
                    floatingLabelText="Description"
                    multiLine={true}
                    rows={4}
                    fullWidth={true}
                />
            </Dialog>
        );
    }
}

DialogCancel.defaultProps = {
    dialogCancelOpen: false
};

function mapStateToProps(state) {
    return {
        docked: state.navLeftMenu.docked,
        width: state.navLeftMenu.width,
        height: state.navLeftMenu.height,
    }
}

export default connect(mapStateToProps, actions)(DialogCancel);