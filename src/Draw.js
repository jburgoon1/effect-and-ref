import React, {useState, useRef, useEffect} from 'react'
import axios from "axios"
const Draw = () =>{
const [card, setCard]=useState()
const [deck, setDeck]=useState()
const deckId = useRef('')
const remaining = useRef(52)
const button = useRef()

useEffect(()=>{
    async function getDeck(){
       const newDeck = await axios.get("http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
       deckId.current= newDeck.data.deck_id
    }
    
    getDeck()
    console.log(deck)
}, [])



async function getCard(){
    if(remaining.current === 0 ){
        return alert('All out of cards')
    }
    const newCard = await axios.get(`http://deckofcardsapi.com/api/deck/${deckId.current}/draw/?count=1`)
    
    remaining.current = newCard.data.remaining
    setCard(newCard.data.cards[0].image)
    }
  

return (
    <div>
        <button onClick={getCard}>Draw Card!</button>
        <img src={card}></img>
    </div>
)

}

export default Draw;