import React, {useState, useEffect, Fragment} from 'react';

import TopFoldSection from '../../Components/TopFoldSection';
import CarouselItemContainer from '../../Components/CarouselItem';
import InsightsSection from '../../Components/InsightsSection';
import CommitmentSection from '../../Components/CommitmentSection';
import UpcomingEventsSection from '../../Components/UpcomingEventsSection';

/* Images for Carousel (because we're dealing with local imgs, and not urls) */
import cityImg from '../../assets/city1.gif';
import climber1Img from '../../assets/climber1.gif';
import climber3Img from '../../assets/climber3.gif';

const HomePage = () => {
    const [currScreenWidth, setScreenWidth] = useState(window.innerWidth);
    const [getCardsArray, setCardsArray] = useState([
        {
          src: cityImg,
          altText: 'City Image',
          caption: 'Global Factor Investing Study',
          bgColor: "green"
        },
        {
            src: climber1Img,
            altText: 'City Image',
            caption: 'Global Factor Investing Study',
            bgColor: "medblue"
        },
        {
            src: climber3Img,
            altText: 'City Image',
            caption: 'Capital Market Assumptions',
            bgColor: "lightblue"
        }
      ]);

    useEffect(()=> {
        //Listen and set the screen width
        const setWidthResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener('resize', setWidthResize);
        //Then return to break the listener (otherwise we get a memory leak)
        return () => {
            console.log(currScreenWidth);
            window.removeEventListener('resize', setWidthResize);
        };
    });

    return (
        <main className="main-page-container">
            <TopFoldSection 
                currScreenWidth={currScreenWidth}
            />
            {
                currScreenWidth <= 767 ? 
                <Fragment>
                    <CarouselItemContainer 
                        currScreenWidth={currScreenWidth}
                        cardArray={getCardsArray}
                    />
                </Fragment>
                :
                <Fragment>
                    <InsightsSection 
                        cardArray={getCardsArray}
                    />
                </Fragment>
            }
            <CommitmentSection />
            <UpcomingEventsSection 
                currScreenWidth={currScreenWidth}
                cardArray={[]}
            />
        </main>
    );
};

export default HomePage;