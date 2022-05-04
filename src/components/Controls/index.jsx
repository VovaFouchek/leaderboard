import s from './controls.module.scss'

export const Controls = ({ list, setList, sortValue, setSortValue, sortedList }) => {
    return (
        <>
            <div className={s.wrapControl}>
                <strong>Leaders table for this period</strong>
                <button onClick={() => sortedList(list, setList, sortValue, setSortValue)}>Sort by</button>
            </div>
        </>
    )
} 