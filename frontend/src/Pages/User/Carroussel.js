import Carousel from "react-spring-3d-carousel";
import { useState, useEffect } from "react";
import { config } from "react-spring";
import CardNewsDemo from "./CardNewsDemo"

export default function Carroussel(props) {
  const [offsetRadius, setOffsetRadius] = useState(2);
  const [showArrows, setShowArrows] = useState(false);
  const [goToSlide, setGoToSlide] = useState(null);
  const [cards , setCards] = useState([]);
  useEffect(() => {
    setOffsetRadius(props.offset);
    setShowArrows(props.showArrows);
  }, [props.offset, props.showArrows]);
useEffect(() =>{
  if(props.cards && Array.isArray(props.cards)){
    const updatedCards = props.cards.map((element,index)=>{
      return {...element,onClick:()=>setGoToSlide(index)}
    })
    setCards(updatedCards)
  }
},[props.cards])
  


  return (
    <div
      style={{ width: "800px", height: props.height, margin: props.margin }}
    >
      <Carousel
        slides={cards}
        goToSlide={goToSlide}
        offsetRadius={offsetRadius}
        showNavigation={showArrows}
        animationConfig={config.gentle}
      />



    </div>
  );
}
