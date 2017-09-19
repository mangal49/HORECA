import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * Alerts are urgent interruptions, requiring acknowledgement, that inform the user about a situation.
 */
export default class AlertDialog extends React.Component {
    state = {
        open: false,
    };

    constructor(props) {
        super(props);
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const actions = [
            <FlatButton
                label="Ok"
                primary={true}
                onClick={this.handleClose}
            />,
        ];

        return (
            <div>
                <RaisedButton label="Alert" onClick={this.handleOpen} />
                <Dialog
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    {this.props.Message}
                </Dialog>
            </div>
        );
    }
}

AlertDialog.defaultProps = {
    Message: "",
};