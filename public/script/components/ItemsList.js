import React from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import Navbar from './Navbar'
import InputRange from 'react-input-range';
import StarRatingComponent from 'react-star-rating-component';

class ItemsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            range: { min: 0, max: 100 },
            rating: 1,
            items :[],
            done:null,
            input:null,
            showLoader:true,
            selectedLocation:"all"
        }
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

    componentWillMount() {
        if(this.props.location.query.search == undefined){
            axios.get("http://trueorigin-hostapp.us2gu2nqai.us-east-2.elasticbeanstalk.com/items/summaries/list/")
            .then(response => {
                axios.get("http://trueorigin-hostapp.us2gu2nqai.us-east-2.elasticbeanstalk.com/locations/countrys")
                    .then(res => {
                            if(response.data.length<1){
                                this.setState({ done:false, showLoader:false, locations: res.data });
                            }
                            else{
                                this.setState({ items: response.data, done:true, showLoader:false, locations: res.data});
                            }
                    })
                    .catch(err =>{
                            alert(err)
                    })
               
            })
            .catch(err =>{
                    alert(err)
            })
        }
        else{
            axios.get("http://trueorigin-hostapp.us2gu2nqai.us-east-2.elasticbeanstalk.com/items/summaries/list/"+this.props.location.query.search)
            .then(response => {
                axios.get("http://trueorigin-hostapp.us2gu2nqai.us-east-2.elasticbeanstalk.com/locations/countrys")
                    .then(res => {
                            if(response.data.length<1){
                                this.setState({ done:false, showLoader:false, locations: res.data });
                            }
                            else{
                                this.setState({ items: response.data, done:true, showLoader:false, locations: res.data});
                            }
                    })
                    .catch(err =>{
                            alert(err)
                    })
            })
            .catch(err =>{
                alert(err)
                this.setState({ done:false});
            })
        }
       
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    }


    dynamicSort(property) {
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            var result = (a[property] > b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }
    dynamicSortPriceHighToLow() {
        var sortOrder = 1;
        return function (a,b) {
            var result = (a["item"].price > b["item"].price) ? -1 : (a["item"].price > b["item"].price) ? 1 : 0;
            return result * sortOrder;
        }
    }

    dynamicSortPriceLowToHigh() {
        var sortOrder = 1;
        return function (a,b) {
            var result = (a["item"].price < b["item"].price) ? -1 : (a["item"].price > b["item"].price) ? 1 : 0;
            return result * sortOrder;
        }
    }


    sortItems(){
        var key = this.refs.order.value;
        var items = this.state.items;
        console.log(key)
        if(key=="HighestRated"){
            items.sort(this.dynamicSort("averageRating"));
        }
        else if(key=="highToLow"){
            items.sort(this.dynamicSortPriceHighToLow())
        }
        else if(key=="lowToHigh"){
            items.sort(this.dynamicSortPriceLowToHigh())
        }
        this.setState({items:items})
    }

    renderSearchHeader(){
        if(this.props.location.query.search!=undefined){
            return(
                <h3>Search results for <b>{this.props.location.query.search}</b></h3>
            )
        }
    }

    renderItems(){
        if(this.state.done==true){
            return(
                <div className="items">
                {this.renderSearchHeader()}
                                {
                                    this.state.items
                                    .filter(item=>item.item.price>this.state.range.min && item.item.price<this.state.range.max && item.averageRating>=this.state.rating && this.state.selectedLocation=="all"?(item.item.producer.location.country):(item.item.producer.location.country==this.state.selectedLocation))
                                    .map((item, i) => (
                                        <a href={'/item?id='+ item.id + '&itemId=' + item.item.id}  key={i}>
                                            <div className="row item">
                                                <div className="col-md-6 itemImage">
                                                    <img src={item.item.imgUrl} alt=""/>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="itemName">
                                                        {item.item.name}
                                                    </div>
                                                    <div className="itemDescription">
                                                        {item.item.description}
                                                    </div>
                                                    <div className="itemPrice">
                                                        {'$'+item.item.price}
                                                    </div>
                                                    <div className="itemProducer">
                                                        {item.item.producer.name}
                                                    </div>
                                                    <div className="itemRating">
                                                        <div className="itemAvg">
                                                            {item.averageRating}
                                                        </div>
                                                        <div className="itemRating">
                                                        <StarRatingComponent 
                                                            name="rate2" 
                                                            starCount={5}
                                                            value={item.averageRating}
                                                            editing={false}
                                                            />
                                                            <div className="reviewCount">
                                                            {item.reviewCount} Reviews
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            <div>
                                                <div className="itemFooter row">
                                                    <div className="footerLeft col-md-6 col-sm-6">
                                                            <div className="producerImage">
                                                            <img src={item.item.producer.location.imageUrl} alt=""/>
                                                            </div>
                                                            <div className="producerName">
                                                            {item.item.producer.location.country}, {item.item.producer.location.region}
                                                            </div>
                                                    </div>
                                                    <div className="col-md-6 col-sm-6">
                                                            <div className="footerRight">
                                                                    <div className="rightText">   
                                                                            {item.achievement}
                                                                    </div>
                                                                    <div className="logo">
                                                                        <img src="public/images/logo.png" alt=""/>
                                                                    </div>
                                                            </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    ))
                                }
                        </div>
            )
        }
        else if(this.state.done==false){
            return(
                <div style={{textAlign:'center', fontSize:'2rem', marginTop:'2rem'}}>
                    No items found.
                </div>
            )
        }
    }


    render() {
        const { rating } = this.state;
        if(this.state.locations){
            return (
                <div>
                    <Navbar/>
                    {this.renderLoader()}
                    <div className="container">
                        <div className="itemsMain">
                            <div className="row filters">
                                <div className="col-md-2 priceRange">
                                    <label htmlFor="price">Price Range</label>
                                    <span style={{float:"right", fontWeight:'bold'}}>${this.state.range.min} - ${this.state.range.max}</span>
                                    <InputRange
                                            maxValue={100}
                                            minValue={0}
                                            value={this.state.range}
                                            onChange={range => this.setState({ range })} />
                                </div>
                                <div className="col-md-3 rating">
                                <label htmlFor="rating">Rating</label>
                                <div>
                                <StarRatingComponent 
                                        name="rate1" 
                                        starCount={5}
                                        value={rating}
                                        onStarClick={this.onStarClick.bind(this)}
                                        />
                                </div>
                                </div>
                                <div className="col-md-4">
                                    <label>Region:</label>
                                    <select className="form-control" id="region" ref="region" onChange={value=>this.setState({selectedLocation:this.refs.region.value})}>
                                        <option value="all">All regions</option>
                                        {
                                            this.state.locations
                                            .map((item, i) => (
                                                <option value={item} key={i}>{item}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="col-md-3">
                                <label>Sort:</label>
                                    <select className="form-control" id="order" ref="order" onChange={this.sortItems.bind(this)}>
                                        <option value="">Select sort order</option>
                                        <option value="HighestRated">Highest Rated</option>
                                        <option value="highToLow">Price high to low</option>
                                        <option value="lowToHigh">Price low to high</option>
                                    </select>
                                </div>
                            </div>
                            {this.renderItems()}
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

export default ItemsList;