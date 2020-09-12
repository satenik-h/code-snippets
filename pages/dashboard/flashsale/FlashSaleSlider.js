import React from 'react';

const FlashSaleSlider = ({progress, basePrice}) => (
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

        <div className="point point-1 passed"/>
        <div className="point-up point-1">
            <h5 className="m-0 sm-text-small">€{basePrice}</h5>
        </div>
        <div className="point-down point-1">
            <img src="/assets/images/coin3_fill.png"/>
        </div>

        {(progress >= 50)
            ? (
                <div>
                    <div className="point passed point-3"/>
                    <div className="point-up point-3 ml-2">
                        <img src="/assets/images/coin6_fill.png"/>
                    </div>
                </div>
            )
            : (
                <div>
                    <div className="point point-3"/>
                    <div className="point-up point-3 ml-2">
                        <img src="/assets/images/coin6.png"/>
                    </div>
                </div>
            )
        }

        <div className={(progress === 100) ? "point point-5 passed" : "point point-5"}/>
        <div className="point-up point-5 text-right">
            <h5 className="m-0 sm-text-small">€{basePrice + 0.01}</h5>
        </div>
        <div className="point-down point-5">
            {(progress === 100)
                ? (
                    <img src="/assets/images/coin9_fill.png"/>
                )
                : (
                    <img src="/assets/images/coin9.png"/>
                )
            }
        </div>
    </div>
);

export default FlashSaleSlider;
