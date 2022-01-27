import { Card, Image } from 'antd';
import { Link } from 'react-router-dom'

const CardLinkImg = (props) => {

    let { title, imgSrc } = props;

    return(
        <Link to >
            <Card
                className="linkCard"
                hoverable
                bordered={false}
                loading={props.loading}
                >
                <Image />
            </Card>
        </Link>
        
    );
}

export { 
    CardLinkImg
};