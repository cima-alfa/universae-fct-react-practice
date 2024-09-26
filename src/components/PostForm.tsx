import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import PostItem from "./PostItem";
import { auth, useLoggedIn } from "../auth";
import { toLink } from "../routes";
import { useRefresh } from "../hooks";

const PostForm = () => {
    const navigate = useNavigate();
    const { loggedIn } = useLoggedIn();
    const { refresh, setRefresh } = useRefresh();
    const { postId: editPost } = useParams();

    const dataTemplate = useMemo(
        () => ({
            title: "",
            summary: "",
            content: "",
        }),
        []
    );

    const [formData, setFormData] = useState(dataTemplate);

    const date = new Date();

    useEffect(() => {
        setFormData(dataTemplate);

        if (editPost) {
            fetch(`http://localhost:3000/posts/${editPost}`)
                .then((res) => res.json())
                .then((data) => {
                    if (
                        typeof data !== "object" ||
                        Object.entries(data).length <= 1
                    ) {
                        navigate(toLink("dashboard"), {
                            replace: true,
                        });

                        return;
                    }

                    setFormData({
                        title: data.title,
                        summary: data.summary,
                        content: data.content,
                    });
                })
                .catch(() => {
                    navigate(toLink("dashboard"), {
                        replace: true,
                    });
                });
        }
    }, [editPost, navigate, refresh, dataTemplate]);

    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        setMessage(null);

        const getLoggedIn = auth();

        const data = editPost
            ? formData
            : {
                  ...formData,
                  createdOn: new Date().getTime(),
                  user: getLoggedIn?.user.email,
              };

        fetch(`http://localhost:3000/posts${editPost ? `/${editPost}` : ""}`, {
            method: editPost ? "PATCH" : "POST",
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

                setMessage(editPost ? "Post edited!" : "Post created!");
                setRefresh(true);

                if (!editPost) {
                    setFormData(dataTemplate);
                }
            })
            .catch(() => {});
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
                    <h2 className="text-2xl mb-6 font-bold">
                        {editPost === undefined ? "Create Post" : "Edit Post"}
                    </h2>
                    <Form
                        className="grid gap-y-4 bg-gray-200 p-5 rounded-lg shadow"
                        onSubmit={handleSubmit}
                        id="post-form"
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
                            {editPost ? "Edit" : "Create"}
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
                            createdOn: date.getTime(),
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
