import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import Clipboard from 'react-clipboard.js';
import { CrowdsaleActions } from '../../redux/app/actions';

const SOFTCAP = '2,500';
const HARDCAP = '10,759';

class CrowdsaleInfoView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            amount: 0,
            isModalOpen: false,
            ethTotalFunding: 0,
            lowerLimit: 0,
            higherLimit: 0,
            bonusPercent: 0,
            progressBarPercent: 0,
        };
    }

    componentDidMount() {
        const { getCrowdsaleGeneralStatus, getCrowdsaleInvestorStatus, userId, userToken } = this.props;

        const refresh = () => {
            getCrowdsaleGeneralStatus({
                userId: userId,
                token: userToken,
            });

            getCrowdsaleInvestorStatus({
                userId: userId,
                token: userToken,
            });
        }
        refresh();
        this.intervalId = setInterval(refresh, 60 * 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    componentWillReceiveProps(nextProps) {
        const { generalStatusData, investorStatusData } = nextProps;

        if (!generalStatusData) return;

        const {
            // PARSECS_PER_ETHER_BASE,
            raisedFunding,
            pendingFunding,
            BONUS_TIER_1_LIMIT,
            BONUS_TIER_2_LIMIT,
            BONUS_TIER_3_LIMIT,
            BONUS_TIER_4_LIMIT,
            BONUS_TIER_5_LIMIT,
            BONUS_TIER_6_LIMIT,
            BONUS_TIER_7_LIMIT,
            BONUS_TIER_8_LIMIT,
            BONUS_TIER_9_LIMIT,
        } = generalStatusData;

        let totalFunding = parseInt(raisedFunding) + parseInt(pendingFunding);
        let bonus = 0;

        if (totalFunding <= parseInt(BONUS_TIER_1_LIMIT)) {
            bonus = .3;
            this.setState({
                lowerLimit: 0,
                higherLimit: BONUS_TIER_1_LIMIT,
            });
        } else if (totalFunding <= parseInt(BONUS_TIER_2_LIMIT)) {
            bonus = .275;
            this.setState({
                lowerLimit: BONUS_TIER_1_LIMIT,
                higherLimit: BONUS_TIER_2_LIMIT,
            });
        } else if (totalFunding <= parseInt(BONUS_TIER_3_LIMIT)) {
            bonus = .25;
            this.setState({
                lowerLimit: BONUS_TIER_2_LIMIT,
                higherLimit: BONUS_TIER_3_LIMIT,
            });
        } else if (totalFunding <= parseInt(BONUS_TIER_4_LIMIT)) {
            bonus = .225;
            this.setState({
                lowerLimit: BONUS_TIER_3_LIMIT,
                higherLimit: BONUS_TIER_4_LIMIT,
            });
        } else if (totalFunding <= parseInt(BONUS_TIER_5_LIMIT)) {
            bonus = .2;
            this.setState({
                lowerLimit: BONUS_TIER_4_LIMIT,
                higherLimit: BONUS_TIER_5_LIMIT,
            });
        } else if (totalFunding <= parseInt(BONUS_TIER_6_LIMIT)) {
            bonus = .175;
            this.setState({
                lowerLimit: BONUS_TIER_5_LIMIT,
                higherLimit: BONUS_TIER_6_LIMIT,
            });
        } else if (totalFunding <= parseInt(BONUS_TIER_7_LIMIT)) {
            bonus = .15;
            this.setState({
                lowerLimit: BONUS_TIER_6_LIMIT,
                higherLimit: BONUS_TIER_7_LIMIT,
            });
        } else if (totalFunding <= parseInt(BONUS_TIER_8_LIMIT)) {
            bonus = .1;
            this.setState({
                lowerLimit: BONUS_TIER_7_LIMIT,
                higherLimit: BONUS_TIER_8_LIMIT,
            });
        } else if (totalFunding <= parseInt(BONUS_TIER_9_LIMIT)) {
            bonus = .5;
            this.setState({
                lowerLimit: BONUS_TIER_8_LIMIT,
                higherLimit: BONUS_TIER_9_LIMIT,
            });
        } else {
            bonus = 0;
            this.setState({
                lowerLimit: 0,
                higherLimit: 0,
            });
        }

        const price = 1300000000000 * (1 + bonus);
        const tempPercent = (totalFunding - this.state.lowerLimit) / (this.state.higherLimit - this.state.lowerLimit) * 100;

        this.setState({
            ethTotalFunding: totalFunding,
            bonusPercent: bonus * 100,
            progressBarPercent : (tempPercent === Infinity || tempPercent === undefined) ? 0 : tempPercent,
        });
    }

    addCommas = (nStr) => {
        nStr += '';
        let x = nStr.split('.'),
            x1 = x[0],
            x2 = x.length > 1 ? '.' + x[1] : '',
            rgx = /(\d+)(\d{3})/;

        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }

        return x1 + x2;
    }

    germanFormat = (amount, unit) => {
        let postComma = '', preComma = '', stringReverse, _ref, value = 0;

        stringReverse = function(str) {
            return str.split('').reverse().join('');
        };

        if (amount === '0') {
            return amount + ' ' + unit;
        }
        else {
            switch (unit) {
                case 'ETH':
                    value = (parseFloat(amount) / Math.pow(10, 18)).toFixed(3);
                    break;
                case 'PRSC':
                    value = parseFloat(amount) / Math.pow(10, 6);
                    break;
                default:
                    value = amount;
                    break;
            }

            _ref = parseFloat(value).toFixed(3).split('.'), preComma = _ref[0], postComma = _ref[1];
            preComma = stringReverse(stringReverse(preComma).match(/.{1,3}/g).join('.'));
            return '' + preComma + ',' + postComma + ' ' + unit;
        }
    };

    formatEthAmount = (amount, unit) => {
        let value = 0;

        switch (unit) {
            case 'ETH':
                value = parseFloat(amount) / Math.pow(10, 18).toFixed(3);
                return this.addCommas(value) + ' ' + unit;
            case 'PRSC':
                value = parseFloat(amount) / Math.pow(10, 6);
                return this.addCommas(value) + ' ' + unit;
            default:
                return amount;
        }
    }

    getReferralLink = () => {
        return `${window.location.origin}/#/account/signup?refId=${this.props.userId}`;
    }

    onParticipate = () => {
        this.setState({
            isModalOpen: true,
        })
    }

    onAfterModalOpen = () => {
        this.modalForm.style = {
            backgroundColor: 'white',
            padding: '20px',
        };
        this.modalTitle.style.color = '#333';
        this.amountLabel.style.color = '#333';
    }

    closeModal = () => {
        this.setState({
            isModalOpen: false,
        });
    }

    onSend = () => {
        const { closeModal } = this;
        const { amount } = this.state;
        const { userId, userToken, participate } = this.props;

        participate({
            amount: amount,
            userId: userId,
            token: userToken
        });

        closeModal();
    }

    onCancel = () => {
        const { closeModal } = this;

        this.setState({
            amount: 0,
        });

        closeModal();
    }

    onAmountChange = (e) => {
        this.setState({
            amount: (e.target.value || '').replace(/[^0-9\.]/g, ''),
        });
    }

    handleChange = (e) => {}

    render () {
        const { getReferralLink, formatEthAmount, onParticipate, onAfterModalOpen, closeModal, onCancel, onSend, handleChange } = this;
        const { investorStatusData, generalStatusData, softcap, hardcap, currentBonusTier, prscToEthRate, ethAcquired, prscSold, crowdsaleStatus, prscAllocated } = this.props;
        const { isModalOpen, bonusPercent, ethTotalFunding, lowerLimit, higherLimit, progressBarPercent } = this.state;

        const ethRemaining = (higherLimit - ethTotalFunding).toString();

        const modalStyle =  {
            overlay: {
                zIndex: 1000,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },

            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                minWidth: '300px',
                width: '60vw',
                padding: '50px',
                transform: 'translate(-50%, -50%)',
            }
        };

        const barWidth = 500;
        const barHeight = 40;
        const softcapValue = 5;
        const hardcapValue = 9;
        const currentValue = 7;

        return (
            <div className='content-form content-wrapper'>
                <div className='row'>
                    <div>
                        <h1>Crowdsale</h1>
                    </div>
                </div>
                <div className='row mt-3 info-block d-flex flex-column'>
                    <div className='row pl-4 mb-2'>
                        <label className='crowdsale-heading'>{`CURRENT BONUS: ${bonusPercent}%`}</label>
                    </div>
                    <div className='row d-flex align-items-center justify-content-center mb-2'>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', width: '95%', height: '36px', backgroundColor: '#FF8C00' }}>
                            {
                                ethTotalFunding !== 0 &&
                                <div style={{ width: `${progressBarPercent}%`, height: 'inherit', backgroundColor: '#00BFFF' }}>
                                </div>
                            }
                            {
                                <label className='crowdsale-progress-label' style={{ position: 'absolute', left: 'calc(50% - 94px)', marginBottom: '0', color: 'white' }}>{`${formatEthAmount(ethRemaining, 'ETH')} REMAINING`}</label>
                            }
                        </div>
                    </div>
                    <div className='row d-flex align-items-center justify-content-center'>
                        <div className='col-3 d-flex align-items-center justify-content-center'>
                            <label className='crowdsale-heading'>{`${formatEthAmount((parseFloat(generalStatusData ? generalStatusData.raisedFunding : '0') + 699.5 * Math.pow(10, 18)), 'ETH')} RAISED`}</label>
                        </div>
                        <div className='col-3 d-flex align-items-center justify-content-center'>
                            <label className='crowdsale-heading'>{`${formatEthAmount(generalStatusData ? generalStatusData.pendingFunding : 0, 'ETH')} PENDING`}</label>
                        </div>
                        <div className='col-3 d-flex align-items-center justify-content-center'>
                            <label className='crowdsale-heading'>{`SOFT CAP: ${SOFTCAP} ETH`}</label>
                        </div>
                        <div className='col-3 d-flex align-items-center justify-content-center'>
                            <label className='crowdsale-heading'>{`HARD CAP: ${HARDCAP} ETH`}</label>
                        </div>
                    </div>
                </div>
                <div className='row crowdsale-content mt-3'>
                    <div className='col-md-8 pl-0'>
                        <div className='mr-4 info-block'>
                            <div className='form-group row d-flex align-items-center justify-content-center mb-3'>
                                <label className='col-md-4 crowdsale-heading'>Price</label>
                                <label className='col-md-8 crowdsale-heading current'>1 ETH = 1,300,000 PRSC</label>
                            </div>
                            <div className='form-group row d-flex align-items-center justify-content-center mb-3'>
                                <label className='col-md-4 crowdsale-heading'>My pending ETH</label>
                                <label className='col-md-8 crowdsale-heading current'>
                                    {
                                        investorStatusData &&
                                        <span>{formatEthAmount(investorStatusData.pendingContributionOf, 'ETH')}</span>
                                    }
                                </label>
                            </div>
                            <div className='form-group row d-flex align-items-center justify-content-center mb-3'>
                                <label className='col-md-4 crowdsale-heading'>My pending Parsecs</label>
                                <label className='col-md-8 crowdsale-heading current'>
                                    {
                                        investorStatusData &&
                                        <span>{formatEthAmount(investorStatusData.pendingParsecsOf, 'PRSC')}</span>
                                    }
                                </label>
                            </div>
                            <div className='form-group row d-flex align-items-center justify-content-center mb-3'>
                                <label className='col-md-4 crowdsale-heading'>My contribution</label>
                                <label className='col-md-8 crowdsale-heading current'>
                                    {
                                        investorStatusData &&
                                        <span>{formatEthAmount(investorStatusData.contributionOf, 'ETH')}</span>
                                    }
                                </label>
                            </div>
                            <div className='form-group row d-flex align-items-center justify-content-center mb-3'>
                                <label className='col-md-4 crowdsale-heading'>My Parsecs</label>
                                <label className='col-md-8 crowdsale-heading current'>
                                    {
                                        investorStatusData &&
                                        <span>{formatEthAmount(investorStatusData.parsecsOf, 'PRSC')}</span>
                                    }
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4 info-block'>
                        <div className='form-group row d-flex flex-column align-items-center justify-content-center'>
                            <label className='crowdsale-heading'>Crowdsale status</label>
                            <label className='crowdsale-heading current'>Started{/*{crowdsaleStatus ? crowdsaleStatus : 'Not started'}*/}</label>
                        </div>
                        <div className='form-group row d-flex flex-column align-items-center justify-content-center mb-4'>
                            <label className='crowdsale-heading'>Parsecs sold</label>
                            <label className='crowdsale-heading current'>
                                {
                                    generalStatusData &&
                                    <span>{formatEthAmount(generalStatusData.spentParsecs, 'PRSC')}</span>
                                }
                            </label>
                        </div>
                        <div className='form-group row d-flex flex-column align-items-center justify-content-center'>
                            <button
                                type='button'
                                className='btn btn-primary'
                                onClick={onParticipate}>
                                Participate
                            </button>
                        </div>
                    </div>
                </div>
                {/*<div className='row mt-5 info-block'>
                {
                    <div>
                        <div style={{ display: 'flex', flexDirection: 'row', width: `${barWidth}px`, height: `${barHeight}px` }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: `${softcapValue * 100 / hardcapValue}%`, height: 'inherit', borderRight: '1px solid blue' }}>
                            {
                                currentValue >= softcapValue &&
                                <div style={{ width: '100%', height: '20px', backgroundColor: 'green' }}>
                                </div>
                            }
                            {
                                currentValue < softcapValue &&
                                <div style={{ width: `${currentValue * 100 / softcapValue}%`, height: '20px', backgroundColor: 'green' }}>
                                </div>
                            }
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', width: `${(hardcapValue - softcapValue) * 100 / hardcapValue}%`, height: 'inherit', borderRight: '1px solid red'}}>
                            {
                                currentValue >= softcapValue &&
                                <div style={{ width: `${(currentValue - softcapValue) / (hardcapValue - softcapValue) * 100}%`, height: '20px', backgroundColor: 'green' }}>
                                </div>
                            }
                            {
                                currentValue >= softcapValue &&
                                <div style={{ width: `${(hardcapValue - currentValue) / (hardcapValue - softcapValue) * 100}%`, height: '20px', backgroundColor: 'gray' }}>
                                </div>
                            }
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', width: `${barWidth + 100}px` }}>
                            <label style={{ marginLeft: `calc(${softcapValue / hardcapValue * 100}% - 85px)` }}>Soft cap</label>
                            <label style={{ marginLeft: `calc(${(currentValue - softcapValue) / hardcapValue  * 100}% - 75px)` }}>Eth acquired</label>
                            <label style={{ marginLeft: '25px' }}>Hard cap</label>
                        </div>
                    </div>
                }
                </div>*/}
                <div className='row crowdsale-content'>
                    <div className='col-12 info-block'>
                        <label className='crowdsale-heading'>
                            Invite a friend via Referral link
                            <Clipboard option-text={getReferralLink} component="a" button-title='Click to copy referral link.'>
                                <i className="fa fa-copy ml-2" style={{ fontSize: 16, cursor: 'pointer' }}></i>
                            </Clipboard>
                        </label>
                        <pre className='crowdsale-heading active boxed'>{ getReferralLink() }</pre>
                    </div>
                </div>
                <ReactModal
                    isOpen={isModalOpen}
                    onAfterOpen={onAfterModalOpen}
                    onRequestClose={closeModal}
                    style={modalStyle}
                    closeTimeoutMS={400}
                    ariaHideApp={false}
                >
                    <div ref={modalForm => this.modalForm = modalForm}>
                        <div className='form-block'>
                            <h5 ref={modalTitle => this.modalTitle = modalTitle}>Deposit Ether from this wallet to Crowdsale contract</h5>
                            <div style={{color: '#777', fontSize: '14px', marginBottom: '15px'}}>
                                <b>Notice:</b> Minimal pledge amount is <b>0.1 ETH</b>, transaction fee of
                                <b>~0.01-0.02 ETH</b> is not included! Do not deposit everything you have!
                            </div>
                            {/*<div className='row mb-2'>
                                <h6 ref={addressLabel => this.addressLabel = addressLabel} className='col-4'>To Address:</h6>
                                <input type='text' className='col-8' value={this.state.to} onChange={this.onAddressChange} />
                            </div>*/
                            }
                            <div className='row mb-2'>
                                <h6 ref={amountLabel => this.amountLabel = amountLabel} className='col-4'>Amount, ETH:</h6>
                                <input type='text' className='col-8' style={{border: '1px solid #ccc'}} value={this.state.amount} onChange={this.onAmountChange} />
                            </div>
                            <div className='row d-flex align-items-end justify-content-end'>
                                <button
                                    ref={cancelButton => this.cancelButton = cancelButton}
                                    className='btn btn-danger mr-2'
                                    onClick={onCancel}
                                >
                                    Cancel
                                </button>
                                <button
                                    ref={sendButton => this.sendButton = sendButton}
                                    className='btn btn-success'
                                    onClick={onSend}
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </ReactModal>
            </div>
        );
    }
}

