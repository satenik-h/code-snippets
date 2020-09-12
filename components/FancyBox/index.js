import React from 'react';
import PropTypes from 'prop-types';
import './fancybox.scss';

class FancyBox extends React.Component {
  render() {
    return (
      <div className={"fancy-box " + this.props.className} style={this.props.style ? this.props.style : {}}>
        <div className="fancy-box-top">
          <div className="fancy-box-top-left"/>
          <div className="fancy-box-top-center">
            <div className="fancy-box-top-effect">
              <div className="fancy-box-top-effect-1"/>
              <div className="fancy-box-top-effect-2"/>
              <div className="fancy-box-top-effect-3"/>
            </div>
          </div>
          <div className="fancy-box-top-right"/>
        </div>
        <div className="fancy-box-middle">
          <div className="fancy-box-middle-left">
          </div>
          <div className="fancy-box-middle-center">
            {this.props.children}
          </div>
          <div className="fancy-box-middle-right">
          </div>
          <div className="fancy-box-left-effect">
            <div className="fancy-box-left-effect-1"/>
            <div className="fancy-box-left-effect-2"/>
            <div className="fancy-box-left-effect-3"/>
          </div>
          <div className="fancy-box-right-effect">
            <div className="fancy-box-right-effect-1"/>
            <div className="fancy-box-right-effect-2"/>
            <div className="fancy-box-right-effect-3"/>
          </div>
        </div>
        <div className="fancy-box-bottom">
          <div className="fancy-box-bottom-left"/>
          <div className="fancy-box-bottom-center">
            <div className="fancy-box-bottom-effect">
              <div className="fancy-box-bottom-effect-1"/>
              <div className="fancy-box-bottom-effect-2"/>
              <div className="fancy-box-bottom-effect-3"/>
            </div>
          </div>
          <div className="fancy-box-bottom-right"/>
        </div>
      </div>
    );
  }
}

FancyBox.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  style: PropTypes.object
};

export default FancyBox;
