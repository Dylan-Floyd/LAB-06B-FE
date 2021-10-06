const backendURL = 'https://lab-06b-be-dylan.herokuapp.com/';

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

export async function deletecar(carId) {
    await fetch(backendURL+'cars/'+carId, {
        method: 'DELETE',
    }).catch(e => console.log(e));
}