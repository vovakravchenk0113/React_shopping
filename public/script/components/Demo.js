import React from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import Navbar from './Navbar'
import Moment from 'react-moment';

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            participants:[],
            showLoader:true
        }
    }

    componentWillMount() {
        axios.get("http://trueorigin-hostapp.us2gu2nqai.us-east-2.elasticbeanstalk.com/demo/participants/")
        .then(response => {
                var data = response.data;
                this.setState({ participants: data, showLoader:false});
            })
            .catch(err =>{
                alert(err)
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
        return (

            <div>
                <Navbar/>
                {this.renderLoader()}
                <div className = "container" >
                    <h2>
                        EOS Hackathon Demo
                    </h2>
                    <h4>
                        Participants and Items
                    </h4>
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Item</th>
                                    <th>Date/Time</th>
                                </tr>
                            </thead>
                            <tbody>
                               {
                                   this.state.participants
                                   .map((item, i) =>(
                                      
                                        <tr className="partRow" onClick={event => browserHistory.push('/participant?id='+item.id)} key={i}>
                                            <td>{item.name}</td>
                                            <td>{item.itemName}</td>
                                            <td> 
                                                <Moment unix>
                                                  {item.dateCreated}
                                                </Moment>
                                            </td>
                                        </tr>
                                       
                                   ))
                               }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default Demo;