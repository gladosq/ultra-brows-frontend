import s from './Footer.module.scss';
import Link from 'next/link';

export default function Footer() {
	return (
		<div className={s.wrapper}>
			<div>
				<div className={s.logoWrapper}>
					<Link href={'/'}>
						<span><span>ULTRA</span> brows</span>
					</Link>
				</div>
				<div className={s.contactsInner}>
					<h3>Телефон:</h3>
					<p>+7 (999) 999-99-99</p>
					<p>+7 (999) 999-99-99</p>
				</div>
			</div>
			<div>
				<div className={s.inner}>
					<span>ТЦ «МЕГА БЕЛАЯ ДАЧА»</span>
					<p>1-й Покровский пр., 1, Котельники, Москва</p>
				</div>
				<div className={s.inner}>
					<span>ТЦ «АНГАРА»</span>
					<p>Чонгарский бул., 7, Москва, BrowArt</p>
				</div>
				<div className={s.inner}>
					<span>ТЦ «МЕГА ТЕПЛЫЙ СТАН»</span>
					<p>Московская область, Ленинский район, Калужское шоссе</p>
				</div>
			</div>
		</div>
	)
}
