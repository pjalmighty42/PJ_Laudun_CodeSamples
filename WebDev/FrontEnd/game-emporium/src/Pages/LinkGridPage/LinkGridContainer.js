import { Row } from 'antd';
import LinkCellCard from './Components/LinkCellCard';

export default function LinkGridContainer(props){

    return(
        <div>
             <Row gutter={16}>
                 {
                    props.linkListArray.map(link => {
                        return <LinkCellCard 
                        
                        />
                    })
                 }
             </Row>
        </div>
    );
}