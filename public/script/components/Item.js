import React from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import Navbar from './Navbar'
import InputRange from 'react-input-range';
import StarRatingComponent from 'react-star-rating-component';

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            range: { min: 20, max: 100 },
            rating: 1,
            showLoader:true,
            showReviewLoader:false,
            pageNumber:1
        }
    }

    componentWillMount() {
        axios.get("http://trueorigin-hostapp.us2gu2nqai.us-east-2.elasticbeanstalk.com/items/summaries/"+this.props.location.query.id)
        .then(response => {

                axios.get("http://trueorigin-hostapp.us2gu2nqai.us-east-2.elasticbeanstalk.com/reviews/"+this.props.location.query.itemId)
                .then(response2 => {

                        axios.get("http://trueorigin-hostapp.us2gu2nqai.us-east-2.elasticbeanstalk.com/origins/"+this.props.location.query.itemId)
                        .then(response3 => {
                                this.setState({ item: response.data, reviews: response2.data, origins: response3.data, showLoader:false});
                            })
                            .catch(err =>{
                                alert(err)
                                this.setState({ showLoader:false});
                        })
                    })
                    .catch(err =>{
                        alert(err)
                        this.setState({ showLoader:false});
                })

            })
            .catch(err =>{
                alert(err)
                this.setState({ showLoader:false});
        })
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
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

    renderReviewLoader(){
        if(this.state.showReviewLoader){
            return(
                <div className="reviewLoader">
                    <img src="public/images/loader.gif" alt=""/>
                </div>
            )
        }
    }
    loadMoreReviews(){
        this.setState({ showReviewLoader:true});
        axios.get("http://trueorigin-hostapp.us2gu2nqai.us-east-2.elasticbeanstalk.com/reviews/"+this.props.location.query.itemId + "?pageNumber="+this.state.pageNumber)
                        .then(response => {
                                if(response.data.length<3){
                                    const loadMore = this.refs.loadMore;
                                    loadMore.classList.add('disableLoad');
                                    this.setState({ showReviewLoader:false});
                                }
                                var reviews = [...this.state.reviews, ...response.data]
                                this.setState({ reviews: reviews, showReviewLoader:false, pageNumber: this.state.pageNumber+1});
                            })
                            .catch(err =>{
                                const loadMore = this.refs.loadMore;
                                loadMore.classList.add('disableLoad');
                                this.setState({ showReviewLoader:false});
                        })
    }

    renderItem(){
        if(this.state.item && this.state.reviews && this.state.origins){
            return(
                <div>
                    <div className="row item itemPage">
                            <div className="col-md-12 itemImage">
                                <img src={this.state.item.item.imgUrl} alt=""/>
                            </div>
                            <div className="col-md-12">
                               <div className="itemFirstLine">
                                    <div className="itemName">
                                        {this.state.item.item.name}
                                    </div>
                                    <div className="firstLineRight">
                                        <div className="addToCart">
                                            Add To Cart
                                        </div>
                                        <div className="itemPrice">
                                            {'$'+this.state.item.item.price}
                                        </div>
                                    </div>
                                   
                               </div>
                                <div className="itemProducer">
                                    {this.state.item.item.producer.name}
                                </div>
                                <div className="producerImage">
                                        <img src={this.state.item.item.producer.location.imageUrl} alt=""/>
                                        </div>
                                        <div className="producerName">
                                        {this.state.item.item.producer.location.country}, {this.state.item.item.producer.location.region}
                                </div>
                                <div className="itemDescription">
                                    {this.state.item.item.description}
                                </div>
                                <div className="ratingOrigin">
                                    <div className="row">
                                        <div className="col-md-6 col-sm-6 ratingHalf">
                                        <div className="itemRating">
                                            <div className="itemAvg">
                                                {this.state.item.averageRating}
                                            </div>
                                            <div className="itemRating">
                                            <StarRatingComponent 
                                                name="rate2" 
                                                starCount={5}
                                                value={this.state.item.averageRating}
                                                editing={false}
                                                />
                                                <div className="reviewCount">
                                                {this.state.item.reviewCount} Reviews
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                        <a href="#originStats">
                                        <div className="col-md-6 col-sm-6 originHalf" style={{color:'black'}}>
                                            <div className="rightText">   
                                                    {this.state.origins.originDataList.length + ' Origin Statistics'} 
                                            </div>
                                            <div className="logo">
                                                <img src="public/images/logo.png" alt="" />
                                            </div>
                                        </div>
                                        </a>
                                    </div>
                                </div>

                                <div className="reviews">
                                    {
                                        this.state.reviews
                                        .map((item, i) =>(
                                            <div className="reviewMain" key={i}>
                                                <div className="reviewBody">
                                            {item.review} 
                                            </div>
                                            <div className="reviewItem">
                                                    <div className="userImage">
                                                        
                                                    </div>
                                                    <div className="reviewDetails">
                                                        <StarRatingComponent 
                                                            name="rate3" 
                                                            starCount={5}
                                                            value={item.rating}
                                                            editing={false}
                                                        />
                                                        
                                                        <div className="reviewUser">
                                                        {item.username} 
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div onClick={this.loadMoreReviews.bind(this)} className="loadMore" ref="loadMore">
                                    <a className="loadText">Load More Reviews >></a>
                                    {this.renderReviewLoader()}
                                </div>
                                <div className="originStats" id="originStats">
                                    <div className="originMain row">
                                        <div className="table-responsive col-md-6 col-md-offset-3">
                                            <h4 style={{textAlign:'center'}}>
                                                    Origin Statistics
                                                </h4>
                                            <table className="table table-striped">     
                                                <tbody>
                                                {
                                                    this.state.origins.originDataList
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
                            </div>
                            
                        </div>
                                    
                </div>
            )
        }
        else return(
            <div></div>
        )
    }


    render() {
        const { rating } = this.state;
        return (
            <div>
                <Navbar/>
                {this.renderLoader()}
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 col-md-offset-1">
                            {this.renderItem()}
                        </div>
                    </div>
                            
                </div>
            </div>
        )
    }
}

export default Item;