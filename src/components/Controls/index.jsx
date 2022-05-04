import s from './controls.module.scss'

export const Controls = ({ list, setList, sortValue, setSortValue, sortedList }) => {
    return (
        <>
            <button onClick={() => sortedList(list, setList, sortValue, setSortValue)}>Sorted by</button>
        </>
    )
}