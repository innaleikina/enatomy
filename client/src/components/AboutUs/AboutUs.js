import React, { Component } from 'react';
import "./aboutus.css";
import ArtImage from "../ArtImage"

class AboutUs extends Component {


    render() {
        return (
            <div className="about-us">
                <h2> about us </h2>
                <p className="text">
                Donec vestibulum scelerisque velit, id lobortis arcu. Suspendisse venenatis, nisi non lobortis porttitor, augue velit consectetur augue, sit amet gravida leo quam sed dui. Nunc risus tellus, lacinia eget leo eleifend, venenatis tristique justo. Donec viverra orci nibh, at commodo velit efficitur ac. Mauris posuere justo quis massa porttitor auctor. Etiam ac tristique erat, et pulvinar dui. Donec dictum nibh a ultricies fringilla. Vestibulum eget nisi non tortor pretium pellentesque tincidunt eget magna. Nunc eget efficitur lorem, vel interdum nulla. Vivamus vel porta nisi. Donec dignissim finibus eros, sed tristique justo egestas eu. Praesent posuere metus risus, vel aliquet tellus pellentesque non. Fusce in erat vestibulum, imperdiet justo at, aliquet quam. Praesent tortor velit, efficitur quis tellus nec, rhoncus accumsan justo. Nulla ante ipsum, volutpat scelerisque orci ac, pharetra hendrerit urna. Nunc vitae nisi ut diam laoreet tincidunt.
                </p>
                <div className="art-container">
                   <ArtImage fileName="about-art-1.png"></ArtImage>
                   <ArtImage fileName="about-art-2.png"></ArtImage>
                   <ArtImage fileName="about-art-3.png"></ArtImage>
                </div>
            </div>
        )
    }

};


export default AboutUs;