import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

const InsightsSection = (props) => {

    const cardsOut = props.cardArray.map((card, idx) => {
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
            <Link to="/">
                <article className="card-container">
                    <div className={bgCSSClass()}>
                        <h4>{card.caption}</h4>
                    </div>
                    <img src={card.src} alt={card.altText} />
                </article>
            </Link>
        )
    });

    return(
        <section className="insight-container">
            <section className="insight-main">
                <h3>ACME Insights</h3>
                <p>How are factors being used around the world?</p>
                <div className="cards-div">
                    {cardsOut}
                </div>
            </section>
        </section>
    );
}

export default InsightsSection;

InsightsSection.propTypes = {
    cardArray: PropTypes.array
}