import axios from "axios";

const URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "121f632f2d5c5c8a0ad79bdd11e08905";

export const fetchWeather = async (query) => {
	const { data } = await axios.get(URL, {
		params: { q: query, units: "metric", APPID: API_KEY },
	});

	return data;
};
