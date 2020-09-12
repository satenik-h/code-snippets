import React, {Component} from 'react';
import QueueAnim from 'rc-queue-anim';

export default class Error404 extends Component {
    render() {
        return (
            <div className="page-err">
                <QueueAnim type="bottom" className="ui-animate">
                    <div key="1">
                        <div className="err-container text-center">
                            <div className="err">
                                <h2>Sorry, page not found</h2>
                            </div>
                        </div>
                    </div>
                </QueueAnim>
            </div>
        );
    }
};
