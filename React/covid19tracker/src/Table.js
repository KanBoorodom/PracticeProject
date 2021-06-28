import React from 'react'
import './Table.css'
import numeral from 'numeral'
import { v4 as uuid_v4 } from "uuid"

function Table({countries}) {
    return (
        <table className='table'>{/* destrucutre */}
            <tbody>
                {countries.map(({country,cases})=>(
                        <tr  key = {uuid_v4()}>
                            <td>{country}</td>
                            <td>
                                <strong>{numeral(cases).format('000,000')}</strong>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
    )
}

export default Table
