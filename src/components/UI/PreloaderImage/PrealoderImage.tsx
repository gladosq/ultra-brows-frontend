import s from './PreloaderImage.module.scss';

export default function PreloaderImage({height = 50}: {height?: number}) {
    return (
        <div className={s.preloaderWrapper} style={{height: `${height}px`}}>
            <span className={s.preloader}></span>
        </div>
    )
}
