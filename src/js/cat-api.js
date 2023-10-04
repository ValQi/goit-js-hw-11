const api_key = "live_8hr5cXrpKx7ppP0wW5teH2jdRbT7k5mPbKlckrM2oHoreQzIqJCFrmtqB0lHoKed";
const base_url = "https://api.thecatapi.com/v1/"

export function fetchBreeds() {
    return fetch(`${base_url}breeds?api_key=${api_key}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
}

export function fetchCatByBreed(breedId) {
    return fetch(`${base_url}images/search?breed_ids=${breedId}&api_key=${api_key}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
}