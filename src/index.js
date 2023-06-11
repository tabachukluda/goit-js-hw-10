import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

fetchBreeds()
  .then(breeds => {
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.text = breed.name;
      breedSelect.appendChild(option);
    });
    breedSelect.addEventListener('change', handleBreedSelect);
    loader.style.display = 'none';
    breedSelect.style.display = 'block';
  })
  .catch(error => {
    console.error(error);
    loader.style.display = 'none';
    error.style.display = 'block';
  });

function handleBreedSelect() {
    const selectedBreedId = breedSelect.value;
  loader.style.display = 'block';
  error.style.display = 'none';
  catInfo.innerHTML = '';

    fetchCatByBreed(selectedBreedId)
    .then(catData => {
        console.log(catData);
        const { imageUrl, breed, description, temperament } = catData;
        console.log(imageUrl);
        const image = document.createElement('img');
        image.setAttribute('src', imageUrl);
        image.setAttribute('width', '400');
        image.setAttribute('height', '100%');
        image.style.float = 'left'; 
        catInfo.appendChild(image);

        const textContainer = document.createElement('div');
        textContainer.style.marginLeft = '320px'
        textContainer.style.padding = '10px'; 
        textContainer.style.display = 'flex';
        textContainer.style.alignItems = 'center';

        const textContent = document.createElement('div');
        textContent.style.marginLeft = '20px'; 

        
        const breedName = document.createElement('h2');
        breedName.style.color = '#2E2F42';
        breedName.textContent = breed;
        textContent.appendChild(breedName);

        const descriptionPara = document.createElement('p');
        descriptionPara.style.marginRight = '350px';
        descriptionPara.style.textAlign = 'justify';
        descriptionPara.textContent = description;
        textContent.appendChild(descriptionPara);

        const temperamentPara = document.createElement('p');
        temperamentPara.textContent = `TEMPERAMENT:
        ${temperament}`;
        textContent.appendChild(temperamentPara);
        textContainer.appendChild(textContent);
        catInfo.appendChild(textContainer);


        loader.style.display = 'none';
        catInfo.style.display = 'block';
    })
    .catch(error => {
        console.error(error);
        loader.style.display = 'none';
        error.style.display = 'block';
    });
}
