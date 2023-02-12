import http from './httpService';
const apiEndpoint = "http://localhost:2017/api/plants";




export function getPlants() {
    return http.get(apiEndpoint);
}

export function getPlant(plantId){
    return http.get(apiEndpoint + '/' + plantId);
}

export function savePlant(plant){

}



export function deletePlant(plantId){
    return http.delete(apiEndpoint + "/" + plantId);
}