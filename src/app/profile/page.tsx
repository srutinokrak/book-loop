import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export const metadata = {
  title: "My Profile",
  description: "View your profile information.",
};

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  return (
    <main className="flex min-h-[calc(100vh-76px)] items-center justify-center bg-[#f8fafc] px-5">
      
      <div className="-translate-y-8 w-full max-w-md rounded-2xl border border-slate-300 bg-white p-8 text-center shadow-md">
          <h1 className="text-3xl font-bold my-3">My Profile </h1>
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.image}
            alt={`${user.name}'s profile`}
            referrerPolicy="no-referrer"
            className="mx-auto size-24 rounded-full border border-slate-300 object-cover"
          />
        ) : (
          <div className="mx-auto flex size-24 items-center justify-center rounded-full border border-slate-300 bg-sky-100 text-2xl font-semibold text-[#334e68]">
            {user.name.trim().charAt(0).toUpperCase()}
          </div>
        )}

        <p className="mt-5 text-2xl font-semibold text-[#243b53]">
          Name: {user.name}
        </p>
        <p className="mt-2 text-slate-500">Email: {user.email}</p>
      </div>
    </main>
  );
}