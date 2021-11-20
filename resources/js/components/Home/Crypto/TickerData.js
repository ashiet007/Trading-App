import React from "react";
import { useSelector } from "react-redux";

const TickerData = (props) => {
    const coin = props.name.replace(props.market, "");
    const cryptocurrencies = useSelector(
        (state) => state.crypto.cryptocurrencies
    );
    return (
        <tr
            onClick={() => props.handleUpdateCurrency(props.name)}
            style={{ cursor: "pointer" }}
        >
            <td style={{ width: "50px" }}>
                {cryptocurrencies[coin.toLowerCase()] &&
                cryptocurrencies[coin.toLowerCase()].logo != null ? (
                    <div className="font-size-22 text-success">
                        <img
                            src={`${process.env.MIX_API_URL}/storage${
                                cryptocurrencies[coin.toLowerCase()].logo
                            }`}
                            className="rounded-circle"
                            style={{ maxWidth: "100%" }}
                        />
                    </div>
                ) : (
                    <div
                        className="avatar-circle"
                        style={{
                            width: "25px",
                            height: "25px",
                        }}
                    >
                        <span
                            className="initials"
                            style={{ top: "-11px", fontSize: "8px" }}
                        >
                            {coin}
                        </span>
                    </div>
                )}
            </td>
            <td style={{ width: "50px" }}>
                <div>
                    <h5 className="font-size-14 mb-1">
                        {coin}/
                        <span className="font-size-12">{props.market}</span>
                    </h5>
                    {parseFloat(props.change) > 0 ? (
                        <p className="text-success mb-0 font-size-12">
                            &#x25B2;{props.change}%
                        </p>
                    ) : (
                        <p className="text-danger mb-0 font-size-12">
                            &#x25BC;{props.change}%
                        </p>
                    )}
                </div>
            </td>
            <td>
                <div className="">
                    <h5 className="font-size-14 text-muted mb-0">
                        &#163;{parseFloat(props.currentValue)}
                    </h5>
                    <p className="text-muted mb-0 font-size-12">
                        {props.amount}
                    </p>
                </div>
            </td>
        </tr>
    );
};

export default TickerData;
