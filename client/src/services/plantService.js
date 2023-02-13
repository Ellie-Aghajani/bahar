import http from "./httpService";
// import apiUrl from "../config.json";

const apiEndpoint = "http://localhost:2017/api/plants";

function plantUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getPlants() {
  return http.get(apiEndpoint);
}

export function getPlant(plantId) {
  return http.get(plantUrl(plantId));
}

export function savePlant(plant) {
  if (plant._id) {
    const body = { ...plant };
    delete body._id;
    return http.put(plantUrl(plant._id), body);
  }

  return http.post(apiEndpoint, plant);
}

export function deletePlant(plantId) {
  return http.delete(plantUrl(plantId));
}