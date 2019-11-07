import React, { Component } from 'react';
import API from "../../utils/API";
import "./MyAccount.css";
import { Link } from 'react-router-dom';
import CoverPhoto from '../../components/CoverPhoto';
import PasswordReset from '../../components/PasswordReset';
import PopUp from "../../components/PopUp";




class MyAccount extends Component {
    state = {
       user:"",
       purchased:"",
       allS3Files:[],
       imagesPurchased:[],
       deleteAccountClicked:false
      }

    componentWillMount() {
        this.getUser();
        this.getFiles();
     }

     getFiles = () => {
      //  console.log("files were gotten!")
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
       }

       onDeleteAccountClick = () => {
        this.setState({
          deleteAccountClicked:true
        })
       }

       onDeleteAccountConfirm = () => {
         API.deleteUser(this.state.user._id);
         window.location.reload();

       }

       closePopUp = () => {
        this.setState({
           deleteAccountClicked:false,
          })
     }



  render() {
    // console.log(this.props.location)
    return (
        <div id="timeline-wrap" >

          <div className="top-account">
              <span className="title-account"> {this.state.user.name}'s account </span>
              
              

              {/* when button is clicked a pop up shows up to change password */}
              <div className="buttons-container-account">
                  <PasswordReset cssClass="button-account" buttonText="reset password"></PasswordReset>

                    { /* pop up to confirm */}
                    <button className="button-account" id="delete-account" onClick={this.onDeleteAccountClick}> delete account </button>
              </div>
           </div>
          
           {/* render sets that have been purchased before, if lcicked go to imgae page */}
           <div className="purchased-sets">
              <h4 className="title-sets"> Purchased Sets </h4>
              <div className="purchased-all-imgs">
                  {(this.state.imagesPurchased.length > 0) ? 
                          this.state.imagesPurchased.map((image,index) => (
                            <div className="purchased-img" key={index}>
                              <Link key={index} to={`/set/${image}`}>
                                  <CoverPhoto id="purchased-img-border" key={index} fileName={image}>
                                  </CoverPhoto>
                              </Link> 
                            </div>
                          ))
                          : <div>You haven't purchased any sets yet</div>}
              </div>
           </div>

           {this.state.deleteAccountClicked ? <PopUp buttonClicked="deleteUser" fetchUser={this.props.fetchUser} closePopUp={this.closePopUp} deleteUser={
                     <div className="delete-user-pop-up-wrap">
                       <p className="delete-account"> If you want to delete your account all of your information will be lost, including access to already purchased sets. Are you sure you want to delete your account? </p>
                       <div className="empty-cart-button-wrap">
                         <button className="empty-cart-pop-up-button" onClick={this.onDeleteAccountConfirm}> yes </button>
                         <button className="empty-cart-pop-up-button" onClick={this.closePopUp}> no </button>
                       </div>
                     </div>
                   }>
                   
                   </PopUp>: <div></div>}


        </div>




    );
  }
}
export default MyAccount