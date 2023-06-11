const apiKey = 'live_0sQnPFfsfZNoA1ShOr6wbjEAHTbaHV1JDc8KdXfyMTGJ7vtYklsBwlXE3OvDwnX1';

export function fetchBreeds() {
    const url = 'https://api.thecatapi.com/v1/breeds';

    return fetch(url, {
        headers: {
            'x-api-key': apiKey
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error fetching breeds');
        }
        return response.json();
    })
    .catch(error => {
        console.error('Error fetching breeds:', error);
        throw error;
    });
}

export function fetchCatByBreed(breedId) {
    const url = `https://api.thecatapi.com/v1/images/search?breed_id=${breedId}`;

    return fetch(url, {
        headers: {
            'x-api-key': apiKey
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error fetching cat by breed');
        }
        return response.json();
    })
    .then(data => {
        const catData = data[0];
        if (!catData || !catData.url) {
            throw new Error('No image found for the selected breed');
        }

        return {
            imageUrl: catData.url || '',
            breed: catData.breeds[0].name || '',
            description: catData.breeds[0].description || '',
            temperament: catData.breeds[0].temperament || '',
        };
    })
    .catch(error => {
        console.error('Error fetching cat by breed:', error);
        throw error;
    });
}