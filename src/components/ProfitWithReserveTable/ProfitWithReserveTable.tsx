import React from "react";
import {TableWithReserveProps} from "../../utils/types";
import styles from "./ProfitWithReserveTable.module.css";

const ProfitWithReserveTable: React.FC<TableWithReserveProps> = (props) => {
    const years = props.possibleYears.map((elem)=><td>{elem}</td>)
    const profits = props.profitArray.slice(1, props.profitArray.length-1).map((elem)=><td>{elem}</td>)
    const profitsWithReserve = props.profitArray.slice(0, props.profitArray.length-2).map((elem)=><td>{elem-props.reserve}</td>)

    return <table border={1} className={props.isVisible ? styles.table_visible : styles.table_hidden}>
        <tr>
            <td>T</td>
            {years}
        </tr>
        <tr>
            <td>Без резерва</td>
            {profits}
        </tr>
        <tr>
            <td>С резервом</td>
            {profitsWithReserve}
        </tr>
    </table>
}

export default ProfitWithReserveTable