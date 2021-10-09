const backendURL = 'https://lab-06b-be-dylan.herokuapp.com/';

export async function getCars() {
    let cars;
    await fetch(backendURL+'cars/')
            .then(response => response.json())
            .then(json => cars = json)
            .catch(e => console.log(e));
    return cars;
}

export async function getCarById(id) {
    let carData = null;
    await fetch('https://lab-06b-be-dylan.herokuapp.com/cars/'+id)
        .then(response => response.json())
        .then(json => carData = json)
        .catch(e => console.log(e));
    return carData;
}

export async function getCategories() {
    let data;
    await fetch(backendURL+'categories/')
        .then(response => response.json())
        .then(json => {
            data = json;
            return json;
        })
        .catch(e => console.log(e));
    return data;
}

export async function postCar(carData) {
    await fetch(backendURL+'cars/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(carData)
    }).catch(e => console.log(e));
}

export async function putCar(carData) {
    await fetch(backendURL+'cars/'+carData.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(carData)
    }).catch(e => console.log(e));
}

export async function deleteCar(carId) {
    await fetch(backendURL+'cars/'+carId, {
        method: 'DELETE',
    }).catch(e => console.log(e));
}

export async function uploadImg(file) {
    let url = '';
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'carpics');
    data.append('cloud_name', 'dzjk3g6bq');

    await fetch('https://api.cloudinary.com/v1_1/dzjk3g6bq/image/upload', {
        method: 'POST',
        body: data
    }).then(resp => resp.json())
    .then(json => url = json.url)
    .catch(e => console.log(e));
    return url;
}