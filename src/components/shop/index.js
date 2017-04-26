import React, { Component } from 'react';


import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn />;


import { Tabs, Tab } from 'material-ui/Tabs';
const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
};

import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
const styles2 = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        width: 1000,
        height: 450,
        overflowY: 'auto',
    },
};

const tilesData = [
    {
        img: 'images/grid-list/00-52-29-429_640.jpg',
        title: 'Breakfast',
        author: 'jill111',
    },
    {
        img: 'images/grid-list/burger-827309_640.jpg',
        title: 'Tasty burger',
        author: 'pashminu',
    },
    {
        img: 'images/grid-list/camera-813814_640.jpg',
        title: 'Camera',
        author: 'Danson67',
    },
    {
        img: 'images/grid-list/morning-819362_640.jpg',
        title: 'Morning',
        author: 'fancycrave1',
    },
    {
        img: 'images/grid-list/hats-829509_640.jpg',
        title: 'Hats',
        author: 'Hans',
    },
    {
        img: 'images/grid-list/honey-823614_640.jpg',
        title: 'Honey',
        author: 'fancycravel',
    },
    {
        img: 'images/grid-list/vegetables-790022_640.jpg',
        title: 'Vegetables',
        author: 'jill111',
    },
    {
        img: 'images/grid-list/water-plant-821293_640.jpg',
        title: 'Water plant',
        author: 'BkrmadtyaKarki',
    },
];

/**
 * A simple example of `BottomNavigation`, with three labels and icons
 * provided. The selected `BottomNavigationItem` is determined by application
 * state (for instance, by the URL).
 */
class Shop extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 'a',
        };
    }

    handleChange = (value) => {
        this.setState({
            value: value,
        });
    };

    select = (index) => this.setState({ selectedIndex: index });

    render() {
        return (
            <div>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                >
                    <Tab label="Tab A" value="a">
                        <div style={styles2.root}>
                            <GridList
                                cellHeight={180}
                                style={styles2.gridList}
                            >
                                <Subheader>December</Subheader>
                                {tilesData.map((tile) => (
                                    <GridTile
                                        key={tile.img}
                                        title={tile.title}
                                        subtitle={<span>by <b>{tile.author}</b></span>}
                                        actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                                    >
                                        <img src={tile.img} />
                                    </GridTile>
                                ))}
                            </GridList>
                        </div>
                    </Tab>
                    <Tab label="Tab B" value="b">
                        <div>
                            <h2 style={styles.headline}>Controllable Tab B</h2>
                            <p>
                                This is another example of a controllable tab. Remember, if you
              use controllable Tabs, you need to give all of your tabs values or else
              you wont be able to select them.
            </p>
                        </div>
                    </Tab>
                </Tabs>



                <Paper zDepth={1}>
                    <BottomNavigation selectedIndex={this.state.selectedIndex}>
                        <BottomNavigationItem
                            label="Recents"
                            icon={recentsIcon}
                            onTouchTap={() => this.select(0)}
                        />
                        <BottomNavigationItem
                            label="Favorites"
                            icon={favoritesIcon}
                            onTouchTap={() => this.select(1)}
                        />
                        <BottomNavigationItem
                            label="Nearby"
                            icon={nearbyIcon}
                            onTouchTap={() => this.select(2)}
                        />
                    </BottomNavigation>
                </Paper>
            </div>
        );
    }
}

export default Shop;