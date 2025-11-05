import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LineChart from "../../components/lineChart/LineChart";

import "./Coin.css";

const Coin = () => {
  const { coinId } = useParams();
  const [coin, setCoin] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchCoin = async () => {
      const res = await fetch(
        //! `https://api.coingecko.com/api/v3/coins/${coinId}`

        `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false`
      );
      const data = await res.json();
      setCoin(data);
    };

    const fetchChart = async () => {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=30&interval=daily`
      );
      const data = await res.json();

      const formattedData = data.prices.map((item) => ({
        date: new Date(item[0]).toLocaleDateString("en-IN", {
          month: "short",
          day: "numeric",
        }),
        price: item[1],
      }));

      setChartData(formattedData);
    };

    fetchCoin();
    fetchChart();
  }, [coinId]);

  if (!coin) return <h2>Loading coin...</h2>;

  console.log("Chart Data:", chartData);

  return (
    coin && (
      <div className="coin-page-wrapper">
        {/* Main Card */}
        <div className="coin-main-card">
          {/* Header */}
          <div className="coin-top-row">
            <img src={coin.image.large} className="coin-logo" alt={coin.name} />

            <div className="coin-title">
              <h1>
                {coin.name} <span>{coin.symbol.toUpperCase()}</span>
              </h1>
              <p className="rank-badge">Rank #{coin.market_cap_rank}</p>
            </div>
          </div>

          {/* Price */}
          <div className="price-section">
            <h2 className="price">
              ${coin.market_data.current_price.usd.toLocaleString()}
            </h2>
            <span
              className={`price-change ${
                coin.market_data.price_change_percentage_24h > 0
                  ? "green"
                  : "red"
              }`}>
              {coin.market_data.price_change_percentage_24h.toFixed(2)}%
            </span>
          </div>

          <button className="info-btn">📊 Why is price moving today?</button>

          {/* Stats */}
          <div className="grid-box">
            <div className="item">
              <span>Market cap</span>{" "}
              <b>${coin.market_data.market_cap.usd.toLocaleString()}</b>
            </div>
            <div className="item">
              <span>Volume (24h)</span>{" "}
              <b>${coin.market_data.total_volume.usd.toLocaleString()}</b>
            </div>
            <div className="item">
              <span>FDV</span>{" "}
              <b>
                ${coin.market_data.fully_diluted_valuation.usd.toLocaleString()}
              </b>
            </div>
            <div className="item">
              <span>Vol/Mkt Cap</span>{" "}
              <b>
                {(
                  coin.market_data.total_volume.usd /
                  coin.market_data.market_cap.usd
                ).toFixed(2)}
                %
              </b>
            </div>
            <div className="item">
              <span>Circulating Supply</span>{" "}
              <b>
                {coin.market_data.circulating_supply.toLocaleString()}{" "}
                {coin.symbol.toUpperCase()}
              </b>
            </div>
            <div className="item">
              <span>Max Supply</span>{" "}
              <b>{coin.market_data.max_supply?.toLocaleString() || "∞"}</b>
            </div>
          </div>
        </div>

        {/* <div className="coin-chart" style={{ width: "100%", height: "450px" }}> */}
        <div
          className="coin-chart"
          style={{ width: "100%", height: "450px", marginBottom: "60px" }}>
          {/* <h3>Bitcoin Price Chart (30 days)</h3> */}
          <h2>{coin?.name} Price Chart (30 days)</h2>
          {!chartData ? (
            <p>Loading chart...</p>
          ) : (
            <LineChart data={chartData} />
          )}
        </div>
      </div>
    )
  );
};

export default Coin;
