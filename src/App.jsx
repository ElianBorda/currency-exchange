import { use, useEffect, useState } from "react"
import background from "./assets/background.png"
import Inputs from "./components/Inputs"


import "./styles/general.css"
import { getRates } from "./service/Api"
import ButtonLink from "./components/ButtonLink"
function App() {

  const [value, setValue] = useState("1")

  const [neededUpdate, setNeededUpdate] = useState(false)

  const [timeDate, setTimeDate] = useState("")
  const [dateNow, setDateNow] = useState("")

  const [rates, setRates] = useState({to: 0.0, from: 0.0})

  const [currencyFrom, setCurrencyFrom] = useState({name: "Euro", symbol: "EUR"})
  const [currencyTo, setCurrencyTo] = useState({name: "US Dollar", symbol: "USD"})


  useEffect(() => {
    setNeededUpdate(false)
    getRates(currencyFrom.symbol).then(({data}) => {
      const rateTo = data.rates[currencyTo.symbol];
      const rateFrom = 1 / rateTo;

      setRates({to: rateTo.toFixed(2), from: rateFrom.toFixed(2)});
    }).catch((err) => {
      console.log("Error fetching rates:", err);
    });

    const date = new Date();

    setTimeDate(`${date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short' 
    })}`);

    setDateNow(date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }))
    
  }, [neededUpdate])

  return (
    <div className="page">
      <img src={background} alt="" />
      <div className="header">
        <p>Currency exchange</p>
      </div>
      <div className="title-convert">
        <p>{value} {currencyFrom.symbol} to {currencyTo.symbol} - Convert {currencyFrom.name} to {currencyTo.name}</p>
      </div>
      <div className="content-card">

        <div className="card">
          <Inputs 
            currencyFrom={currencyFrom} 
            currencyTo={currencyTo} 
            setCurrencyFrom={setCurrencyFrom}
            setCurrencyTo={setCurrencyTo}
            setRates={setRates}
            value={value}
            setValue={setValue}
            setNeededUpdate={setNeededUpdate}
          />

          <div className="card-info">
            <div className="currency-rate-info">
              <p>{value ? value : 0} {currencyFrom.name} = <br /> {Number(value) * rates.to} {currencyTo.name}s</p>
              <p>{value ? value : 0} {currencyTo.symbol} = {Number(value) * rates.from} {currencyFrom.symbol}</p>
            </div>
            <div className="other-info desktop">
              <div className="convert-info">
                <p>We use the mid-market rate for our Converter. This is for informational <br />purposes only. You won’t receive this rate when sending money.</p>
              </div>
              <p className="last-update"><ButtonLink currency={currencyFrom}/> to <ButtonLink currency={currencyTo}/> conversion — Last updated {dateNow}, {timeDate}</p>
            </div>
          </div>
        </div>
        <div className="content-info-update mobile">
          <p className="last-update "><ButtonLink currency={currencyFrom}/> to <ButtonLink currency={currencyTo}/> conversion — Last updated {dateNow}, {timeDate}</p>
        </div>
      </div>
      

    </div>
  )
}

export default App
