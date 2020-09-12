import React from 'react';
import Switch from 'react-switch';

const KycParsingAddress = ({addressFree, changeAddressFree, existingDataPOA}) => {
    return (
        <div className="form-group col-md-6 ga-pl25">
            <div className="col-md-12 ga-sec-auth-title ga-mb20">
                <div className="d-flex justify-content-between">
                    <span>Address</span>
                    <span>
                        <Switch
                            width={200}
                            height={30}
                            checked={addressFree}
                            onChange={changeAddressFree}
                            uncheckedIcon={
                                <span style={{
                                    position: "relative",
                                    top: "2px",
                                    left: "-115px"
                                }}>
                                    Formatted&nbsp;address
                                </span>
                            }
                            offColor="#86DEE8"
                            checkedIcon={
                                <span style={{
                                    position: "relative",
                                    top: "2px",
                                    left: "30px"
                                }}>
                                    Free&nbsp;form&nbsp;address
                                </span>
                            }
                            onColor="#D6F4F7"
                        />
                    </span>
                </div>
            </div>

            {addressFree
                ? (
                    <div className="ga-plr20">
                        <label htmlFor="kycFullAddress">Full Address</label>
                        <textarea className="form-control" id="kycFullAddress" name="kycFullAddress"
                                  defaultValue={existingDataPOA.fullAddress} rows="6" required/>

                        <label htmlFor="kycCountryResidence">Country of Residence</label>
                        <input type="text" className="form-control" id="kycCountryResidence"
                               defaultValue={existingDataPOA.country} name="kycCountryResidence" required/>
                    </div>
                )
                : (
                    <div className="ga-plr20">
                        <label htmlFor="kycStreet">Street</label>
                        <input type="text" className="form-control" id="kycStreet" name="kycStreet"
                               defaultValue={existingDataPOA.street} required/>

                        <label htmlFor="kycStreet2">Street (line 2)</label>
                        <input type="text" className="form-control" id="kycStreet2" name="kycStreet2"
                               defaultValue={existingDataPOA.street2}/>

                        <div className="row">
                            {/*<div className="col-4">*/}
                            {/*<label htmlFor="kycBuilding">Building</label>*/}
                            {/*<input type="text" className={`form-control ${(this.state.kycBuilding.error) ? 'kyc-error' : ''}`} id="kycBuilding" required/>*/}
                            {/*</div>*/}

                            {/*<div className="col-8">*/}
                            {/*<label htmlFor="kycSubBuilding">Sub Building / Flat</label>*/}
                            {/*<input type="text" className={`form-control ${(this.state.kycSubBuilding.error) ? 'kyc-error' : ''}`} id="kycSubBuilding" required/>*/}
                            {/*</div>*/}

                            <div className="col-6">
                                <label htmlFor="kycLocality">Locality / City</label>
                                <input type="text" className="form-control" id="kycLocality" name="kycLocality"
                                       defaultValue={existingDataPOA.city} required/>
                            </div>

                            <div className="col-6">
                                <label htmlFor="kycRegion">Region / State</label>
                                <input type="text" className="form-control" id="kycRegion"
                                       defaultValue={existingDataPOA.state} name="kycRegion"/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-4">
                                <label htmlFor="kycPostal">Postal Code</label>
                                <input type="text" className="form-control" id="kycPostal"
                                       defaultValue={existingDataPOA.zipCode} name="kycPostal"/>
                            </div>

                            <div className="col-8">
                                <label htmlFor="kycCountryResidence">Country of Residence</label>
                                <input type="text" className="form-control" id="kycCountryResidence" name="kycCountryResidence"
                                       defaultValue={existingDataPOA.country} required/>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default KycParsingAddress;
