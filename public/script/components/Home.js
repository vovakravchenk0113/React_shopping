import React from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import Navbar from './Navbar'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {
        //API calls here
    }
    

    render() {
        return (

            <div>
                <Navbar/>
                <div className = "container" >
            Home page. </div>
            </div>
        )
    }
}

export default Home;