import s from './leader.module.scss'

export const Leader = ({ leader }) => {
   // console.log(leader);
    return (
        <>
            <tr>
                <td className={s.leader}>{leader.name}</td>
                <td className={s.score}>{(leader.score >= 0) ? leader.score : (0)}</td>
            </tr>
        </>
    )
}