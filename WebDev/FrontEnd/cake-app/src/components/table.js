import React, {Fragment} from 'react';

const TableComponent = (props) => {

    const OutputTableRows = (item) => {
        return (
            <Fragment key={item.id}>
                <tr>
                    <td>{item.name}</td>
                    <td>{item.specializations}</td>
                </tr>
            </Fragment>
        );
    };

    return(
        <table>
            <thead>
                <tr>
                    {
                        props.headers.map(h => {
                            return <th>{h}</th>
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {
                    props.list.map(item => {
                        return OutputTableRows(item)
                    })
                }
            </tbody>
        </table>
    );
};

export default TableComponent;