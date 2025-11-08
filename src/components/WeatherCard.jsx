import { getWeatherIcon } from '../utils/weatherCodes'

function WeatherCard({ weather }) {
  const { location, temperature, description, humidity, windSpeed } = weather

  return (
    <section className="mt-10 rounded-3xl border border-slate-800/70 bg-linear-to-br from-slate-900/80 via-slate-900/40 to-slate-900/80 p-8 text-center shadow-2xl shadow-sky-900/40">
      <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Now in</p>
      <h2 className="mt-2 text-3xl font-bold text-white">{location}</h2>

      <div className="mt-6 flex flex-col items-center gap-2">
        <span className="text-5xl">{getWeatherIcon(weather.code)}</span>
        <p className="text-6xl font-extrabold text-white">
          {Math.round(temperature)}
          <span className="text-3xl align-top text-slate-300">°C</span>
        </p>
        <p className="text-lg text-slate-300">{description}</p>
      </div>

      <dl className="mt-10 grid grid-cols-2 gap-4 text-left text-slate-200 sm:grid-cols-3">
        <div className="rounded-2xl bg-slate-900/60 p-4">
          <dt className="text-xs uppercase tracking-wide text-slate-400">Humidity</dt>
          <dd className="text-2xl font-semibold text-white">{humidity}%</dd>
        </div>
        <div className="rounded-2xl bg-slate-900/60 p-4">
          <dt className="text-xs uppercase tracking-wide text-slate-400">Wind</dt>
          <dd className="text-2xl font-semibold text-white">{Math.round(windSpeed)} km/h</dd>
        </div>
        <div className="col-span-2 rounded-2xl bg-slate-900/60 p-4 sm:col-span-1">
          <dt className="text-xs uppercase tracking-wide text-slate-400">Feels like</dt>
          <dd className="text-2xl font-semibold text-white">{Math.round(weather.apparentTemperature)}°C</dd>
        </div>
      </dl>
    </section>
  )
}

export default WeatherCard
