import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Star from 'material-ui/svg-icons/toggle/star';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Search from 'material-ui/svg-icons/action/search';


import IconButton from 'material-ui/IconButton';

import TextField from 'material-ui/TextField';



const styles = {
    container: {
        paddingTop: 0,
        width: '100%',
        textAlign: 'center',
        zIndex: 800,
        marginTop: '-14px'
        //backgroundColor: 'white',
    },
    TextField: {
        width: '90%',
        padding: 0,
        margin: 0,
        //backgroundColor: '#FFF'
    },
    textPadding: {
        paddingLeft: '35px',
        // marginTop: 0,
    },
    IconButtonLeft: {
        marginLeft: '-35px'
    },

    StarBorder: {
        cursor: 'pointer',
        color: 'gold',
    },
    Star: {
        cursor: 'pointer',
        color: 'gold',
    },
    Search: {
        marginRight: '-30px',
        marginTop: '20px',
    }

};

class SearchBar extends React.Component {
    // state = {
    //     favorite: false
    // }

    changeFavorite = () => {
        this.props.updateSearchFavorite(!this.props.searchFavorite);
    }

    updateSearchText = (e) => {
        this.props.updateSearchText(e.target.value);
    }

    render() {
        let icon = null;
        if (this.props.searchFavorite) {
            icon = <Star
                style={styles.Star}
                color={"gold"}
            />
        } else {
            icon = <StarBorder
                style={styles.StarBorder}
                hoverColor={"gold"}
            />
        }
        return (
            <div style={styles.container}>

                <Search style={styles.Search} />
                <TextField
                    hintText="สินค้า"
                    floatingLabelText="ค้นหา"
                    style={styles.TextField}
                    hintStyle={styles.textPadding}
                    floatingLabelStyle={styles.textPadding}
                    inputStyle={{
                        ...styles.textPadding,
                    }}
                    onKeyUp={(e) => { this.updateSearchText(e) }}
                />

                <IconButton
                    style={styles.IconButtonLeft}
                    onTouchTap={() => { this.changeFavorite() }}
                >
                    {icon}
                </IconButton>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        width: state.navLeftMenu.width,
        height: state.navLeftMenu.height,
        searchText: state.search.text,
        searchFavorite: state.search.favorite,
    }
}

export default connect(mapStateToProps, actions)(SearchBar);