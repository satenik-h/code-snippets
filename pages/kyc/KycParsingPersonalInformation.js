import React, {Component} from 'react';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog';

class KycParsingPersonalInformation extends Component {
    state = {
        selectedDate: this.props.existingDataID.DOB && new Date(this.props.existingDataID.DOB).toDateString()
    };

    getDateString = () => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        const newDate = new Date(this.state.selectedDate);
        const day = newDate.getDay();
        const month = newDate.getMonth();
        const date = newDate.getDate();
        const year = newDate.getFullYear();

        return days[day] + ", " + months[month] + " " + date + ", " + year;
    };

    setDatePickerDialogReference = (ref) => {
        if (ref) {
            ref.handleWindowKeyUp = (...args) => console.log("Dialog tried to call handleWindowKeyUp.");
            ref.handleRequestClose = (...args) => console.log("Dialog tried to call handleRequestClose.");
        }
        this.datePickerDialog = ref;
    };

    setDateReceived = (date) => {
        let yyyy = date.getFullYear().toString();
        let mm = (date.getMonth() + 1).toString();
        let dd = date.getDate().toString();

        let mmChars = mm.split('');
        let ddChars = dd.split('');
        let stringDate = yyyy + '-' + (mmChars[1] ? mm : "0" + mmChars[0]) + '-' + (ddChars[1] ? dd : "0" + ddChars[0]);

        this.setState({
            selectedDate: stringDate
        });
    };

    showDatePicker = () => {
        this.datePickerDialog.show();
    };

    render() {
        const {existingDataID} = this.props;

        return (
            <div className="form-group col-md-6 ga-pr25">
                <div className="col-md-12 ga-sec-auth-title ga-mb20">
                    <span>Personal Informations</span>
                </div>

                <div className="ga-plr20">
                    <div className="row">
                        <div className="col-6">
                            <label htmlFor="kycFirstName">First Name</label>
                            <input type="text" className="form-control" id="kycFirstName"
                                   name="kycFirstName" defaultValue={existingDataID.firstName} required/>
                        </div>

                        <div className="col-6">
                            <label htmlFor="kycLastName">Last Name</label>
                            <input type="text" className="form-control" id="kycLastName"
                                   name="kycLastName" defaultValue={existingDataID.lastName} required/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-4">
                            <label htmlFor="kycGender">Gender</label>
                            <select className="form-control" id="kycGender" name="kycGender"
                                    defaultValue={existingDataID.gender} required>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Unspecified">Other/Unspecified</option>
                            </select>
                        </div>

                        <div className="col-8">
                            <label htmlFor="kycBirthDate">Date of Birth</label>
                            <span className="ga-datepicker-container">
                            <input type="text" className="form-control" id="kycBirthDate"
                                   name="kycBirthDate" value={this.getDateString()} readOnly required/>
                            <i className="fa fa-calendar-plus-o ga-datepicker"
                               aria-hidden="true" id="kycDatepicker" onClick={this.showDatePicker}/>
                        </span>
                        </div>
                    </div>

                    <label htmlFor="kycCountry">Country of Citizenship</label>
                    <input type="text" className="form-control" id="kycCountry" name="kycCountry"
                           defaultValue={existingDataID.nationality} required/>

                    {/*<label htmlFor="kycPhone">Phone</label>*/}
                    {/*<ReactPhoneInput defaultCountry={'us'} buttonStyle={{background: '#f2f2f2', borderColor: '#e0e2ea'}} inputStyle={this.getStyle()} required/>*/}
                </div>

                <DatePickerDialog
                    ref={r => this.setDatePickerDialogReference(r)}
                    firstDayOfWeek={0}
                    autoOk={false}
                    onAccept={date => this.setDateReceived(date)}
                    initialDate={new Date(this.state.selectedDate)}
                    openToYearSelection={true}
                />
            </div>
        );
    }
}

export default KycParsingPersonalInformation;
