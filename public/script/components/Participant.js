import React from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import Navbar from './Navbar'
import Moment from 'react-moment';

class Participant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            participants:[],
            showLoader:true
        }
    }

    componentWillMount() {
        axios.get("http://trueorigin-hostapp.us2gu2nqai.us-east-2.elasticbeanstalk.com/demo/participants/" + this.props.location.query.id)
        .then(response => {
                    axios.get("http://trueorigin-hostapp.us2gu2nqai.us-east-2.elasticbeanstalk.com/demo/participants/originlist/" + response.data.demoOriginListId)
                    .then(res => {
                            this.setState({participant: response.data,  originList: res.data.originDataList, showLoader:false});
                        })
                        .catch(err =>{
                            alert(err)
                    })
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
        if(!this.state.participant && !this.state.originList){
            return(
                <div>
                     <Navbar/>
                     {this.renderLoader()}
                </div>
            )
        }
        else{
            return (

                <div>
                    <Navbar/>
                    {this.renderLoader()}
                    <div className = "container" >
                        <h2>
                           {this.state.participant.name}'s {this.state.participant.itemName} 
                        </h2>
                        <div className="table-responsive">
                                <h4>
                                    Origin Statistics
                                </h4>
                            <table className="table table-striped">  
                                <tbody>
                                   {
                                       this.state.originList
                                       .map((item, i) =>(
                                            <tr key={i}>
                                                <td>{item.key}</td>
                                                <td>{item.value}</td>
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
}

export default Participant;