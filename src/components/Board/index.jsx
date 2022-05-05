import { useEffect, useState } from 'react';

import { Leader } from "../Leader";
import instance, { axiosConfig } from '../API';
import { ordinalSuffixOf, sortListByOrder, orderType } from '../../helpers/functions';

import { Controls } from '../Controls';
import s from './board.module.scss';

export const Board = () => {
    const [list, setList] = useState([]);
    const [sortValue, setSortValue] = useState("descending");

    async function FetchData() {
        const { data } = await instance.get(axiosConfig.baseURL);
        setList(data
            .map(item => {
                if (!item.score) {
                    return {
                        ...item,
                        score: 0,
                    }
                }
                return item;
            })
            .sort((a, b) => b.score - a.score)
        );
    }

    const SortList = () => {
        orderType(sortValue, setSortValue)
        sortListByOrder(list, setList, sortValue)
    }
    useEffect(() => {
        FetchData();
    }, [])

    return (
        <>
            <div className={s.board}>
                <Controls
                    sortListByOrder={SortList}
                />
                <table>
                    <thead>
                        <tr>
                            <th>Position</th>
                            <th>Leader</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list ? list.map((leader, index) => (
                            <Leader leader={leader} number={ordinalSuffixOf(index + 1)} key={leader.name} />
                        )) : <></>}
                    </tbody>
                </table>
            </div>
        </>
    )
}