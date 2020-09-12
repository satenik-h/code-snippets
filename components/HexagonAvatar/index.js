import React from 'react';
import PropTypes from 'prop-types';

class HexagonAvatar extends React.Component {
  render() {
    return (
      <div className={"hexagon-avatar " + (this.props.className ? this.props.className : '')} style={this.props.style ? this.props.style : {}}>
        <div className="hexagon" style={{ backgroundImage: `url(${this.props.src})` }}>
          <div className="hexTop"></div>
          <div className="hexBottom"></div>
        </div>
      </div>
    );
  }
}

HexagonAvatar.propTypes = {
  src: PropTypes.string.isRequired,
  style: PropTypes.any,
  className: PropTypes.any
};

export default HexagonAvatar;