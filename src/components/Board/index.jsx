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
        return response.data;
    }
    useEffect(() => {
        FetchData();
    }, [])
    
    return (
        <div className={s.board}>
            <table>
                <thead>
                    <tr>
                        <th>Leader</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {list ? list.map((leader) => (
                        <Leader leader={leader} key={leader.name} />
                    )) : <></>}
                </tbody>
            </table>
        </div>
    )
}