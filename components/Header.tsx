import React from "react";
import auth, { User } from "@/auth";

export default async function Header() {
    const user: User | null = await auth.getUser();

    return (
        <header>
            <>{user && <strong>Welcome, {user?.name || user.email}</strong>}</>

            <div>
                <form action={auth.deleteSession}>
                    <button>Logout</button>
                </form>
            </div>
        </header>
    );
}
