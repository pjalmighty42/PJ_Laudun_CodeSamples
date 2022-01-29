import { Row } from 'antd';
import LinkCellCard from './Components/LinkCellCard';

import {getLinkObjectList} from '../../GlobalHelper/LinkHelper';

export default function LinkGridContainer(){

    const linkList = getLinkObjectList();

    return(
        <div>
             <Row gutter={16}>
                 {
                    linkList.map(link => {
                        return <LinkCellCard 
                        
                        />
                    })
                 }
             </Row>
        </div>
    );
}