const URL = 'https://pixabay.com/api/';
const KEY = '30062649-6c95f8a5f26546f2640c7031e';

export const ApiFetch = (imageName, page) => {
    return fetch(`${URL}?q=${imageName}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`);
};
