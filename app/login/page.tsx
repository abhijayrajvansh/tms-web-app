import auth from "@/auth";
import { redirect } from "next/navigation";

const page = async () => {
    const user = await auth.getUser();
    
    if (user) redirect("/");
    
    return (
        <div>
            <form action={auth.createSession} id="login-form">
                <h3>Login</h3>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email..."
                        defaultValue="r.abhijay@uptut.com"
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password..."
                        defaultValue="password123"
                    />
                </div>
                <div>
                    <input type="submit" value={"Login"} />
                </div>
            </form>
        </div>
    );
}

export default page;