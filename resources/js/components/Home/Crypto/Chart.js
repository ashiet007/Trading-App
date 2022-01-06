import React from "react";
import { useSelector } from "react-redux";
import TradingViewWidget, { Themes } from "react-tradingview-widget";

const Chart = () => {
    const { activeMarket, activeTicker } = useSelector((state) => state.ticker);
    return (
        <div className="card">
            <div className="card-header align-items-center d-flex">
                <h4 className="card-title mb-0 flex-grow-1">
                    {activeTicker.replace(activeMarket, "")}/{activeMarket}
                </h4>

                <div className="flex-shrink-0">
                    <h4 className="card-title mb-0 flex-grow-1">
                        <span className="text-muted mb-0 font-size-11">
                            Last Price
                        </span>
                    </h4>
                </div>
            </div>
            <div className="card-body">
                <TradingViewWidget
                    symbol={activeTicker}
                    theme={Themes.LIGHT}
                    locale="in"
                    width={700}
                    height={400}
                />
            </div>
        </div>
    );
};

export default Chart;
