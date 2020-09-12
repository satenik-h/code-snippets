import React, {Component} from 'react';
import formSerialize from 'form-serialize';

export default class KycAcceptedDocs extends Component {
    docType = () => this.form && formSerialize(this.form, {hash: true}).docType;

    render() {
        switch (this.props.type) {
            case "ID":
                return (
                    <div>
                        <img src="assets/images/document.png" alt=""/>

                        <h3>Accepted Documents</h3>

                        {window.location.href.includes("intro")
                            ? (
                                <ul>
                                    <li><img src="assets/images/vv.png" alt=""/> Passport</li>
                                    <li><img src="assets/images/vv.png" alt=""/> Driving license</li>
                                    <li><img src="assets/images/vv.png" alt=""/> National ID card</li>
                                    <p className="hidden-md-up">Please make sure the number of your document is visible!</p>
                                    <p className="hidden-md-up">Documents with a MRZ (Machine Readable Zone) are preferred!</p>
                                </ul>
                            )
                            : (
                                <form ref={(form) => this.form = form}>
                                    <div className="radio">
                                        <label className="cursor-pointer">
                                            <input type="radio" name="docType" value="Passport" className="cursor-pointer" defaultChecked/>Passport
                                        </label>
                                    </div>
                                    <div className="radio">
                                        <label className="cursor-pointer">
                                            <input type="radio" name="docType" value="Driving license" className="cursor-pointer"/>Driving license
                                        </label>
                                    </div>
                                    <div className="radio">
                                        <label className="cursor-pointer">
                                            <input type="radio" name="docType" value="ID Card" className="cursor-pointer"/>National ID card
                                        </label>
                                    </div>
                                </form>
                            )}

                        <p className="hidden-sm-down">Please make sure the number of your document is visible!</p>
                        <p className="hidden-sm-down">Documents with a MRZ (Machine Readable Zone) are preferred!</p>
                    </div>
                );
            case "POA":
                return (
                    <div>
                        <img src="assets/images/proof.png" alt=""/>
                        <h3>Accepted Documents</h3>

                        {window.location.href.includes("intro")
                            ? (
                                <ul>
                                    <li><img src="assets/images/vv.png" alt=""/> Bank statement</li>
                                    <li><img src="assets/images/vv.png" alt=""/> Utility bill</li>
                                </ul>
                            )
                            : (
                                <form ref={(form) => this.form = form}>
                                    <div className="radio">
                                        <label className="cursor-pointer">
                                            <input type="radio" name="docType" value="Bank statement" className="cursor-pointer" defaultChecked/>Bank statement
                                        </label>
                                    </div>
                                    <div className="radio">
                                        <label className="cursor-pointer">
                                            <input type="radio" name="docType" value="Utility bill" className="cursor-pointer"/>Utility bill
                                        </label>
                                    </div>
                                    <div className="radio">
                                        <label className="cursor-pointer">
                                            <input type="radio" name="docType" value="Credit card statement" className="cursor-pointer"/>Credit card statement
                                        </label>
                                    </div>
                                </form>
                            )}
                    </div>
                );
            case "FACE":
                return (
                    <div>
                        <h3>First of all a smile for the camera !</h3>
                    </div>
                );
            default:
                return null;
        }
    }
};
