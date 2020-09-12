import React from 'react';

import ProgressStep from './ProgressStep';

const ProgressSlider = ({progress}) => {
    const getProgressStep = () => {
        let result = [];
        for (let i = 2; i < 5; i++) {
            result.push(
                <ProgressStep key={"step" + i} step={i} progress={progress}/>
            );
        }
        return result;
    };

    return (
        <div className="position-relative slider">
            {(progress === 100)
                ? (
                    <div className="slider-filled slider-filled-100"/>
                )
                : ((progress === 0)
                    ? (
                        <div className="slider-filled" style={{display: 'none'}}/>
                    )
                    :(
                        <div className="slider-filled" style={{width: progress + '%'}}/>
                    )
                )
            }
            <div className="slider-filled hidden-xs-up"/>

            <div className={"point point-1" + (progress >= 25 ? " passed" : "")}/>
            <div className="point-up point-1">
                <h6 className="m-0 sm-text-small">Pre Sale Start</h6>
                <h5 className="m-0 sm-text-small">€0.03</h5>
            </div>
            <div className={"point-down point-1" + (progress >= 25 ? " passed" : "")}>
                <img src="/assets/images/coin3_fill.png"/>
            </div>

            {getProgressStep(progress)}

            <div className={(progress === 100) ? "point point-5 passed" : "point point-5"}/>
            <div className="point-up point-5 text-right">
                <h6 className="m-0 sm-text-small">Pre Sale End</h6>
                <h5 className="m-0 sm-text-small">€0.11</h5>
            </div>
            <div className="point-down point-5"/>
        </div>
    );
};

export default ProgressSlider;
