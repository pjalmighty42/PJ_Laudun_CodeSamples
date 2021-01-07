import React, { useState }  from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import {
    Carousel,
    CarouselItem,
    CarouselIndicators
  } from 'reactstrap';

const CarouselItemContainer = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === props.cardArray.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? props.cardArray.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }

    const slidesOut = props.cardArray.map((card, idx) => {
        let bgCSSClass = () =>{
            switch (card.bgColor) {
                case "lightblue":
                    return "card-bg card-bg-lgt-blue";
                case "medblue":
                    return "card-bg card-bg-md-blue";
                case "darkblue":
                    return "card-bg card-bg-dk-blue";
                case "red":
                    return "card-bg card-bg-red";
                case "green":
                default:
                    return "card-bg card-bg-green";
            }
        }
        
        return(
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={idx}
            >
                <Link to="/">
                    <div className="carousel-card-container">
                        <div className={bgCSSClass()}>
                            <h4>{card.caption}</h4>
                        </div>
                        <img src={card.src} alt={card.altText} />
                    </div>
                </Link>
            </CarouselItem>
        )
    })

    return(
        <Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}
        >
            {slidesOut}
            <CarouselIndicators items={props.cardArray} activeIndex={activeIndex} onClickHandler={goToIndex} />
        </Carousel>
    );
};

export default CarouselItemContainer;

CarouselItemContainer.propTypes = {
    currScreenWidth: PropTypes.number,
    cardArray: PropTypes.array
};