import React, {Component} from 'react';

export default class LoadingAnim extends Component {

  constructor(props) {
    super(props);
  }

    render() {

        return (
          <div className={`ga-loading-animation text-center `+this.props.className}>
            {(this.props.className === 'ga-loader-white') ?
            <img className="ga-loader" src="assets/images/loader.png"/> :
            <img className="ga-loader" src="assets/images/loader-blue.png"/>
            }
            <span>{this.props.message}</span>
          </div>
        )
    }
}