CrowdsaleInfoView.propTypes = {
    userId: PropTypes.string,
    userToken: PropTypes.string,
    participateStarting: PropTypes.bool,
    participate: PropTypes.func,
    generalStatusData: PropTypes.object,
    investorStatusData: PropTypes.object,
    getCrowdsaleGeneralStatus: PropTypes.func,
    getCrowdsaleInvestorStatus: PropTypes.func,
    crowdsaleGeneralStatusGetting: PropTypes.bool,
    crowdsaleInvestorStatusGetting: PropTypes.bool,
};

const mapStateToProps = (state) => {
    return {
        userToken: state.userReducer.userToken,
        userId: state.userReducer.userId,
        participateStarting: state.crowdsaleReducer.participateStarting,
        generalStatusData: state.crowdsaleReducer.generalStatusData,
        investorStatusData: state.crowdsaleReducer.investorStatusData,
        crowdsaleGeneralStatusGetting: state.crowdsaleReducer.crowdsaleGeneralStatusGetting,
        crowdsaleInvestorStatusGetting: state.crowdsaleReducer.crowdsaleInvestorStatusGetting,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        participate: (req) => dispatch(CrowdsaleActions.participate(req.amount, req.userId, req.token)),
        getCrowdsaleGeneralStatus: (req) => dispatch(CrowdsaleActions.getCrowdsaleGeneralStatus(req.userId, req.token)),
        getCrowdsaleInvestorStatus: (req) => dispatch(CrowdsaleActions.getCrowdsaleInvestorStatus(req.userId, req.token)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CrowdsaleInfoView);
