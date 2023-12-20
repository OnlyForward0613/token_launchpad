import ConnectButton from "@/components/ConnectButton";
import Header from "@/components/Header";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Header />
      <div className="bg-slate-900 w-full">
        <div className="w-2/5 py-32 m-auto">
          <div>
            <p className="text-lg text-white font-medium my-2">Name: </p>
            <input className="w-full bg-transparent border-2 rounded-3xl text-lg py-2 px-4 text-cyan-100"></input>
          </div>
          <div>
            <p className="text-lg text-white font-medium my-2">Symbol: </p>
            <input className="w-full bg-transparent border-2 rounded-3xl text-lg py-2 px-4 text-cyan-100"></input>
          </div>

          <div>
            <p className="text-lg text-white font-medium my-2">Decimals: </p>
            <input
              type="number"
              className="w-full bg-transparent border-2 rounded-3xl text-lg py-2 px-4 text-cyan-100"
            ></input>
          </div>
          <div>
            <p className="text-lg text-white font-medium my-2">
              Tokens to Mint:{" "}
            </p>
            <input
              type="number"
              className="w-full bg-transparent border-2 rounded-3xl text-lg py-2 px-4 text-cyan-100"
            ></input>
          </div>
          <div>
            <p className="text-lg text-white font-medium my-2">
              Retain Freeze Auth?{" "}
            </p>
            <select className="w-full bg-transparent border-2 rounded-3xl text-lg py-2 px-4 text-cyan-100">
              <option value="1" className="text-black">
                Yes
              </option>
              <option value="0" className="text-black">
                No
              </option>
            </select>
          </div>
          <div>
            <p className="text-lg text-white font-medium my-2">
              Retain Mint Auth?{" "}
            </p>
            <select className="w-full bg-transparent border-2 rounded-3xl text-lg py-2 px-4 text-cyan-100">
              <option value="1" className="text-black">
                Yes
              </option>
              <option value="0" className="text-black">
                No
              </option>
            </select>
          </div>

          <div className="mt-8">
            <button className="block w-[250px] py-4 px-8 rounded-3xl text-black text-xl font-bold bg-green-400 m-auto">
              Create Token
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
