import { useState, useEffect } from "react";
import s from './board.module.scss';
import data from '../../data.json';
import { Leader } from "../Leader";

export const Board = () => {
    const LINK = 'http://coding-test.cube19.io/frontend/v1/starting-state';
    const [list, setList] = useState(data);

    // console.log(data);
    return (
        <div className={s.board}>
            <h2>Hello</h2>
            <table>
                <thead>
                    <tr>
                        <th>Leader</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((leader) => (
                        <Leader leader={leader} key={leader.name} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}