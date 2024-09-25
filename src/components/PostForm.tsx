import { ChangeEvent, FormEvent, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import PostItem from "./PostItem";
import { auth, useLoggedIn } from "../auth";
import { toLink } from "../routes";

const PostForm = () => {
    const navigate = useNavigate();
    const { loggedIn } = useLoggedIn();

    const dataTemplate = {
        title: "",
        summary: "",
        content: "",
    };

    const [formData, setFormData] = useState(dataTemplate);

    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        setMessage(null);

        const getLoggedIn = auth();
        const date = new Date();
        const data = {
            ...formData,
            createdOn: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
            user: getLoggedIn?.user.email,
        };

        fetch("http://localhost:3000/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + getLoggedIn?.accessToken,
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                if (typeof data !== "object") {
                    navigate(toLink("login"), {
                        replace: true,
                    });

                    return;
                }

                setMessage("Post created!");

                setFormData(dataTemplate);
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

    let _title: string;
    let _text: string;

    return (
        <>
            <div className="grid grid-cols-2 gap-5">
                <div>
                    <h2 className="text-2xl mb-6 font-bold">Create Post</h2>
                    <Form
                        className="grid gap-y-4 bg-gray-200 p-5 rounded-lg shadow"
                        onSubmit={handleSubmit}
                    >
                        {message && (
                            <p className="mb-1 font-bold text-green-800">
                                {message}
                            </p>
                        )}

                        <label>
                            <div className="font-semibold text-lg mb-2">
                                Title
                            </div>
                            <input
                                type="text"
                                name="title"
                                required
                                className="w-full rounded"
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            <div className="font-semibold text-lg mb-2">
                                Summary
                            </div>
                            <textarea
                                name="summary"
                                required
                                className="w-full rounded min-h-17 h-17"
                                value={formData.summary}
                                onChange={handleChange}
                            ></textarea>
                        </label>

                        <label>
                            <div className="font-semibold text-lg mb-2">
                                Text (Markdown supported)
                            </div>
                            <textarea
                                name="content"
                                required
                                className="w-full rounded min-h-40"
                                value={formData.content}
                                onChange={handleChange}
                            ></textarea>
                        </label>

                        <button className="px-4 py-2 mt-5 font-semibold rounded bg-blue-400 text-white border-b-2 border-blue-800 hover:border-blue-900 hover:bg-blue-500 active:border-blue-950 active:bg-blue-600 transition-colors">
                            Create
                        </button>
                    </Form>
                </div>
                <div className="grid grid-rows-[auto_1fr]">
                    <h2 className="text-2xl mb-6 font-bold">Preview</h2>
                    <PostItem
                        post={{
                            title:
                                (_title = formData.title).trim() === ""
                                    ? "Post Title"
                                    : _title,
                            createdOn: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
                            user: loggedIn?.user.email,
                            id: "mockup",
                            content:
                                (_text = formData.content).trim() === ""
                                    ? "Here goes the text..."
                                    : _text,
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default PostForm;
