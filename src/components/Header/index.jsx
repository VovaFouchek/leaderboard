import s from './header.module.scss'
import image from '../../images/business-people.svg';

export const Header = () => {
    return (
        <>
            <div className={s.banner}>
                <p className={s.text}>All time Highest Scorers</p>
                <div className={s.container__card}>
                    <div className={s.card}>
                        <img src="" alt="" />
                        <p></p>
                    </div>
                </div>
                <img src={image} alt="Business people" />
            </div>
            <h1 className={s.title}>LeaderBoard:</h1>
        </>
    )
}