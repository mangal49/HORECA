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
        marginTop: '-15px',
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
                    style={{ textAlign: 'center', height: '71px', backgroundColor: "#D7CCC8"/*"rgb(0, 188, 212)"*/, marginTop: "0px" }}
                >
                    <div>
                        <Avatar src="../images/uxceo-128.jpg"
                            size={85}
                            style={styles.Avatar}
                        />
                        <div>
                            <Chip
                                style={styles.chip}
                            >
                                MK Restaurant
                        </Chip>
                        </div>
                    </div>
                </ListItem>

                <hr style={styles.styleHrAvatar} />
            </div>
        );
    }
}

export default AvatarShow;
