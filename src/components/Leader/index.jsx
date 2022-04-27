import s from './leader.module.scss'

export const Leader = ({ leader }) => {
    console.log(leader);
    return (
        <>
            <tr>
                <td className={s.leader}>{leader.name}</td>
                <td>{(leader.score >= 0) ? leader.score : ('No date')}</td>
            </tr>
        </>
    )
}