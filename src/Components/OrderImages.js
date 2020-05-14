import React, { Component } from 'react';
import { image_url } from './../Services/constants';

class OrderImages extends Component {

    render(){
        // console.log(this.props.order_status);
        if(this.props.order_status==='collected' || this.props.order_status==='delivered'){
            let img_path="";
            if(this.props.order_type==='collection'){
                img_path = (image_url) +'/history_collected_grey.jpg';
            }
            else{
                img_path = (image_url) +'/history_delivered_grey.jpg';

            }
            return (
                <div className="panel-body img-center" >
                    <div className="col-md-3">
                        <a href="# " data-toggle="modal" data-target="#gridSystemModal">
                            <img src={ img_path } height="80px" width="500px" alt="running_late" />
                        </a>
                    </div>
                </div>
            );
        }
        return (
            <div className="panel-body img-center" >
                <div className="col-md-3">
                    <a href="# " data-toggle="modal" data-target="#gridSystemModal">
                        <img src={image_url + 'running_late_green.jpg'} height="80px" width="100px" alt="running_late" />
                    </a>
                </div>
                <div className="col-md-3">
                    <a href="/">
                        <img src={image_url + 'cooking_green.jpg'} height="80px" width="100px" alt="cooking" />
                    </a>
                </div>
                <div className="col-md-3">
                    <a href="/">
                        <img src={image_url + 'its_ready_red.jpg'} height="80px" width="100px" alt="its ready" />
                    </a>
                </div>
                <div className="col-md-3">
                    <a href="/">
                        <img src={image_url + 'delivered_red.jpg'} height="80px" width="100px" alt="collected" />
                    </a>
                </div>
            </div>
        );
    }
   
}

export default OrderImages;