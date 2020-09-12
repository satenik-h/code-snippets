import React from 'react';
import PropTypes from 'prop-types';

import img_icon_normal from '@/assets/images/landing/roadmap-step-empty.png';
import img_icon_active from '@/assets/images/landing/roadmap-step-active.png';
import img_icon_fill from '@/assets/images/landing/roadmap-step-fill.png';

// import {Modal} from 'antd';

class RoadMapXlStep extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      is_open: false
    };

    this.toggleOpen = this.toggleOpen.bind(this);
  }

  toggleOpen() {
    // this.setState({
    //   is_open: !this.state.is_open
    // });

    // Modal.info({
    //   title: this.props.title,
    //   content: (
    //     <div>
    //       {this.props.description}
    //     </div>
    //   ),
    //   onOk() {
    //   },
    //   wrapClassName: 'vertical-center-modal'
    // });
  }

  render() {
    const current_class = "roadmap-xl-step" + (this.props.isActive ? " active" : "") + (this.props.isFill ? " fill" : "");

    return (
      <div className={current_class}>
        <div className="roadmap-icon" style={{ top: this.props.iconY, left: this.props.iconX }}>
          <img className="img-icon icon-normal" src={img_icon_normal} onClick={this.toggleOpen}/>
          <img className="img-icon icon-active" src={img_icon_active} onClick={this.toggleOpen}/>
          <img className="img-icon icon-fill" src={img_icon_fill} onClick={this.toggleOpen}/>
        </div>
        <div className="roadmap-text" style={{ top: this.props.textY, left: this.props.textX }}>
          <span className="roadmap-title">{this.props.title}</span>
          <p className="roadmap-description">{this.props.description}</p>
        </div>

        {this.state.is_open &&
        <div className="roadmap-popup" onClick={this.toggleOpen}>
          <div className="roadmap-popup-title">
            <span>{this.props.title}</span>
          </div>
          <div className="roadmap-popup-text">
            <span>{this.props.description}</span>
          </div>
        </div>
        }
      </div>
    );
  }
}

RoadMapXlStep.propTypes = {
  iconX: PropTypes.string.isRequired,
  iconY: PropTypes.string.isRequired,
  textX: PropTypes.string.isRequired,
  textY: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  isFill: PropTypes.bool.isRequired
};

export default RoadMapXlStep;