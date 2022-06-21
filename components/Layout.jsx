import Link from "next/link";

export default function Layout(props) {
  return (
    <div className="grid place-items-center text-white">
      <div className="w-full bg-stone-800 max-w-lg min-h-screen relative">
        <div className="fixed inset-x-0 top-0 grid">
          <header className="bg-slate-900 p-4 w-full max-w-lg place-self-center">
            <h1 className="text-4xl text-center text-white">
              FIT PHONE (header)
            </h1>
          </header>
        </div>

        <div className="pt-20 pb-24 px-4">{props.children}</div>

        <div className="fixed inset-x-0 bottom-0 grid">
          <footer
            className="
              bg-stone-900 p-3 w-full max-w-lg place-self-center
              grid grid-cols-4 gap-2 place-items-center
            "
          >
            <Link href={`/`}>
              <div className="cursor-pointer hover:bg-orange-700 p-3 text-3xl rounded-md bg-slate-700">
                P1
              </div>
            </Link>
            <Link href={`/rewards`}>
              <div className="cursor-pointer hover:bg-orange-700 p-3 text-3xl rounded-md bg-slate-700">
                P2
              </div>
            </Link>
            <Link href={`/goals`}>
              <div className="cursor-pointer hover:bg-orange-700 p-3 text-3xl rounded-md bg-slate-700">
                P3
              </div>
            </Link>
            <Link href={`/progress`}>
              <div className="cursor-pointer hover:bg-orange-700 p-3 text-3xl rounded-md bg-slate-700">
                P4
              </div>
            </Link>
          </footer>
        </div>
      </div>
    </div>
  );
}
