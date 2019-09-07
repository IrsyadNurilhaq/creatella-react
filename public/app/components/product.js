import React from "react";
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import {Row, Col} from 'react-bootstrap';
import Axios from 'axios';
import '../css/product.css';
import {connect} from 'react-redux';
import spinner from '../../public/image/spinner.gif';


const URL_API = 'http://localhost:3000/';
class Product extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            showData : [],
            page: 1,
            sortBy : 'size',
            loading : false,
            end : false,
        };
        this.myRef = React.createRef();
        this.listenScrollEvent = this.listenScrollEvent.bind(this)
    }
    loadData = (url) => {
        let urlProduct = URL_API + 'api/products?_page='+ this.state.page +'&_limit=16&_sort='
        return new Promise(resolve => {
            Axios.get(urlProduct + url).then(res => {
                resolve(res.data)
            })
        })
    }
    showData = (data) => {
        this.setState({data : data})
        const showData = data.map((data,index) => {
            let num = data.price;
            let dollars = num / 100;
            dollars = dollars.toLocaleString("en-US", {style:"currency", currency:"USD"});
            
            let today = new Date();
            let createdOn = new Date(data.date);
            let msInDay = 24 * 60 * 60 * 1000;
    
            createdOn.setHours(0,0,0,0);
            today.setHours(0,0,0,0)
            let diff = (+today - +createdOn)/msInDay

            var monthNames = [
                "January", "February", "March",
                "April", "May", "June", "July",
                "August", "September", "October",
                "November", "December"
              ];
            
              var day = createdOn.getDate();
              var monthIndex = createdOn.getMonth();
              var year = createdOn.getFullYear();

              var formatDate = monthNames[monthIndex] + ' ' + day + ', ' + year
            
          return(
            <Col lg={3} md={4} xs={6} className="margin-15" key={index}>
                <div className="card" ref={this.myRef}>
                    <Card.Body>
                        <Card.Title 
                            className="detail-product" 
                            style={{fontSize: `${ data.size }px`}}>
                            {data.face}
                        </Card.Title>
                        <Card.Text 
                            className="align-text-bottom text-center">
                            <span className="grey">{data.size} px</span> | 
                            <span className="green"> {dollars}</span>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted"> {diff <= 7 ? diff + " days ago" : formatDate} </small>
                    </Card.Footer>
                </div>
            </Col>
          );
      })
      this.setState({showData : showData})
    
    }

    handleLoading = () => {
        this.setState({loading : !this.state.loading})
    }
    async listenScrollEvent(){
        if((window.innerHeight + window.scrollY) === document.body.scrollHeight && this.state.end === false) {
            this.handleLoading()
            await this.setState({page : this.state.page + 1 })
            const data =  await this.loadData(this.props.sortBy);
            if(data.length <= 0 ) this.setState({end: true})
            this.setState({ 
                data: this.state.data.concat(data)
            },async() => {
                await this.showData(this.state.data);
                this.handleLoading()
            })
            
        }
    };
    async componentDidMount(){
        window.addEventListener('scroll', this.listenScrollEvent);
        this.handleLoading()
        const data =  await this.loadData(this.props.sortBy); 
        await this.showData(data);
        window.scrollTo(0, 0)
        this.handleLoading()
    }
    async UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.sortBy !== this.state.sortBy){
            await this.setState({page:1,end:false})
            this.handleLoading()
            this.setState({sortBy : nextProps.sortBy})
            const data =  await this.loadData(nextProps.sortBy); 
            await this.showData(data);
            window.scrollTo(0, 0)
            this.handleLoading()
        }
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.listenScrollEvent);
    }
    render(){
        return(
            <div className="container">
                
                <div className="products">
                
                    {
                        this.state.loading ? <div className="loading">
                            <img src={spinner} className="spinner"/>
                            <p className="text-loading">loading ... </p>
                        </div> : undefined
                    }
                    <CardDeck>
                        <Row>
                            {this.state.showData}
                        </Row>
                    </CardDeck>
                </div>
                {
                    this.state.end ? 
                        <div className="end">
                        <p>~ end of catalogue ~</p>
                    </div> : undefined
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        sortBy : state.sortBy
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleChangeSort : (sortBy) => dispatch({type : ActionType.CHANGE_SORT, sortBy : sortBy})
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Product);