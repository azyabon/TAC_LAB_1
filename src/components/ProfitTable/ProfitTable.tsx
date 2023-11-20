import React, {useEffect, useRef} from "react";
import {TableProps} from "../../utils/types";
import styles from "./Table.module.css";

const ProfitTable: React.FC<TableProps> = (props) => {

    const inputsRef = useRef<HTMLInputElement[]>([])

    const onChangeInput = () => {
        let profitArray: number[] = []
        inputsRef.current.forEach((inputRef) => {
            profitArray.push(Number(inputRef.value))
        })
        if (!profitArray.slice(0, profitArray.length - 1).includes(0)) {
            props.setProfitArray(profitArray)
            props.setIsResultsVisible(true)
        }
    }

    const addInputRef = (ref: HTMLInputElement | null) => {
        if (ref) {
            inputsRef.current.push(ref)
        }
    }

    const cells = props.years.map((elem)=><td>{elem}</td>)
    const cellsInput = props.years.map((elem)=><td><input className={styles.table_input} onChange={onChangeInput} ref={(ref) => addInputRef(ref)} type={"number"}/></td>)

    useEffect(()=>{
        inputsRef.current = inputsRef.current.slice(-5)
    }, [props])

    return <table border={1} className={props.isVisible ? styles.table_visible : styles.table_hidden}>
        <tr>
            <td>{props.years[0]-1}</td>
            {cells}
            <td>{props.years[props.years.length-1]+1}</td>
        </tr>
        <tr>
            <td><input className={styles.table_input} onChange={onChangeInput} ref={(ref)=> addInputRef(ref)} type={"number"}/></td>
            {cellsInput}
            <td><input value={0} className={styles.table_input} onChange={onChangeInput} ref={(ref)=> addInputRef(ref)} type={"number"}/></td>
        </tr>
    </table>
}

export default ProfitTable
