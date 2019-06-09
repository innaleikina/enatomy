import React, { Component } from 'react';
import API from "../../utils/API";
import "./MyAccount.css";
import { Link } from 'react-router-dom';
import CoverPhoto from '../../components/CoverPhoto';




class MyAccount extends Component {
    state = {
       user:"",
       purchased:"",
       allS3Files:[],
       imagesPurchased:[]
      }

    componentWillMount() {
        this.getUser()
        this.getFiles()
     }

     getFiles = () => {
      API.getFiles() 
        .then(res => this.setState({
          allS3Files:res.data
        }))
        .then(res => this.getPurchasedImages())
        .then(res => this.getTotal())
        .catch(err => console.log(err))
    };
 

    getUser = () => {
        API.fetchUser() 
          .then(res => this.setState({
            user:res.data,
            purchased:res.data.purchased 
          }))
          .catch(err => console.log(err))
      };
  

      getPurchasedImages = () => {
        //  console.log("got images in cart!")
        let s3FilesArr = []
        let purchased = this.state.purchased;
         for (var i = 0; i < this.state.allS3Files.length; i++){
            s3FilesArr.push(this.state.allS3Files[i].filename);
        }
          this.setState({
          imagesPurchased:s3FilesArr.filter(value => -1 !== purchased.indexOf(value))
        }) 
        // console.log(this.state.imagesInCart)
       }

  render() {
    return (
        <div id="timeline-wrap" >
           <h1> Welcome to your account, {this.state.user.name} </h1>
           
           <h3> Purchased Sets </h3>
           {/* render sets that have been purchased before, if lcicked go to imgae page */}
           <div className="purchased-sets">
           {(this.state.imagesPurchased.length > 0) ? 
                  // <div> The is stuff in your cart!!!! </div>
                  this.state.imagesPurchased.map((image,index) => (
                    <div className="imageBtnWrap" key={index}>
                      <Link key={index} to={`/set/${image}`}>
                          <CoverPhoto key={index} fileName={image}>
                          </CoverPhoto>
                      </Link> 
                    </div>
                  ))
                  : <div>You haven't purchased any sets yet</div>}
           </div>

           <h3>Settings </h3>
           {/* when button is clicked a pop up shows up to change password */}
           <button> change password </button>

            { /* pop up to confirm */}
           <button> change password </button>
        </div>
    );
  }
}
export default MyAccount