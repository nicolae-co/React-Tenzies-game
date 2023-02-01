function Die(props) {
    return (
        <div 
            className={props.isHeld ? "die-face bg-green" : "die-face"}
            onClick={props.holdDice}    
        >
            <h2 className="die-num">{props.number}</h2>
        </div>
    )
}

export default Die
