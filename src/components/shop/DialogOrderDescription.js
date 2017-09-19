import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import Checkbox from 'material-ui/Checkbox';

const customContentStyle = {
    width: '98%',
    maxWidth: 'none',
};

class DialogOrderDescription extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const dialogActions = [
            <FlatButton
                label="Close"
                primary={true}
                onClick={this.props.handleClose}
            />,
            <FlatButton
                label="OK"
                primary={true}
                keyboardFocused={true}
                onClick={this.props.handleClose}
            />,
        ];
        return (
            <Dialog
                title="Order Description"
                actions={dialogActions}
                open={this.props.dialogOpen}
                onRequestClose={this.props.handleClose}
                contentStyle={customContentStyle}
                modal={true}
                autoScrollBodyContent={true}
            >
                <Checkbox
                    label="สไลด์ชาบู 100 บาท / กก."
                    style={{ marginTop: 20, fontSize: 14 }}
                />
                <TextField
                    defaultValue=""
                    floatingLabelText="จำนวนที่ต้องการสไลด์ชาบู (กก.)"
                    style={{ marginTop: -10, marginBottom: 20, fontSize: 14 }}
                />
                <Checkbox
                    label="สไลด์สเต็ก 100 บาท / กก."
                    style={{ fontSize: 14 }}
                />
                <TextField
                    defaultValue=""
                    floatingLabelText="จำนวนที่ต้องการสไลด์สเต๊ก (กก.)"
                    style={{ marginTop: -10, fontSize: 14 }}
                />
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

DialogOrderDescription.defaultProps = {
    dialogCancelOpen: false
};

function mapStateToProps(state) {
    return {
        docked: state.navLeftMenu.docked,
        width: state.navLeftMenu.width,
        height: state.navLeftMenu.height,
    }
}

export default connect(mapStateToProps, actions)(DialogOrderDescription);