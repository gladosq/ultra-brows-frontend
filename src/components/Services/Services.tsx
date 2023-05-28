'use client';

import s from './Services.module.scss';
import React, {useState} from 'react';
import clsx from 'clsx';
import {IModes, servicesList} from '../../typography/game-mode';
import {DECORATION_BLUR_SIZE} from '../../const/decoration';
import brows6 from './../../../public/images/brows-6.jpg';
import brows5 from './../../../public/images/brows-5.jpg';
import brows4 from './../../../public/images/brows-4.jpg';
import Image from 'next/image';
import {useParallax} from 'react-scroll-parallax';

export default function Services() {
	const [mode, setMode] = useState();
	const [mousePos, setMousePos] = useState({x: 0, y: 0});
	const [currentTarget, setCurrentTarget] = useState();
	const [mouseFadeOut, setMouseFadeOut] = useState(false);
	const parallax = useParallax({speed: -22, scale: [0.7, 1]});


	const handleMouseMove = (e: any) => {
		setMouseFadeOut(false);
		const bounds = e.currentTarget.getBoundingClientRect();
		const x = e.clientX - bounds.left;
		const y = e.clientY - bounds.top;

		const currentInput = e.currentTarget.getElementsByTagName('input');

		setCurrentTarget(currentInput[0].id);
		setMousePos({x: x, y: y});
	};

	const getPreviewImage = (service) => {
		switch (service) {
			case 'Брови':
				return <Image
					src={brows6}
					alt={''}
					className={clsx(s.previewImage, {[s.previewActive]: service === 'Брови'})}
				/>;
			case 'Макияж':
				return <Image
					src={brows5}
					className={clsx(s.previewImage, {[s.previewActive]: service === 'Макияж'})}
					alt={''}
				/>;
			case 'Комплекс':
				return <Image
					src={brows4}
					className={clsx(s.previewImage, {[s.previewActive]: service === 'Комплекс'})}
					alt={''}
				/>;
			default:
				return <Image
					src={brows4}
					className={clsx(s.previewImage, {[s.previewActive]: service === 'Комплекс'})}
					alt={''}
				/>;
		}
	}

	return (
		<div className={s.wrapper}>
			<div className={s.modeWrapper}>
				<div className={s.listWrapper}>
					{servicesList.map(({id, title, subtitle, price}: IModes) => (
						<div
							className={s.itemWrapper}
							key={id}
							onMouseMove={handleMouseMove}
							onMouseOut={() => setMouseFadeOut(true)}
						>
							<input
								type='radio'
								name='gameMode'
								id={title}
								checked={mode === title}
								onChange={(e: any) => setMode(e.target.id)}
							/>
							<label className={s.label} htmlFor={title}>
								<span className={s.title}>{title}</span>
								<span className={s.subtitle}>{subtitle}</span>
								<span className={s.labelPrice}>{price}₽</span>
							</label>
							<div className={s.decorationWrapper}>
								<div
									className={clsx({
										[s.decoration]: true,
										[s.decorationCurrent]: currentTarget === title,
										[s.decorationFadeAway]: (currentTarget === title && mouseFadeOut)
									})}
									style={
										{
											top: `${mousePos.y - (DECORATION_BLUR_SIZE / 2)}px`,
											left: `${mousePos.x - (DECORATION_BLUR_SIZE / 2)}px`
										}}
								></div>
							</div>
						</div>
					))}
				</div>
				<div className={s.previewWrapper} ref={parallax.ref as React.RefObject<HTMLDivElement>}>
					{getPreviewImage(mode)}
				</div>
			</div>
		</div>
	)
}
