'use client';

import Blog from '../../../components/Blog/Blog';
import s from './page.module.scss';
import {Button, Form, Input, message, Modal, Upload, UploadFile} from 'antd';
import {RcFile, UploadProps} from 'antd/es/upload';
import {useEffect, useState} from 'react';
import {PlusOutlined} from '@ant-design/icons';
import {checkImageFormat, getBase64} from '../../../utils/utils';
import {useCookie} from 'react-use';
import useMainStore from '../../../store/store';
import useNews, {fetchCreateNew} from '../../../api/news';
import {useMutation} from '@tanstack/react-query';

const {TextArea} = Input;

export default function Page() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [fileList, setFileList] = useState([]);
	const [previewImage, setPreviewImage] = useState('');
	const [previewTitle, setPreviewTitle] = useState('');
	const [previewOpen, setPreviewOpen] = useState(false);
	const [mounted, setMounted] = useState(false);

	const [token, updateToken, deleteCookie] = useCookie('authJwt');

	const {isUserLogged, setIsUserLogged} = useMainStore();

	const {data, isSuccess, isLoading, refetch} = useNews();


	console.log('data:', data);



	useEffect(() => {
		setMounted(true);
	}, []);


	const {
		mutate,
		isLoading: isLoadingCreateNew,
		isSuccess: isSuccessCreateNew
	} = useMutation(fetchCreateNew);

	const [form] = Form.useForm();



	const onAddPost = (formValues) => {
		let formDataFragment = new FormData();

		formDataFragment.append('title', formValues.title);
		formDataFragment.append('subtitle', formValues.subtitle);
		formDataFragment.append('image_blob', fileList[0].originFileObj);

		mutate(
			{formData: formDataFragment},
			{
				onSuccess: (res) => {
					message.info(`Новость «${formValues.title}» успешно добавлена.`);
					resetForm();
					refetch();
					setIsModalOpen(false);
				}
			})
	};

	const resetForm = () => {
		form.resetFields();
		setFileList([]);
	};

	const normFile = (e: any) => {
		if (Array.isArray(e)) {
			return e;
		}
		return e?.fileList;
	};

	const uploadButton = (
		<div>
			<PlusOutlined/>
			<div style={{marginTop: 8}}>Загрузить</div>
		</div>
	);

	const handlePreview = async (file: UploadFile) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj as RcFile);
		}

		setPreviewImage(file.url || (file.preview as string));
		setPreviewOpen(true);
		setPreviewTitle(
			file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
		);
	};

	const handleChange: UploadProps['onChange'] = (info) => {
		setFileList(info.fileList);
		if (info.file.status === 'done') {
		} else if (info.file.status === 'error') {
			message.error(`Ошибка загрузки файла ${info.file.name}.`);
		}
	}

	const beforeUploadPhoto = (file: RcFile) => checkImageFormat(file);

	return (
		<div className='container'>
			<h1 className={s.title}>Блог</h1>
			{(mounted && isUserLogged) && (
				<Button
					className={s.addPostButton}
					onClick={() => setIsModalOpen(true)}
				>
					Добавить новость
				</Button>
			)}
			<Blog mainTitle={false} news={isSuccess ? data : []}/>
			<Modal
				open={isModalOpen}
				onOk={() => setIsModalOpen(true)}
				onCancel={() => setIsModalOpen(false)}
				footer={false}
				width={400}
			>
				<Form
					name='authorization'
					onFinish={onAddPost}
					autoComplete='off'
					className={s.form}
					layout='vertical'
					form={form}
				>
					<h2>Создать новую новость</h2>
					<Form.Item
						className={s.formItem}
						label='Заголовок новости'
						name='title'
						rules={[{required: true, message: 'Пожалуйста, введите заголовок!'}]}
					>
						<Input size='large'/>
					</Form.Item>
					<Form.Item
						className={s.formItem}
						label='Текст новости'
						name='subtitle'
						rules={[{required: true, message: 'Пожалуйста, введите текст новости!'}]}
					>
						<TextArea rows={4} placeholder={'Текст новости'}/>
					</Form.Item>
					<Form.Item
						name='fileModel'
						className={s.formItem}
						label='Изображение'
						valuePropName='fileList'
						getValueFromEvent={normFile}
						labelCol={{style: {width: 160}}}
						rules={[{required: true, message: 'Выберите изображение!'}]}
					>
						<Upload
							className={s.upload}
							beforeUpload={beforeUploadPhoto}
							listType='picture-card'
							fileList={fileList}
							onPreview={handlePreview}
							onChange={handleChange}
							showUploadList={{showPreviewIcon: false}}
							customRequest={({onSuccess}) =>
								setTimeout(() => {
									// @ts-ignore
									onSuccess('ok', null);
								}, 0)
							}
						>
							{fileList.length >= 1 ? null : uploadButton}
						</Upload>
					</Form.Item>
					<Form.Item className={s.formItemButton}>
						<Button
							type='primary'
							htmlType='submit'
							loading={isLoading}
						>
							Отправить новость
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	)
}
