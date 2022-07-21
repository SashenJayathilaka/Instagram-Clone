/* eslint-disable @next/next/no-typos */
/* eslint-disable @next/next/no-img-element */
import { getProviders, signIn as signIntoProvider } from "next-auth/react";
import Header from "../../components/Header";

function signIn({ providers }) {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen py-2 -m-56 px-14 text-center pt-60">
        <img
          className="w-70"
          src="https://www.pngmart.com/files/13/Instagram-Logo-PNG-Transparent.png"
          alt=""
        />
        <p className="font-xs italic">
          This is not a Real app, it is build for educational purpose only
        </p>
        <div className="mt-20">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="p-3 bg-blue-500 rounded-lg text-white"
                onClick={() =>
                  signIntoProvider(provider.id, { callbackUrl: "/" })
                }
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: { providers },
  };
}

export default signIn;
