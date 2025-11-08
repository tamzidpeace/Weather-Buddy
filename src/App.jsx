import { useEffect, useState } from "react";
import ForecastList from "./components/ForecastList";
import SearchForm from "./components/SearchForm";
import WeatherCard from "./components/WeatherCard";
import { describeWeatherCode } from "./utils/weatherCodes";

const DEFAULT_CITY = "Dhaka";

function App() {
  const [cityInput, setCityInput] = useState(DEFAULT_CITY);
  const [searchRequest, setSearchRequest] = useState({
    city: DEFAULT_CITY,
  });
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!searchRequest.city) return;

    async function fetchWeather() {
      setIsLoading(true);
      setError("");

      try {
        const geoResponse = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            searchRequest.city
          )}&count=1&language=en&format=json`
        );

        if (!geoResponse.ok) {
          throw new Error(
            "Could not look up that city right now. Please try again."
          );
        }

        const geoData = await geoResponse.json();
        const location = geoData.results?.[0];

        if (!location) {
          throw new Error("City not found. Try another place name.");
        }

        const params = new URLSearchParams({
          latitude: location.latitude,
          longitude: location.longitude,
          current:
            "temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature,weather_code",
          daily: "weather_code,temperature_2m_max,temperature_2m_min",
          timezone: "auto",
        });

        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?${params}`
        );

        if (!weatherResponse.ok) {
          throw new Error(
            "Unable to fetch weather data right now. Please retry later."
          );
        }

        const weatherJson = await weatherResponse.json();
        const current = weatherJson.current;

        if (!current) {
          throw new Error("Weather data unavailable for that city.");
        }

        const humidity =
          typeof current.relative_humidity_2m === "number"
            ? current.relative_humidity_2m
            : 0;
        const windSpeed =
          typeof current.wind_speed_10m === "number"
            ? current.wind_speed_10m
            : 0;
        const temperature =
          typeof current.temperature_2m === "number"
            ? current.temperature_2m
            : 0;
        const apparentTemperature =
          typeof current.apparent_temperature === "number"
            ? current.apparent_temperature
            : temperature;

        setWeather({
          location: `${location.name}${
            location.country_code ? `, ${location.country_code}` : ""
          }`,
          temperature,
          apparentTemperature,
          humidity,
          windSpeed,
          description: describeWeatherCode(current.weather_code),
          code: current.weather_code ?? 0,
        });

        const days =
          weatherJson.daily?.time?.map((date, index) => ({
            date,
            max: weatherJson.daily.temperature_2m_max?.[index] ?? 0,
            min: weatherJson.daily.temperature_2m_min?.[index] ?? 0,
            code: weatherJson.daily.weather_code?.[index] ?? 0,
          })) ?? [];

        setForecast(days.slice(0, 5));
      } catch (fetchError) {
        setError(
          fetchError.message || "Something went wrong. Please try again."
        );
        setWeather(null);
        setForecast([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWeather();
  }, [searchRequest]);

  function handleSubmit(event) {
    event.preventDefault();
    const trimmed = cityInput.trim();

    if (!trimmed) {
      setError("Please enter a city to search.");
      return;
    }

    setSearchRequest({ city: trimmed });
  }

  return (
    <div className="min-h-screen bg-slate-950/95 pb-16 text-slate-100">
      <div className="mx-auto w-full max-w-4xl px-4 pt-12 sm:px-6">
        <header className="space-y-2 text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Weather Buddy
          </h1>
        </header>

        <SearchForm
          value={cityInput}
          onChange={setCityInput}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />

        {isLoading && (
          <div className="mt-10 flex flex-col items-center gap-3 text-slate-400">
            <span className="h-12 w-12 animate-spin rounded-full border-4 border-slate-800 border-t-sky-400" />
            <p>Fetching the latest weather for you…</p>
          </div>
        )}

        {!isLoading && error && (
          <div className="mt-10 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            {error}
          </div>
        )}

        {!isLoading && !error && !weather && (
          <p className="mt-10 text-center text-slate-400">
            Search for a city to see the current forecast.
          </p>
        )}

        {weather && !error && (
          <>
            <WeatherCard weather={weather} />
            <ForecastList days={forecast} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
