import { useState, useEffect } from "react";
import s from './board.module.scss';
import { Leader } from "../Leader";
import { fetchData } from "../API";
import axios from "axios";

axios.defaults.baseURL = 'http://coding-test.cube19.io';
const mainUrl = axios.defaults.baseURL + '/frontend/v1/starting-state'

export const Board = () => {
    const [list, setList] = useState([]);

    async function fetchPeople(url) {
        const response = await fetchData(url);
        setList(response);
    }

    useEffect(() => {
        fetchPeople(mainUrl);
    }, [mainUrl])
    
    console.log(list);

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