import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import SearchField from "react-search-field";
import {Route, HashRouter} from "react-router-dom";
import InfoPage from './InfoPage';
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";


const styles = theme => ({
    formLine: {
        backgroundColor : "blue",
    },
    searchField : {
        marginLeft : 700,
        marginTop : 300,
    }

});

class App extends Component {
    state = {
        persons: []
    };

    componentDidMount() {
        axios.get(`http://localhost:8080/euw1/VoidWar`)
            .then(res => {
                const persons = res.data;
                this.setState({persons});
            })
    }

    render() {
        const { classes } = this.props;
        if (window.location.href === "http://localhost/#/info-page") {
            return (
                <HashRouter>
                    <div>
                        <Route exact path="/info-page" component={InfoPage}/>
                    </div>
                </HashRouter>
            )
        } else {
            return (
                <HashRouter>
                    <div>
                        <SearchField
                            placeholder="Search..."
                            //onChange={onChange}
                            classNames={classes.searchField}
                        />
                        <Route exact path='/info-page' component={InfoPage}/>
                    </div>
                </HashRouter>

            )
        }
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(App);
