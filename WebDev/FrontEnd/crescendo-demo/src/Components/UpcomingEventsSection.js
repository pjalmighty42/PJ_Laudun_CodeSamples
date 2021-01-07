import React from 'react';

import PropTypes from 'prop-types';

const UpcomingEventsSection = (props) => {

    const eventsOut = props.cardArray.map((card, index) => {
        return (
            <div className="events-card-main">

            </div>
        );
    });

    return (
        <section className="upcoming-container">
            <div className="upcoming-header-sect">
                <h3>Upcoming <span className="events-txt">Events</span></h3>
                {
                    props.currScreenWidth > 767 ? 
                    <p>This needs a great tagline, but I'll have it in later</p> :
                    <p>At ACME, we're dedicated to learing, connecting, and exploring oppritunities.</p>
                }
                
            </div>
            <div className="upcoming-events-sect">
                {
                    props.cardArray.length > 0 ? 
                     eventsOut :
                     <h4>No Events?! Please check back later!</h4>
                }
                
            </div>
        </section>
    );
};

export default UpcomingEventsSection;

UpcomingEventsSection.propTypes = {
    currScreenWidth: PropTypes.number,
    cardArray: PropTypes.array
}