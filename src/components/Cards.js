import { useState, useEffect } from 'react';
import './Cards copy.css'

const Cards = (props)=>{
    const {coverPic , deckArray , handleChoice,frozen  } = props;

    return(
        <div className="deck__grid">
            {deckArray.map(obj=>{
                const handleClick =()=>{
                    if(!frozen){
                        handleChoice(obj)
                    }
                }
                return(
                    <div 
                        className="card" 
                        key={obj.id}
                        >
                        <img 
                            src={coverPic}
                            alt="" 
                            className={obj.flipped ? 'cardBack flip-cover ':'cardBack flip-back'}
                            onClick={handleClick}
                            
                           
                        />
                        <img 
                            src={obj.src} 
                            alt="" 
                            className={obj.flipped ? ' cardFront appear':'cardFront'}
                        />
                       
                    </div>
                )
            })}
        </div>
    )
}
export default Cards