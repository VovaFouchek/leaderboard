import s from './board.module.scss';
import { Leader } from "../Leader";
import useAxios from "../API";


export const Board = () => {
    const url = 'http://coding-test.cube19.io/frontend/v1/starting-state';
    const {list} = useAxios(url);
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