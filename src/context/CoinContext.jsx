import { createContext, useEffect, useState, useMemo } from "react";

export const CoinContext = createContext();

const CoinContextProvider = ({ children }) => {
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({ name: "usd", symbol: "$" });

  const fetchAllCoin = async () => {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setAllCoin(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllCoin();
  }, [currency.name]);

  const contextValue = useMemo(
    () => ({ allCoin, currency, setCurrency, setAllCoin }),
    [allCoin, currency]
  );

  return (
    <CoinContext.Provider value={contextValue}>
      {children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
