import React, { useEffect, useState } from 'react'
import InputElement from './InputElement'
import { iconswap } from '../assets/iconswap'
import { getCurrencies } from '../service/Api'

const Inputs = ({currencyFrom, currencyTo, setCurrencyFrom, setCurrencyTo, value, setValue, setRates, setNeededUpdate}) => {
    
    
    const [currencies, setCurrencies] = useState([])
    
    useEffect(() => {
        getCurrencies().then(({data}) => {
            const arrData = Object.values(data)

            setCurrencies(arrData)
            
            setCurrencyFrom(arrData[0])
            setCurrencyTo(arrData[1])
        })
    }, [])
    
    const handleValueNumber = (e) => {
         const valNumber = e.target.value.replace("$ ", "")
        if (valNumber === "0" || Number(valNumber) >= 0) {
            setValue(valNumber);
        }
    }

    const handleSwap = () => {
        const temp = currencyFrom;
        setRates(prev => ({to: prev.from, from: prev.to}));
        setCurrencyFrom(currencyTo);
        setCurrencyTo(temp);
    }
    

    const updateSymbolsFrom = (symbol) => {
        setCurrencyFrom(currencies.find(c => c.symbol === symbol))
        setNeededUpdate(true)
    }

    const updateSymbolsTo = (symbol) => {
        setCurrencyTo(currencies.find(c => c.symbol === symbol))
        setNeededUpdate(true)
    }

  return (
    <div className="card-inputs-elements">
        <InputElement title="Amount"> 
            <input 
            type="text" 
            name="text"
            value={`$ ${value}`} 
            onChange={handleValueNumber}
            />
        </InputElement>

        <InputElement title="from"> 
            <select 
            value={currencyFrom.symbol}
            onChange={(e) => updateSymbolsFrom(e.target.value)}
            name="currencies-from">
                {currencies.map((currency) => (
                    <option key={currency.symbol} value={currency.symbol}>{currency.name}</option>
                ))}
            </select>
        </InputElement>

        <button className="swap-button" onClick={handleSwap}>
            {iconswap()}
        </button>

        <InputElement title="to"> 
            <select 
                value={currencyTo.symbol}
                onChange={(e) => updateSymbolsTo(e.target.value)}
                name="currencies-to">
                {currencies.map((currency) => (
                    <option key={currency.symbol} value={currency.symbol} >{currency.name}</option>
                ))}
            </select>
        </InputElement>
        </div>
  )
}

export default Inputs