import React, {useEffect, useRef, useState} from 'react';
import '../App.css';
import ProfitTable from "../components/ProfitTable/ProfitTable";
import ProfitWithReserveTable from "../components/ProfitWithReserveTable/ProfitWithReserveTable";
import Results from "../components/Results/Results";

const App: React.FC = () => {
    const num1 = useRef<HTMLInputElement>(null)
    const num2 = useRef<HTMLInputElement>(null)
    const numRange1 = useRef<HTMLInputElement>(null)
    const numRange2 = useRef<HTMLInputElement>(null)
    const numRange3 = useRef<HTMLInputElement>(null)
    const reserve = useRef<HTMLInputElement>(null)

    const [isTableVisible, setIsTableVisible] = useState<boolean>(false)
    const [isTableWithReserveVisible, setIsTableWithReserveVisible] = useState<boolean>(false)
    const [isResultsVisible, setIsResultsVisible] = useState<boolean>(false)

    const [yearsArray, setYearsArray] = useState<number[]>([])
    const [uniqYearsArray, setUniqYearsArray] = useState<number[]>([])
    const [profitArray, setProfitArray] = useState<number[]>([])

    const onSubmitClick = () => {

        setIsTableVisible(false)
        setIsResultsVisible(false)
        setIsTableWithReserveVisible(false)
        setYearsArray([])
        setProfitArray([])
        setUniqYearsArray([])

        const minYear = Math.min(Number(numRange1.current?.value), Number(numRange2.current?.value), Number(numRange3.current?.value))
        const maxYear = Math.max(Number(numRange1.current?.value), Number(numRange2.current?.value), Number(numRange3.current?.value))

        setYearsArray([])
        for (let i = minYear; i<= maxYear; i++) {
            for (let j = minYear; j<= maxYear; j++) {
                for (let k = minYear; k<= maxYear; k++) {
                    const years1 = Number(num1.current?.value) + j
                    const years2 = Number(num2.current?.value) + k
                    const years3 = i

                    setYearsArray(prevState => [...prevState, Math.max(years1,years2,years3)])
                }
            }
        }

    }

    useEffect(() => {
        if (yearsArray.length !== 0) {
            setIsTableVisible(true)
        }
        setUniqYearsArray(yearsArray.filter((elem, index) => index === yearsArray.indexOf(elem)))
    },[yearsArray])

    useEffect(() => {
        if (profitArray.length !== 0) {
            setIsTableWithReserveVisible(true)
        }
    }, [profitArray])

    return (
        <div className="App">
            <h1>1 лабораторная работа</h1>
            <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
                    <div>
                        <span className={'span'}>Cтроительство корпусов займет: </span>
                        <input ref={num1}  placeholder={'лет'} type="number"></input>
                    </div>
                    <div>
                        <span className={'span'}>Разработка модели изделия займет: </span>
                        <input ref={num2}  placeholder={'лет'} type="number"></input>
                    </div>
                <div>
                    <span className={'span'}>Наем рабочей силы, монтаж оборудования и отладка модели изделия могут занять: </span>
                    <input ref={numRange1} placeholder={'1'} type="number"></input>
                    <input ref={numRange2} placeholder={'2'} type="number"></input>
                    <input ref={numRange3} placeholder={'3'} type="number"></input>
                </div>
                <div>
                    <span className={'span'}>Резерв: </span>
                    <input ref={reserve} type="number"/>
                </div>
            </div>
            <button style={{margin: 20}} onClick={onSubmitClick}>Расcчитать</button>
            <ProfitTable isVisible={isTableVisible} years={uniqYearsArray} setProfitArray={setProfitArray} setIsResultsVisible={setIsResultsVisible} />
            <ProfitWithReserveTable isVisible={isTableWithReserveVisible} possibleYears={uniqYearsArray} profitArray={profitArray} reserve={Number(reserve.current?.value)}/>
            <Results years={yearsArray} uniqYears={uniqYearsArray} profits={profitArray} reserve={Number(reserve.current?.value)} isResultsVisible={isResultsVisible}/>
        </div>
    );
};

export default App;
