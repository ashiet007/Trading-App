import React from "react";
import { updateActiveForex } from "../../../utils/store/slice/forexSlice";
import { useDispatch } from "react-redux";

const TickerData = (props) => {
    const dispatch = useDispatch();
    const handleUpdateTicker = (ticker) => {
        dispatch(updateActiveForex(ticker));
    };
    return (
        <tr
            onClick={() => handleUpdateTicker(props.ticker)}
            style={{ cursor: "pointer" }}
        >
            <td style={{ width: "50px" }}>
                {props.logo == "NA" || props.logo == null ? (
                    <div className="avatar-circle">
                        <span className="initials">{props.ticker}</span>
                    </div>
                ) : (
                    <div className="font-size-22 text-success">
                        <img
                            src={props.logo}
                            className="rounded-circle"
                            style={{ maxWidth: "100%" }}
                        />
                    </div>
                )}
            </td>
            <td style={{ width: "50px" }}>
                <div>
                    <h5 className="font-size-14 mb-1">{props.name}</h5>
                    <p className="text-success mb-0 font-size-12">
                        {props.ticker}
                    </p>
                </div>
            </td>
        </tr>
    );
};

export default TickerData;
