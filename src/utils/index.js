export const baseUrl = 'http://localhost:1050/table';

export const getDate = () => {
    const now = new Date();

    return now.toLocaleDateString();
};

export const validateConditions = {
    name: /^.{2,13}$/,
    quantity: /^[0-9]{1,24}$/,
    distance: /^[0-9]{1,24}$/
};

export function checkValidation(data, condition) {

    let isValid = true

    if (data.name.match(condition.name) === null) {
        alert('Название должно содержать от 2 до 13 символов');
        isValid = false
    };

    if (data.quantity.match(condition.quantity) === null) {
        alert('Количество должно состоять только из цифр и содержать от 1 до 24 символов');
        isValid = false
    };

    if (data.distance.match(condition.distance) === null) {
        alert('Расстояние должно состоять только из цифр и содержать от 1 до 24 символов');
        isValid = false
    };

    return isValid;
};


