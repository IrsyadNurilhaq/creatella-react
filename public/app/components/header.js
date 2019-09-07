import React from "react";
import '../css/header.css';
import Form from 'react-bootstrap/Form';
import {connect} from 'react-redux';
import ActionType from "./redux/reducer/globalActionType";


const URL_API = 'http://localhost:3000/';

class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            urlAds : URL_API + 'ads/?r=' + Math.floor(Math.random()*1000)
        };
    }
    showAds = () => {
      this.setState({
        urlAds : URL_API + 'ads/?r=' + Math.floor(Math.random()*1000)
      })
    }

    handleChange = (e) => {
        this.props.handleChangeSort(e.target.value.toLowerCase());
    }
    componentDidMount(){
        this.showAds();
        setInterval(this.showAds, 20000);
    }

    render(){
        return(
            <div>
                <div className="background-ads">
                    <div className="container">
                        <div className="justify-content-md-center row">
                            <img className="ad" src={this.state.urlAds}/>
                        </div>
                        <div className="sort">
                            <span className="inline" style={{verticalAlign: "bottom"}}>Show all product</span>
                            <div className="inline float-right">
                                <p className="inline"><b> Sort By : </b></p>
                                <Form.Control as="select" className="select" onChange={this.handleChange}>
                                    <option>Size</option>
                                    <option>Price</option>
                                    <option>ID</option>
                                </Form.Control>
                            </div>
                        </div>
                        <hr/>
                        <div className="clearfix"/>
                    </div>
                </div>
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

export default connect(mapStateToProps,mapDispatchToProps)(Header);