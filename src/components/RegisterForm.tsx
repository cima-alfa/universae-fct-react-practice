import { ChangeEvent, FormEvent, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { auth, useLoggedIn } from "../auth";
import { toLink } from "../routes";

const RegisterForm = () => {
    const { setLoggedIn } = useLoggedIn();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.password_confirmation) {
            setError("Passwords do not match!");

            return;
        }

        const user = {
            email: formData.email,
            password: formData.password,
        };

        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then((data) => {
                if (typeof data !== "object") {
                    setError(data);
                }

                localStorage.setItem("access-token", JSON.stringify(data));

                setLoggedIn(auth());

                navigate(toLink("dashboard"), {
                    replace: true,
                    state: { dashboardMessage: "Registration successful!" },
                });
            });
    };

    const handleChange = (e: ChangeEvent) => {
        setFormData({
            ...formData,
            [(e.target as HTMLInputElement).name]: (
                e.target as HTMLInputElement
            ).value,
        });
    };

    return (
        <>
            <h1 className="text-4xl text-center mb-10 font-bold">
                Register a new account
            </h1>

            <Form
                className="grid gap-y-4 sm:max-w-lg w-full bg-gray-200 py-5 px-10 mx-auto rounded-lg shadow"
                onSubmit={handleSubmit}
            >
                {error && (
                    <p className="mb-1 font-bold text-red-800">{error}</p>
                )}
                <label>
                    <div className="font-semibold text-lg mb-2">E-Mail</div>
                    <input
                        type="email"
                        name="email"
                        required
                        className="w-full rounded"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    <div className="font-semibold text-lg mb-2">Password</div>
                    <input
                        type="password"
                        name="password"
                        required
                        className="w-full rounded"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    <div className="font-semibold text-lg mb-2">
                        Confirm Password
                    </div>
                    <input
                        type="password"
                        name="password_confirmation"
                        required
                        className="w-full rounded"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                    />
                </label>
                <button className="px-4 py-2 mt-5 font-semibold rounded bg-blue-400 text-white border-b-2 border-blue-800 hover:border-blue-900 hover:bg-blue-500 active:border-blue-950 active:bg-blue-600 transition-colors">
                    Register
                </button>
            </Form>
        </>
    );
};

export default RegisterForm;
