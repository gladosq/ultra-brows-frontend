'use client';

import s from './Header.module.scss';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {Form, Modal, Input, Button, message} from 'antd';
import {useMutation} from '@tanstack/react-query';
import {fetchLogin} from '../../api/login';
import {useCookie} from 'react-use';
import {useRouter} from 'next/navigation'
import jwt_decode from 'jwt-decode';
import useMainStore from '../../store/store';
import {fetchRegister} from '../../api/registration';

export default function Header() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isModalRegistrationOpen, setIsModalRegistrationOpen] = useState(false);
	const [mounted, setMounted] = useState(false);
	const [token, updateToken, deleteCookie] = useCookie('authJwt');

	const {setIsUserLogged} = useMainStore();
	const [formAuth] = Form.useForm();

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		token ? setIsUserLogged(true) : setIsUserLogged(false);
	}, [token])

	const decodedJwt = token ? jwt_decode(token) : null;

	const {mutate, isLoading} = useMutation(fetchLogin);
	const {mutate: mutateRegister, isLoading: isLoadingRegister} = useMutation(fetchRegister);

	const [form] = Form.useForm();

	const onAuthorization = (e: any) => {
		mutate(
			{...e},
			{
				onSuccess: async (res) => {
					message.info('Успешная авторизация');
					updateToken(res.accessToken);
					setIsUserLogged(true);
					formAuth.resetFields();
					setIsModalOpen(false);
				},
				onError: (error) => {
					message.warning('Ошибка авторизации');
				}
			})
	};

	const onRegistration = (e: any) => {
		const {confirm, ...dataObject} = e;
		console.log('dataObject:', dataObject);

		// @ts-ignore
		mutateRegister({...dataObject}, {
			onSuccess: (res) => {
				console.log('res:', res);
				form.resetFields();
			},
			onError: (error) => {
				message.warning('Ошибка регистрации');
			}
		})
	};

	const openRegistrationModalHandler = () => {
		setIsModalOpen(false);
		setIsModalRegistrationOpen(true);
	};

	return (
		<section className={s.wrapper}>
			<div className={s.innerWrapper}>
				<div className={s.logoWrapper}>
					<Link href={'/'}>
						<span><span>ULTRA</span> brows</span>
					</Link>
				</div>
				<nav className={s.nav}>
					<Link className={s.animatedButton} href={'/all-services'}>
						<span>Все услуги</span>
						<span>➞</span>
					</Link>
					<Link className={s.animatedButton} href={'/blog'}>
						<span>Блог</span>
						<span>➞</span>
					</Link>
				</nav>
				<div className={s.contactsWrapper}>
					<button className={s.button}>
						+7 (999) 999-99-99
					</button>
				</div>
				{mounted && token ? (
					<div className={s.authorized}>
						<p>Добро пожаловать, <span>{decodedJwt && decodedJwt.name}</span></p>
						<button
							onClick={() => {
								deleteCookie();
							}}
						>
							Выйти
						</button>
					</div>
				) : (
					<Button
						className={s.registrationButton}
						onClick={() => setIsModalOpen(true)}
						loading={isLoading}
					>
						Войти
					</Button>
				)}
			</div>
			{/*--- Авторизация ---*/}
			<Modal
				open={isModalOpen}
				onOk={() => setIsModalOpen(true)}
				onCancel={() => setIsModalOpen(false)}
				footer={false}
				width={400}
			>
				<Form
					name='authorization'
					onFinish={onAuthorization}
					autoComplete='off'
					className={s.form}
					layout='vertical'
					form={formAuth}
				>
					<h2>Авторизация</h2>
					<Form.Item
						className={s.formItem}
						label='E-mail'
						name='email'
						rules={[{required: true, message: 'Пожалуйста, введите email!'}]}
					>
						<Input size='large'/>
					</Form.Item>
					<Form.Item
						label='Пароль'
						name='password'
						rules={[{required: true, message: 'Пожалуйста, введите пароль!'}]}
					>
						<Input.Password size='large'/>
					</Form.Item>
					<Form.Item className={s.formItemButton}>
						<Button type='primary' htmlType='submit'>
							Войти
						</Button>
					</Form.Item>
					<p
						className={s.noAccount}
					>
						Нету аккаунта?
						{' '}
						<span onClick={openRegistrationModalHandler}>
                            Зарегистрироваться
                        </span>
					</p>
				</Form>
			</Modal>
			{/*--- Регистрация ---*/}
			<Modal
				open={isModalRegistrationOpen}
				onOk={() => setIsModalRegistrationOpen(true)}
				onCancel={() => setIsModalRegistrationOpen(false)}
				footer={false}
				width={400}
				form={form}
			>
				<Form
					name='registration'
					onFinish={onRegistration}
					autoComplete='off'
					className={s.form}
					layout='vertical'
				>
					<h2>Регистрация</h2>
					<Form.Item
						className={s.formItem}
						label='E-mail'
						name='email'
						rules={[{required: true, message: 'Пожалуйста, введите email!'}]}
					>
						<Input size='large'/>
					</Form.Item>
					<Form.Item
						className={s.formItem}
						label='Имя'
						name='name'
						rules={[{required: true, message: 'Пожалуйста, введите имя!'}]}
					>
						<Input size='large'/>
					</Form.Item>
					<Form.Item
						name='password'
						label='Пароль'
						rules={[{required: true, message: 'Пожалуйста, введите пароль!'}]}
						hasFeedback
					>
						<Input.Password size='large'/>
					</Form.Item>
					<Form.Item
						name='confirm'
						label='Подтвердите пароль'
						dependencies={['password']}
						hasFeedback
						rules={[{required: true, message: 'Пожалуйста, подтвердите пароль!'},
							({getFieldValue}) => ({
								validator(_, value) {
									if (!value || getFieldValue('password') === value) {
										return Promise.resolve();
									}
									return Promise.reject(new Error('Пароли не совпадают!'));
								}
							})
						]}
					>
						<Input.Password size='large'/>
					</Form.Item>
					<Form.Item className={s.formItemButton}>
						<Button type='primary' htmlType='submit'>
							Зарегистрироваться
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</section>
	)
}
