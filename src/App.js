import helmetPic from'./assets/img/helmet-1.png';
import potionPic from './assets/img/potion-1.png';
import ringPic from './assets/img/ring-1.png';
import scrollPic from './assets/img/scroll-1.png';
import shieldPic from './assets/img/shield-1.png';
import swordPic from './assets/img/sword-1.png';
import coverPic from './assets/img/cover.png';
import { useState, useEffect } from 'react';
import Cards from './components/Cards';
import './App.css';

function App() {

  
  const [turns,setTurns] = useState(0);
  const [deckArray , setDeckArray] = useState([]);
  const [choiceFirst , setChoiceFirst] = useState(null);
  const [choiceSecond , setChoiceSecond] = useState(null);
  const [frozen , setFrozen] = useState(false) // disables click on back image


  const cardImage=[
    {src:helmetPic},
    {src:potionPic},
    {src:ringPic},
    {src:scrollPic},
    {src:shieldPic},
    {src:swordPic},
  ];

  useEffect(()=>{
    
    if(choiceFirst && choiceSecond){
     setFrozen(true)
      
      if(choiceFirst.src===choiceSecond.src){
        
        setDeckArray(prevDeck =>prevDeck.map(el=>{
          if(el.src===choiceSecond.src){
            return {...el,matched:true}
          }else{
            return el
          }
        }))

      }
      setTimeout(()=>{ 
        setDeckArray(prevDeck=>prevDeck.map(el=>{
          if(!el.matched){
            return {...el, flipped:false}
          }else{
            return el
          }
          }))
        setFrozen(false);
      },2000)
    
      
      console.log(turns)
      setTurns(prevturns=>prevturns+1)
      setChoiceFirst(null);
      setChoiceSecond(null);
     
    }
  },[choiceSecond])

 

  const shuffleCards = ()=>{
    const deck = [...cardImage,...cardImage]

    //Fisher - Yates shaffle
    for(let i = 0 ; i < deck.length ; i++){ 
      const randomIndex = Math.trunc(Math.random()*(deck.length-i))
      const temp = deck[deck.length-1-i];
      deck[deck.length-1-i] = deck[randomIndex];
      deck[randomIndex] = temp
    }
    const deckId = deck.map(el=>({...el , id:Math.random() , matched:false ,flipped:false}));
    setDeckArray(deckId);
    setChoiceFirst(null);
    setChoiceSecond(null);
    setTurns(0)
  }

  const handleChoice = (card) =>{
    card.flipped=true;
    (choiceFirst? setChoiceSecond(card):setChoiceFirst(card))
    
  }

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <h1 className="turns">{turns? `turn ${turns}` :''}</h1>
      <button onClick={shuffleCards}>New Game</button>
      <Cards 
        deckArray={deckArray} 
        coverPic={coverPic} 
        handleChoice = {handleChoice}
        frozen={frozen}
      />
    </div>
  );
}

export default App;
