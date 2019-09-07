import React from 'react';
import ReactDOM from 'react-dom';
import Ads from './app/components/header';
import Navbar from './app/components/navbar';
import Product from './app/components/product';
import 'bootstrap/dist/css/bootstrap.min.css';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './app/components/redux/reducer/globalReducer';

const storeRedux = createStore(rootReducer);

class Header extends React.Component{
    render(){
        return(
            <div>
                <Navbar/>
                <Ads/>
            </div>
        )
    }
}

ReactDOM.render(<Provider store={storeRedux}><Header/></Provider>, document.getElementById('ads'))
ReactDOM.render(<Provider store={storeRedux}><Product/></Provider>, document.getElementById('product'))