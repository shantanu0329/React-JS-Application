import React, { Component } from 'react';
import {connect} from 'react-redux';
import {helloRedux} from '../Services/actions';

class Home extends Component{

    render(){
        console.log(this.props);
        return (
            <div>
                Home Component
                <button onClick={()=>this.props.helloRedux()}>Click me</button>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch =>({
    helloRedux:()=>dispatch(helloRedux())
})

const mapStateToProps=state=>{

}

const HomeCmp = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)

export default HomeCmp;