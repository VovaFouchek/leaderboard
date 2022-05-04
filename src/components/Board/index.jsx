import { useEffect, useState } from 'react';

import { Leader } from "../Leader";
import instance, { axiosConfig } from '../API';
import { ordinal_suffix_of, sortedList } from '../../helpers/functions';

import { Controls } from '../Controls';
import s from './board.module.scss';

export const Board = () => {
    const [list, setList] = useState([]);
    const [sortValue, setSortValue] = useState("descending");

    async function FetchData() {
        const response = await instance.get(axiosConfig.baseURL);

        setList(response.data
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

    useEffect(() => {
        FetchData();
    }, [])

    return (
        <>
            <div className={s.board}>
                <Controls
                    list={list}
                    setList={setList}
                    sortValue={sortValue}
                    setSortValue={setSortValue}
                    sortedList={sortedList}
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
                            <Leader leader={leader} number={ordinal_suffix_of(index + 1)} key={leader.name} />
                        )) : <></>}
                    </tbody>
                </table>
            </div>
        </>
    )
}