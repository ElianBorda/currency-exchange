const ButtonLink = ({currency}) => {
  return (
    <button 
        className="link" 
        onClick={() => window.open(`https://www.xe.com/currency/${currency.symbol.toLocaleLowerCase()}-${currency.name.replaceAll(" ", "-").toLocaleLowerCase()}/`, "_blank")   } 
        target="_blank"> {currency.name} </button>
  )
}

export default ButtonLink