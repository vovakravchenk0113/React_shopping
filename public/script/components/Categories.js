import React from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import Navbar from './Navbar'

class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories :[
            ],
            showLoader:true
        }
    }

    componentWillMount() {
        axios.get("http://trueorigin-hostapp.us2gu2nqai.us-east-2.elasticbeanstalk.com/categories")
        .then(response => {
            this.setState({ categories: response.data, showLoader:false});
        })
        .catch(err =>{
            //alert(err)
        })
    }

    renderLoader(){
        if(this.state.showLoader){
            return(
                <div className="loader">
                    <img src="public/images/loader.gif" alt=""/>
                </div>
            )
        }
    }


    render() {
        if(this.state.categories){
            return (

                <div>
                    <Navbar/>
                    {this.renderLoader()}
                    <div className="container">
                        <div className="row" style={{}}>
                            <div className="col-md-1 col-md-offset-3 col-sm-1 col-sm-offset-3 col-xs-3">
                                <div className="storeIcon">
                                <i className="fa fa-shopping-bag" aria-hidden="true"></i>
                                </div>
                            </div>
                                <div className="col-md-4 col-sm-4 col-xs-8">
                                    {
                                        this.state.categories
                                        .map((item, i) => (
                                            <a href="/items" key={i}>
                                                <div className="row categories">
                                                    <div className="col-md-2 col-sm-3 col-xs-4">
                                                        <img src={item.imgUrl} alt=""/>
                                                    </div>
                                                    <div className="col-md-8 col-sm-8 col-xs-8">
                                                        {item.name}
                                                    </div>
                                                </div>
                                            </a>
                                        ))
                                    }
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return (

                <div>
                    <Navbar/>
                    {this.renderLoader()}
                </div>
            )
        }
  
    }
}

export default Categories;