import React from 'react';

const ProgressStep = ({step, progress}) => {
    const realValue = 2 * step + 1;

    if (progress >= (step - 1) * 25) {
        if (progress < step * 25) {
            return (
                <div>
                    <div className={"point point-big passed d-flex align-items-center justify-content-center point-" + step}>
                        <h5 className="m-0 sm-text-small text-white">€{realValue / 100}</h5>
                    </div>
                    <div className={"point-up point-" + step}>
                        <img src={"/assets/images/coin" + realValue + "_fill.png"}/>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div className={"point passed point-" + step}/>
                    <div className={"point-up point-" + step}>
                        <img src={"/assets/images/coin" + realValue + "_fill.png"}/>
                    </div>
                    <div className={"point-down point-" + step}>
                        <h5 className="my-0 sm-text-small">€{realValue / 100}</h5>
                    </div>
                </div>
            );
        }
    }

    return (
        <div>
            <div className={"point point-" + step}/>
            <div className={"point-up point-" + step}>
                <img src={"/assets/images/coin" + realValue + ".png"}/>
            </div>
            <div className={"point-down point-" + step}>
                <h5 className="m-0 sm-text-small">€{realValue / 100}</h5>
            </div>
        </div>
    );
};

export default ProgressStep;
