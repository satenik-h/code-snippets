import React from 'react';
import PropTypes from 'prop-types';

import img_effect_1 from '../../assets/images/common/progressbar-effect-1.png'; // Long
import img_effect_3 from '../../assets/images/common/progressbar-effect-3.png'; // Glow

class ProgressBar extends React.Component {
  render() {
    return (
      <div className={"progress-bar-parsec " + this.props.className}>
        <div className="progress-bar-shell">
          <div className="progress-bar-fill" style={{ width: this.props.value + '%' }}>
            <div className="progress-effect-glow">
              <div className="progress-effect-overlap"/>
              <img src={img_effect_3} className="progress-glow-img"/>
              <div className="progress-effect-smoke">
                <img src={img_effect_1} className="progress-smoke-img-1"/>
                <img src={img_effect_1} className="progress-smoke-img-2"/>
                <img src={img_effect_1} className="progress-smoke-img-3"/>
                <img src={img_effect_1} className="progress-smoke-img-4"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  className: PropTypes.string
};

export default ProgressBar;