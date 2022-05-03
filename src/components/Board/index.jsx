import s from './board.module.scss';
import { Leader } from "../Leader";
import instance, { axiosConfig } from '../API';
import { useEffect, useState } from 'react';


export const Board = () => {
    const [list, setList] = useState('');


    async function FetchData() {
        const response = await instance.get(axiosConfig.baseURL)
        setList(response.data);
        console.log(response.data);
    }
    useEffect(() => {
        FetchData();
    }, [])
    


    function ordinal_suffix_of(i) {
        let j = i % 10,
            k = i % 100;
        if (j === 1 && k !== 11) {
            return i + "st";
        }
        if (j === 2 && k !== 12) {
            return i + "nd";
        }
        if (j === 3 && k !== 13) {
            return i + "rd";
        }
        return i + "th";
    }
    

    return (
        <>
        <div className={s.board}>
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
                        <Leader leader={leader} number={ordinal_suffix_of(index+1)} key={leader.name}/>
                    )) : <></>}
                </tbody>
            </table>
        </div>
        </>
    )
}