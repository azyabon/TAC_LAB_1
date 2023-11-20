import React, {useEffect, useState} from "react";
import {ReserveGradeProps} from "../../utils/types";
import styles from "./Results.module.css";

const Results: React.FC<ReserveGradeProps> = (props) => {
    const [maxProbability, setMaxProbability] = useState<number>(0)
    const [maxProbabilityYear, setMaxProbabilityYear] = useState<number>(0)
    const [index, setIndex] = useState<number>(-1)
    const profits = props.profits.slice(1, props.profits.length-1)
    const profitsWithReserve = props.profits.slice(0, props.profits.length-2).map((elem)=>elem-props.reserve)
    const yearsLength = props.years.length

    const probableProfit = props.uniqYears.length === 0 ? 0 : props.uniqYears.map((elem, index) => {
        return profits[index] * props.years.filter(filterElem=>filterElem===elem).length/yearsLength
    }).reduce((acc, elem) => acc + elem)

    const probableProfitWithReserve = props.uniqYears.length === 0 ? 0 : props.uniqYears.map((elem, index) => {
        return profitsWithReserve[index] * props.years.filter(filterElem=>filterElem===elem).length/yearsLength
    }).reduce((acc, elem) => acc + elem)

    useEffect(()=> {
        props.uniqYears.forEach((elem, index) => {
            const probability = props.years.filter(filterElem => filterElem === elem).length/yearsLength
            setMaxProbability(prevMaxProbability => {
                if (prevMaxProbability < probability) {
                    setMaxProbabilityYear(elem)
                    setIndex(index)
                    return probability
                }
                return prevMaxProbability
            })
        })
    },[props])

    return <div className={props.isResultsVisible ? styles.results_visible : styles.results_hidden}>
        <div>
            <b>Принцип максимального правдоподобия:</b> Вероятнее всего ({(maxProbability*100).toFixed(2)}%)
            строительство закончится за {maxProbabilityYear} год (года, лет) с прибылью {profits[index]}.
            Если использовать резерв прибыль составит {profitsWithReserve[index]} следовательно использовать резерв
            <b> {profits[index]>profitsWithReserve[index] ? "не выгодно" : "выгодно"}. </b>
        </div>
        <div>
            <b>Принцип Байеса:</b>Не используя резерв вероятная прибыль составит {probableProfit.toFixed(2)}.
            Используя резерв: {probableProfitWithReserve.toFixed(2)}. Следовательно использовать резерв
            <b> {probableProfit>probableProfitWithReserve ? "не выгодно" : "выгодно"}.</b>
        </div>
        <div>
            <b>Принцип гарантированных оценок:</b> Строительство точно закончится за {props.uniqYears[props.uniqYears.length-1]} года (лет).
            Прибыль с без использования резерва составит {profits[profits.length-1]}. Прибыль с использованием резерва составит {profitsWithReserve[profits.length-1]}.
            Cледовательно использовать резерв <b> {profits[profits.length-1]>profitsWithReserve[profitsWithReserve.length-1] ? "не выгодно" : "выгодно"}. </b>
        </div>
    </div>
}

export default Results