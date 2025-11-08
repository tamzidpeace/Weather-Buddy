function SearchForm({ value, onChange, onSubmit, isLoading }) {
  return (
    <form
      onSubmit={onSubmit}
      className="mt-8 flex flex-col gap-3 rounded-2xl border border-slate-800/80 bg-slate-900/50 p-4 shadow-lg shadow-slate-950/40 backdrop-blur sm:flex-row"
    >
      <label htmlFor="city" className="sr-only">
        City name
      </label>
      <input
        id="city"
        name="city"
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search for a city (e.g., Tokyo)"
        className="flex-1 rounded-xl border border-slate-700/80 bg-slate-950/60 px-4 py-3 text-base text-slate-100 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
        autoComplete="off"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !value.trim()}
        className="rounded-xl bg-sky-500 px-6 py-3 font-semibold text-white transition hover:bg-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? 'Searching…' : 'Get Weather'}
      </button>
    </form>
  )
}

export default SearchForm
