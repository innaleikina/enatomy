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
        this.getUser();
        this.getFiles();
     }

     getFiles = () => {
       console.log("files were gotten!")
      API.getFiles() 
        .then(res => this.setState({
          allS3Files:res.data
        }))
        .then(res => this.getPurchasedImages())
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
        console.log("get images ran as well!")
       }

  render() {
    return (
        <div id="timeline-wrap" >
           <span className="title-account"> {this.state.user.name}'s account </span>
           
          

           <h3>Settings </h3>
           {/* when button is clicked a pop up shows up to change password */}
           <button> change password </button>

            { /* pop up to confirm */}
           <button> delete account </button>

          
           {/* render sets that have been purchased before, if lcicked go to imgae page */}
           <div className="purchased-sets">
           <h4 className="title-sets"> Purchased Sets </h4>
           <div className="purchased-all-imgs">
           {(this.state.imagesPurchased.length > 0) ? 
                  this.state.imagesPurchased.map((image,index) => (
                    <div className="purchased-img" key={index}>
                      <Link key={index} to={`/set/${image}`}>
                          <CoverPhoto key={index} fileName={image}>
                          </CoverPhoto>
                      </Link> 
                    </div>
                  ))
                  : <div>You haven't purchased any sets yet</div>}
           </div>
           </div>
        </div>


    );
  }
}
export default MyAccount