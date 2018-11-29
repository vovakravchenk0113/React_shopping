import React from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            showNav: false,
            input: ""
        }
    }

    componentWillMount() {
        //API calls here
    }
    toggleNav(){
        this.setState({showNav: !this.state.showNav})
    }
    search(event){
        if(event.charCode==13){
            browserHistory.push('/items?search='+this.refs.search.value)
        }
    }
    
    render() { 
        return(
            <div>
                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#"><span style={{fontSize:"30px",cursor:"pointer"}} onClick={() => this.toggleNav()} >&#9776;</span></a>
                        </div>
                        <form className="nav-form" action="">
                            <i className="fa fa-search" aria-hidden="true"></i>
                            <input type="text" className="form-control" placeholder="Search" name="search" ref="search" onKeyPress={(event) => this.search(event).bind(this)}/>
                        </form>
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="/demo"> EOS hackathon ></a></li>
                            <li><a href="#" className="cart"><i className="fa fa-shopping-cart" aria-hidden="true"></i></a></li>
                        </ul>
                    </div>
                </nav>

                <div id="mySidenav" className="sidenav" style={this.state.showNav?{width:"250px"}:{width:"0"}}>
                    <a href="/categories"><i className="fa fa-shopping-bag" aria-hidden="true"></i> Store</a>
                    <a href="http://www.trueorigin.io" target="_blank"><i className="fa fa-info-circle" aria-hidden="true"></i> Info</a>
                    <a href="/demo" className="rightOptions"><i className="fa fa-link" aria-hidden="true"></i> EOS hanckathon</a>
                    <a href="#" className="rightOptions"><i className="fa fa-shopping-cart" aria-hidden="true"></i> Cart</a>
                </div>
            </div>
        )
    }
}

export default Navbar;