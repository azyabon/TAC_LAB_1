import React from "react";

export type TableProps = {
    years: number[]
    isVisible: boolean
    setProfitArray:  React.Dispatch<React.SetStateAction<number[]>>
    setIsResultsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export type TableWithReserveProps = {
    possibleYears: number[]
    profitArray: number[]
    isVisible: boolean
    reserve: number
}

export type ReserveGradeProps = {
    years: number[]
    uniqYears: number[]
    profits: number[]
    reserve: number
    isResultsVisible: boolean
}
