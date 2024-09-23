import { Form } from "react-router-dom";

const LoginForm = () => {
    return (
        <>
            <h1 className="text-4xl text-center mb-10 font-bold">
                Login to your account
            </h1>

            <Form className="grid gap-y-4 sm:max-w-lg w-full bg-gray-200 py-5 px-10 mx-auto rounded-lg shadow">
                <label>
                    <div className="font-semibold text-lg mb-2">Username</div>
                    <input
                        type="text"
                        name="username"
                        required
                        className="w-full rounded"
                    />
                </label>
                <label>
                    <div className="font-semibold text-lg mb-2">Password</div>
                    <input
                        type="password"
                        name="password"
                        required
                        className="w-full rounded"
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
