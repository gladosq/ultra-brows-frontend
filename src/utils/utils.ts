import {message, Upload, UploadFile} from 'antd';
import {RcFile} from 'antd/es/upload';

/*--- Функция для отображения превью antd ---*/
export const handlePreviewAction = async (
    file: UploadFile,
    previewState: any,
    openState: any,
    titleState: any
) => {
    if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj as RcFile);
    }

    previewState(file.url || (file.preview as string));
    openState(true);
    titleState(
        file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1)
    );
};

/*--- Проверяет размер и формат изображения ---*/
export const checkImageFormat = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('Вы можете загружать только JPG/PNG файлы!');
    }
    const isLt2M = file.size / 1024 / 1024 < 6;
    if (!isLt2M) {
        message.error('Изображение должно быть меньше 4MB!');
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', event => {
        const _loadedImageUrl = event.target.result;
        const image = document.createElement('img');
        image.src = _loadedImageUrl;
        image.addEventListener('load', () => {
            const {width, height} = image;
        });
    });
    return isJpgOrPng && isLt2M || Upload.LIST_IGNORE;
};

/*--- Отдаёт base64 файла ---*/
export const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
