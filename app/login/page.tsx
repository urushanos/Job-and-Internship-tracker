import { signIn, auth } from "@/auth"
import { redirect } from "next/navigation";
 
export default async function SignIn() {
  const session = await auth();

  if (session) {
    redirect("/");
  }
  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-xl shadow-md w-96 text-center h-[400px] flex flex-col justify-around">
      <div>
              <h1 className="text-2xl font-bold mb-2">
                Application Tracker
              </h1>

              <p className="text-gray-500 mb-6">
                Sign in to continue
              </p>
      </div>
      <form
        action={async () => {
          "use server";
          await signIn("google", {redirectTo: "/"});
        }}
      >
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          type="submit"
        >
          Sign in with Google
        </button>
      </form>
    </div>
  </div>
);
} 