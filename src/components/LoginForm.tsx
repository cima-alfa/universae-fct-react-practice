import { ChangeEvent, FormEvent, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { auth, useLoggedIn } from "../auth";
import { toLink } from "../routes";

const LoginForm = () => {
    const { setLoggedIn } = useLoggedIn();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        setProcessing(true);

        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => {
                setProcessing(false);

                if (typeof data !== "object") {
                    setError(data);

                    return;
                }

                localStorage.setItem("access-token", JSON.stringify(data));

                setLoggedIn(auth());

                navigate(toLink("dashboard"), { replace: true });
            })
            .catch(() => {
                setProcessing(false);
                setError("Something went wrong, try again later.");
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
                Login to your account
            </h1>

            <Form
                className="grid gap-y-4 sm:max-w-lg w-full bg-gray-200 py-5 px-10 mx-auto rounded-lg shadow"
                onSubmit={handleSubmit}
            >
                {processing && (
                    <p className="mb-1 font-bold text-sky-800">
                        Logging you in...
                    </p>
                )}

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
                <button className="px-4 py-2 mt-5 font-semibold rounded bg-blue-400 text-white border-b-2 border-blue-800 hover:border-blue-900 hover:bg-blue-500 active:border-blue-950 active:bg-blue-600 transition-colors">
                    Login
                </button>
            </Form>
        </>
    );
};

export default LoginForm;
