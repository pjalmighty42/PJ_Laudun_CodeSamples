import React, {Fragment} from 'react';
import './tableBody.css';

const TableBody = (props) => {
    return(
        <table className="fbTable">
            <tbody>
                <tr>
                    <th>ID</th>
                    <th>Value</th>
                    <th>Result</th>
                </tr>
                {props.items.map(item =>(
                    <Fragment key={item.id}>
                        <tr>
                            <td className="idCol">{item.id}</td>
                            <td>{item.val}</td>
                            <td>{item.fbRes}</td>
                        </tr>
                    </Fragment>
                ))}
            </tbody>
        </table>
    )
}

export default TableBody;