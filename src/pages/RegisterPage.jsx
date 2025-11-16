import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { Listbox, ListboxOptions, ListboxButton } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import TextInput from "../components/inputs/TextInput";

const RegisterPage = () => {

    const [name, setName] = useState("");
    const [surname, setSuranme] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");

    const cinemas = [
        { id: 1, name: "Cineo Warszawa" },
        { id: 2, name: "Cineo Kraków" },
        { id: 3, name: "Cineo Kielce" },
    ];

    const [selectedCinema, setSelectedCinema] = useState(cinemas[0]);

    return (
        <div className="h-full w-full flex items-center justify-center px-4">
            <div className="border-2 rounded-2xl w-full md:max-w-[900px] flex flex-col gap-6 px-12 py-10">
                <h1 className="text-4xl text-center flex flex-col">
                    Zaloguj się na swoje konto <span className="text-primary">CINEO</span>
                </h1>

                <div className="flex gap-12">
                    <div className="w-full flex flex-col gap-y-2">
                        <TextInput
                            label="Imię"
                            type="name"
                            placeholder="Jan"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextInput
                            label="Nazwisko"
                            type="surename"
                            placeholder="Kowalski"
                            value={surname}
                            onChange={(e) => setSuranme(e.target.value)}
                        />
                        <TextInput
                            label="Email"
                            type="email"
                            placeholder="twoj@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextInput
                            label="Hasło"
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextInput
                            label="Potwierdź hasło"
                            type="password"
                            placeholder="********"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <div className="w-1 bg-primary" />

                    <div className="w-full flex flex-col">
                        <span>Data urodzenia</span>
                        <div className="flex w-full gap-x-2">
                            <input
                                type="text"
                                placeholder="DD"
                                maxLength={2}
                                pattern="\d*"
                                inputMode="numeric"
                                className="text-center w-1/3 bg-[#0C0C0C] border-2 border-[#505050] px-2 py-4 rounded-md placeholder:text-[#202020] focus:outline-none focus:border-primary"
                            />
                            <input
                                type="text"
                                placeholder="MM"
                                maxLength={2}
                                pattern="\d*"
                                inputMode="numeric"
                                className="text-center w-1/3 bg-[#0C0C0C] border-2 border-[#505050] px-2 py-4 rounded-md placeholder:text-[#202020] focus:outline-none focus:border-primary"
                            />
                            <input
                                type="text"
                                placeholder="YYYY"
                                maxLength={4}
                                pattern="\d*"
                                inputMode="numeric"
                                className="text-center w-1/3 bg-[#0C0C0C] border-2 border-[#505050] px-2 py-4 rounded-md placeholder:text-[#202020] focus:outline-none focus:border-primary"
                            />
                        </div>
                        <div className="flex flex-col mt-2">
                            <span>Telefon (opcjonalnie)</span>
                            <input
                                type="text"
                                placeholder="123 456 789"
                                value={phone}
                                onChange={(e) => {
                                    let digits = e.target.value.replace(/\D/g, "");
                                    if (digits.length > 3 && digits.length <= 6) {
                                        digits = digits.slice(0, 3) + " " + digits.slice(3);
                                    } else if (digits.length > 6) {
                                        digits = digits.slice(0, 3) + " " + digits.slice(3, 6) + " " + digits.slice(6, 9);
                                    }
                                    setPhone(digits);
                                }}
                                maxLength={11}
                                inputMode="numeric"
                                className="w-full bg-[#0C0C0C] border-2 border-[#505050] px-2 py-4 rounded-md placeholder:text-[#202020] focus:outline-none focus:border-primary"
                            />
                        </div>
                        <div className="flex flex-col mt-2">
                            <span>Wybierz kino</span>
                            <Listbox value={selectedCinema} onChange={setSelectedCinema}>
                                <div className="relative">
                                    <ListboxButton className="w-full bg-[#0C0C0C] border-2 border-[#505050] cursor-pointer px-4 py-4 rounded-md text-left focus:outline-none focus:border-primary flex justify-between items-center">
                                        {selectedCinema.name}
                                        <ChevronDown size={20} className="text-gray-400" />
                                    </ListboxButton>

                                    <ListboxOptions className="absolute z-10 mt-1 w-full bg-[#0C0C0C] border-2 border-[#505050] rounded-md max-h-60 overflow-auto shadow-lg">
                                        {cinemas.map((cinema) => (
                                            <Listbox.Option
                                                key={cinema.id}
                                                value={cinema}
                                                className={({ active }) =>
                                                    `cursor-pointer px-4 py-2 ${active ? "bg-primary text-white" : "text-white"}`
                                                }
                                            >
                                                {cinema.name}
                                            </Listbox.Option>
                                        ))}
                                    </ListboxOptions>
                                </div>
                            </Listbox>
                        </div>
                        <button className="w-full mt-7 bg-primary py-4 rounded-md text-2xl transition-all duration-300 ease-out hover:brightness-125 hover:shadow-[0_0_20px_#DF2144aa] cursor-pointer">
                            Zarejestruj się
                        </button>

                        <Link to="/" className="flex items-center justify-center mt-7">
                            <img
                                src={logo}
                                alt="Logo"
                                className="h-20 w-auto object-contain"
                            />
                        </Link>
                    </div>
                </div>
                <h1 className="text-xl text-center flex flex-col">
                    Masz juz konto? <Link to="/login" className="text-primary hover:underline">Zaloguj się</Link>
                </h1>
            </div>
        </div>
    );
}

export default RegisterPage;