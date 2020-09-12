
import React, {Component} from 'react';

export default class InspectorAnim extends Component {
  render() {

    return (
      <div className="ga-inspector-anim">
        <div className="ga-coin-container">
          <img className="ga-coin" src="assets/images/coin-slim.png"/>
        </div>
        <img className="ga-train" src="assets/images/train.png"/>
        <img className="ga-shape" src="assets/images/shape2.png"/>
        <div className="ga-inspector-container">
          <img className="ga-inspector" src="assets/images/inspector.png"/>
          <div className="ga-checked-container">
            <div className="ga-checked-c">
              <img className="ga-checked-base" src="assets/images/checked-base.png"/>
              <img className="ga-checked" src="assets/images/checked.png"/>
              <img className="ga-checked-yellow" src="assets/images/checked-yellow.png"/>
            </div>
          </div>
          <div className="ga-guest-container">
            <img className="ga-guest" src="assets/images/guest.png"/>
          </div>
        </div>
        <div className="ga-road"></div>
        <div className="cloud-container">
          <img className="ga-cloud-1" src="assets/images/cloud-big-n.png"/>
          <img className="ga-cloud-2" src="assets/images/cloud-small-n.png"/>
        </div>
      </div>
    )
  }
}
