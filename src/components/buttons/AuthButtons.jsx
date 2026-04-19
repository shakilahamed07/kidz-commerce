"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function AuthButtons() {
  const session = useSession();
  const path = usePathname();
  return (
    <div>
      {session.status == "authenticated" ? (
        <button onClick={() => signOut()} className="btn btn-primary">
          LogOut
        </button>
      ) : (
        <Link href={`/login?callbackUrl=${path}`} className="btn btn-primary">
          Login
        </Link>
      )}
    </div>
  );
}
