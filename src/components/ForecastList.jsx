import { describeWeatherCode, getWeatherIcon } from '../utils/weatherCodes'

const formatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
})

function ForecastList({ days }) {
  if (!days.length) {
    return null
  }

  return (
    <section className="mt-8">
      <h3 className="text-lg font-semibold text-slate-100">Upcoming forecast</h3>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2">
        {days.map((day) => (
          <li
            key={day.date}
            className="flex items-center justify-between rounded-2xl border border-slate-800/70 bg-slate-900/50 px-4 py-3 text-slate-200"
          >
            <div>
              <p className="text-sm text-slate-400">{formatter.format(new Date(day.date))}</p>
              <p className="font-semibold text-white">{describeWeatherCode(day.code)}</p>
            </div>
            <div className="flex items-center gap-4 text-right">
              <span className="text-3xl">{getWeatherIcon(day.code)}</span>
              <div className="text-sm">
                <p className="font-semibold text-white">{Math.round(day.max)}°C</p>
                <p className="text-slate-400">{Math.round(day.min)}°C</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
export default ForecastList
