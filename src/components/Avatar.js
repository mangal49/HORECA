import React from 'react';
import Avatar from 'material-ui/Avatar';
import ListItem from 'material-ui/List/ListItem';

import Chip from 'material-ui/Chip';

// import {
//     blue300,
//     indigo900,
//     orange200,
//     deepOrange300,
//     pink400,
//     purple500,
// } from 'material-ui/styles/colors';

const styles = {
    Avatar: {
        marginTop: '-5px',
        zIndex: 1000,

    },
    chip: {
        textAlign: 'center',
        marginLeft: '53px',
        marginTop: '-18px',
        //width: '100%',
        zIndex: 900,
    },
    styleHrAvatar: {
        margin: 0,
        marginTop: "0px",
        marginBottom: "0px",
        marginLeft: 0,
        height: "1px",
        border: "none",
        backgroundColor: "#BDBDBD"
    },
    UserText: {
        color: 'rgba(0, 138, 255, 0.85)',
        fontSize: '12px',
    }
};

class AvatarShow extends React.Component {
    render() {
        return (
            /*<ListItem
                disabled={true}
                leftAvatar={
                    <Avatar src="../images/uxceo-128.jpg"
                        size={90}
                    />
                }
                style={{ textAlign: 'right', height: '64px', backgroundColor: "rgb(0, 188, 212)", marginTop: "0px" }}
            >
                <div style={styleNameAvatar}>MK Restaurant</div>
            </ListItem>*/
            <div>
                <ListItem
                    disabled={true}
                    style={{ textAlign: 'center', height: '71px', backgroundColor: "#eeeeee" }}
                >
                    <div>
                        <Avatar src="../images/mk_logo.png"
                            size={45}
                            style={styles.Avatar}
                        />
                        <div>
                            MK Restaurant
                            <br />
                            <span style={styles.UserText} >Taylor Swift </span>
                        </div>
                    </div>
                </ListItem>

                <hr style={styles.styleHrAvatar} />
            </div>
        );
    }
}

export default AvatarShow;
