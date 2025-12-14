import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { Listbox, ListboxOptions, ListboxButton } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import TextInput from "../components/inputs/TextInput";
import { useRegister } from "../api/hooks/authQueries";
import { useAuth } from "../context/AuthContext";
import { useCinemas } from "../api/hooks/cinemaQueries";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");

    const { data: cinemas = [], isLoading } = useCinemas();
    const { login } = useAuth();

    const [selectedCinema, setSelectedCinema] = useState(null);

    const registerMutation = useRegister();
    useEffect(() => {
        if (cinemas.length > 0 && !selectedCinema) {
            setSelectedCinema(cinemas[0]);
        }
    }, [cinemas, selectedCinema]);

    const handleRegister = () => {
        registerMutation.mutate(
            { email, password },
            {
                onSuccess: async () => {
                    try {
                        await login(email, password);
                    } catch (err) {
                        console.error("Błąd logowania po rejestracji:", err);
                    }
                },
                onError: (error) => {
                    alert("Błąd rejestracji");
                    console.error(error);
                },
            }
        );
    };

    return (
        <div className="h-full w-full flex items-center justify-center px-4">
            <div className="border-2 rounded-2xl w-full md:max-w-[900px] flex flex-col gap-6 px-12 py-8">
                <h1 className="text-3xl text-center flex flex-col">
                    Zaloguj się na swoje konto <span className="text-primary">CINEO</span>
                </h1>

                <div className="flex gap-12">
                    {/* LEWA KOLUMNA */}
                    <div className="w-full flex flex-col gap-y-2">
                        <TextInput
                            label="Imię"
                            placeholder="Jan"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextInput
                            label="Nazwisko"
                            placeholder="Kowalski"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
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

                    {/* PRAWA KOLUMNA */}
                    <div className="w-full flex flex-col">
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
                                    digits =
                                        digits.slice(0, 3) +
                                        " " +
                                        digits.slice(3, 6) +
                                        " " +
                                        digits.slice(6, 9);
                                }
                                setPhone(digits);
                            }}
                            maxLength={11}
                            className="w-full bg-[#0C0C0C] border-2 border-[#505050] px-2 py-4 rounded-md focus:outline-none focus:border-primary"
                        />

                        <div className="flex flex-col mt-4">
                            <span>Wybierz kino</span>

                            <Listbox value={selectedCinema} onChange={setSelectedCinema}>
                                <div className="relative">
                                    <ListboxButton className="w-full bg-[#0C0C0C] border-2 border-[#505050] px-4 py-4 rounded-md flex justify-between items-center">
                                        {selectedCinema
                                            ? selectedCinema.name
                                            : "Wybierz kino"}
                                        <ChevronDown size={20} />
                                    </ListboxButton>

                                    <ListboxOptions className="absolute z-10 w-full mt-1 bg-[#0C0C0C] border-2 border-[#505050] rounded-md max-h-60 overflow-auto">
                                        {cinemas.map((cinema) => (
                                            <Listbox.Option
                                                key={cinema.id}
                                                value={cinema}
                                                className={({ active }) =>
                                                    `px-4 py-2 cursor-pointer ${active
                                                        ? "bg-primary text-white"
                                                        : "text-white"
                                                    }`
                                                }
                                            >
                                                {cinema.name}
                                            </Listbox.Option>
                                        ))}
                                    </ListboxOptions>
                                </div>
                            </Listbox>
                        </div>

                        <button
                            onClick={handleRegister}
                            disabled={!selectedCinema}
                            className="w-full mt-7 bg-primary py-4 rounded-md text-2xl transition-all hover:brightness-125 disabled:opacity-50"
                        >
                            Zarejestruj się
                        </button>

                        <Link to="/" className="flex justify-center mt-7">
                            <img src={logo} alt="Logo" className="h-20" />
                        </Link>
                    </div>
                </div>

                <h1 className="text-xl text-center">
                    Masz już konto?{" "}
                    <Link to="/login" className="text-primary hover:underline">
                        Zaloguj się
                    </Link>
                </h1>
            </div>
        </div>
    );
};

export default RegisterPage;