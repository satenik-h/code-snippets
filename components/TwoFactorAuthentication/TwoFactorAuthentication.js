import React from 'react';
import formSerialize from 'form-serialize';

const OTPdigits = 6;
const maxI = OTPdigits - 1;

const TwoFactorAuthentication = ({onSubmit, onCancel}) => {
    const onKeyDown = (i, e) => {
        const chars = document.getElementsByClassName('charinputs');
        switch (e.which) {
            case 8:
            case 46:
                e.preventDefault();
                if (chars[i].value) {
                    chars[i].value = "";
                } else {
                    chars[Math.max(i - 1, 0)].focus();
                }
                break;
            case 37:
                e.preventDefault();
                chars[Math.max(i - 1, 0)].focus();
                break;
            case 9:
            case 39:
                e.preventDefault();
                chars[Math.min(i + 1, maxI)].focus();
                break;
            case 13:
                e.preventDefault();
                if (i === maxI) {
                    let code = "";
                    for (let i = 0; i < OTPdigits; i++) {
                        code += chars[i].value;
                    }
                    onSubmit(code);
                }
                break;
        }
    };

    const onKeyPress = (i, e) => {
        e.preventDefault();
        const chars = document.getElementsByClassName('charinputs');
        if (e.key) {
            chars[i].value = e.key;
            chars[Math.min(i + 1, maxI)].focus();
        }
    };

    const onInput = (i, e) => {
        const chars = document.getElementsByClassName('charinputs');
        if (chars[i].value.length >= 1) {
            chars[i].value = chars[i].value[0];
            chars[Math.min(i + 1, maxI)].focus();
            e.preventDefault();
        }
    };

    const getInputFields = () => {
        let result = [];
        for (let i = 1; i <= OTPdigits; i++) {
            result.push(
                <input type="text" key={i} name={i} maxLength="1" placeholder="-"
                       className="charinputs primary-border text-medium font-weight-bold text-center"
                       onKeyDown={e => onKeyDown(i - 1, e)}
                       onKeyPress={e => onKeyPress(i - 1, e)}
                       onInput={e => onInput(i - 1, e)} required/>
            );
        }
        return result;
    };

    const onSubmitForm = (e) => {
        e.preventDefault();

        let code = "";
        const ser = formSerialize(e.target, { hash: true });
        for (let i = 1; i <= OTPdigits; i++) {
            code += ser[i.toString()];
        }
        onSubmit(code);
    };

    const onLoad = () => {
        document.getElementsByClassName('charinputs')[0].focus();
    };

    return (
        <form className="form-horizontal tfa" method="POST" onSubmit={onSubmitForm} onLoad={onLoad}>
            <fieldset className="mb-3">
                <div className="form-group d-flex justify-content-center mt-3">
                    {getInputFields()}
                </div>

                <div className="form-group mt-5 text-center">
                    <button className="btn btn-round btn-gray">
                        <img src="/assets/images/lock.png"/>
                        <span className="space"/>
                        <span>Verify</span>
                    </button>

                    <button className="btn btn-round btn-gray ml-2" type="cancel" onClick={onCancel}>
                        <i className="fa fa-times"/>
                        <span className="space"/>
                        <span>Cancel</span>
                    </button>
                </div>
            </fieldset>
        </form>
    );
};

export default TwoFactorAuthentication;
