import React, {Component} from 'react';

export default class PreviewBox extends Component {
  render() {

    const {item, deleteItem, id} = this.props;

    return (
      <div className="ga-preview-item">
        <div className="ga-preview-img">
        </div>
        <div className="ga-preview-name">
          <span>{item.name}</span>
          {(!item.deleting) ? <i className="fa fa-times" aria-hidden="true" data-id={id} onClick={deleteItem}></i> : <i className="fa fa-spinner ga-anim-loading" aria-hidden="true"></i>}
        </div>
      </div>
    )
  }
}
