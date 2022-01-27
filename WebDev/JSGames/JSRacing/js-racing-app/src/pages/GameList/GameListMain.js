import { List } from 'antd';


//import BreakoutImg from '../../public/breakout.jpg';

import ListCardMain from '../../components/buttons';

const gameTitleList = [
    {
        id: 'game01',
        title: 'Breakout',
        imgSrc: BreakoutImg
    },
];

export default function GameListMain (){
    return(
        <div id="gameMain">
            <div>
                <h2>Select a Game to Play!</h2>
            </div>
        <List 
            grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 6,
                xxl: 3,
            }}
        />
        </div>
        
    );
}