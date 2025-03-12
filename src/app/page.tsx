export default function Home() {
  return (
    <div className="h-screen w-full flex flex-col items-center gap-16 bg-indigo-500">
      <div className="flex flex-col gap-1 mt-40">
        <h2 className="text-6xl">This is a</h2>
        <h1 className="text-7xl">
          <b>Booking App.</b>
        </h1>
      </div>
      <a href="/login">
        <button className="text-xl bg-indigo-100 rounded-md px-3 py-1 text-indigo-600">
          <b>Get Started</b>
        </button>
      </a>
    </div>
  );
}
