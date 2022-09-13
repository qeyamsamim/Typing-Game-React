import React from "react";
import { IoSpeedometerSharp } from "react-icons/io5";

const SpeedIndicator = ({chars, allChars, time}) => {

    if (allChars !== "") {

        if (chars !== 0 && time !== 0) {

            const wpm = (chars / 5) / (time / 60);
            const totalChars = allChars.replace(" ", "").split("").length;
            const accuracy = Math.floor((chars / totalChars) * 100);

            return <div className="row">
                <div className="col-6">
                    <h6><IoSpeedometerSharp className="wpm-icon mb-1" /> WPM: {Math.floor(wpm)}</h6>
                </div>
                <div className="col-6">
                    <h6>Accuracy: {accuracy} %</h6>
                </div>
            </div>
        }
    }
}

export default SpeedIndicator;