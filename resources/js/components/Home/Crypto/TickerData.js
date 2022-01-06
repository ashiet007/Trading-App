import React, { useEffect } from "react";
import { updateActiveTicker } from "../../../utils/store/slice/tickerSlice";
import { useSelector, useDispatch } from "react-redux";
import { updateCryptocurrencies } from "../../../utils/store/slice/tickerSlice";
import { useGetCryptocurrenciesQuery } from "../../../utils/store/services/crypto";

const TickerData = (props) => {
    const coin = props.name.replace(props.market, "");
    const dispatch = useDispatch();
    const { cryptocurrencies } = useSelector((state) => state.ticker);
    const { data, error, isLoading } = useGetCryptocurrenciesQuery();

    const handleUpdateCurrency = (ticker) => {
        dispatch(updateActiveTicker(ticker));
    };

    const RenderPriceIcon = () => {
        if (props.market == "USDT") {
            return "$";
        } else {
            return <span>&#163;</span>;
        }
    };

    useEffect(() => {
        if (data) {
            let cryptocurrenciesList = {};
            data.cryptocurrencies.forEach((item) => {
                cryptocurrenciesList[item.type] = {
                    type: item.type,
                    name: item.name,
                    precision: item.precision,
                    logo: item.logo,
                    quote_precisions: item.quote_precisions,
                };
            });
            dispatch(updateCryptocurrencies(cryptocurrenciesList));
        }
    }, []);

    return (
        <tr
            onClick={() => handleUpdateCurrency(props.name)}
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
                        <RenderPriceIcon />
                        {parseFloat(props.currentValue)}
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
