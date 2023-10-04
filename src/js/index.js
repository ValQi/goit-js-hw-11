
import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";

const breedSelect = document.querySelector('.breed-select');
const infoLoad = document.querySelector('.loader');
const Error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

window.addEventListener('load', init);

Error.classList.add('hidden');

function init() {
    let breedsData;
    breedSelect.classList.add('hidden');

    infoLoad.classList.remove('hidden');
    fetchBreeds()
    .then(data => {
        breedsData = data;
        data.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed.id;
            option.textContent = breed.name;
            breedSelect.appendChild(option);
            breedSelect.classList.remove('hidden');
            infoLoad.classList.add('hidden');
        });
    })
    .catch(error => {
        Error.classList.remove('hidden');
        breedSelect.classList.add('hidden'); 
        infoLoad.classList.add('hidden');
        console.log(error);
    });
    breedSelect.addEventListener('change', () => {
        const selectBreedId = breedSelect.value;

        infoLoad.classList.remove('hidden');
        catInfo.classList.add('hidden');
        Error.classList.add('hidden');

        fetchCatByBreed(selectBreedId)
            .then(result => {
                const catData = result[0];
                const breedData = breedsData.find(breed => breed.id === catData.breeds[0].id);

                const markup = createMarkup(catData, breedData);
                catInfo.innerHTML = markup;

                infoLoad.classList.add('hidden');
                catInfo.classList.remove('hidden');
            })
            .catch(error => {
                console.log(error);

                Error.classList.remove('hidden');
                infoLoad.classList.add('hidden');
            });
    });
}

function createMarkup(catData, breedData) {
    return `<img src='${catData.url}' width='400' alt='${breedData.name}'/>
        <div class='textInfo'><h1>${breedData.name}</h1>
        <p>${breedData.description}</p>
        <p><b>Temperament:</b> ${breedData.temperament}</p></div>`;
}