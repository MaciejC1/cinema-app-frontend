import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import TextInput from "../components/inputs/TextInput";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="h-full w-full flex items-center justify-center px-4">
            <div className="border-2 rounded-2xl w-full md:max-w-[480px] flex flex-col gap-6 px-12 py-10">

                <h1 className="text-4xl text-center">
                    Zaloguj się na swoje konto <span className="text-primary">CINEO</span>
                </h1>

                <TextInput
                    label="Email"
                    type="email"
                    placeholder="twoj@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <div className="flex flex-col w-full">
                    <TextInput
                        label="Hasło"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="flex justify-end mt-1">
                        <Link className="text-primary hover:underline">
                            Zapomniałeś hasła?
                        </Link>
                    </div>
                </div>

                <button className="w-full bg-primary py-5 rounded-md text-2xl transition-all duration-300 ease-out hover:brightness-125 hover:shadow-[0_0_20px_#DF2144aa] cursor-pointer">
                    Zaloguj się
                </button>

                <div className="flex flex-col items-center justify-center">
                    <span>Nie masz konta?</span>
                    <Link to="/register" className="text-primary hover:underline">
                        Zarejestruj się
                    </Link>
                </div>

                <Link to="/" className="flex items-center justify-center mt-10">
                    <img
                        src={logo}
                        alt="Logo"
                        className="h-24 w-auto object-contain"
                    />
                </Link>

            </div>
        </div>
    );
};

export default LoginPage;
