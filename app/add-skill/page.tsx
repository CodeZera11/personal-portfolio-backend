"use client"

import { ChangeEvent, useState } from "react";
import axios from "axios"
import toast from "react-hot-toast";

const AddSkillPage = () => {

    const [title, setTitle] = useState<string>("");
    const [icon, setIcon] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false)

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();

        reader.onload = function (onLoadEvent) {
            if (onLoadEvent && onLoadEvent.target) {
                setIcon(onLoadEvent.target.result);
            }
        }

        //@ts-ignore
        reader.readAsDataURL(e.target.files[0]);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            if (!title || !icon) {
                return;
            }

            setLoading(true);
            const form = e.currentTarget;
            // @ts-ignore
            const fileInput = Array.from(form.elements).find(({ name }) => name === 'icon');

            const formData = new FormData();

            //@ts-ignore
            for (const file of fileInput.files) {
                formData.append('file', file);
            }

            formData.append('upload_preset', 'my_uploads');

            await fetch('https://api.cloudinary.com/v1_1/db6t06fzk/image/upload', {
                method: 'POST',
                body: formData
            }).then(r => r.json());

            const data = await axios.post("https://api.cloudinary.com/v1_1/db6t06fzk/image/upload", formData)

            const secure_icon_url = data?.data.secure_url

            const input_data = {
                title,
                icon: secure_icon_url
            }
            const response = await axios.post("/api/skill", input_data)
            if (response.status === 200) {
                toast.success("Skill Added Successfully")
                setIcon(response.data.icon);
            }
        } catch (error: any) {
            toast.error(error.message)
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-black max-w-2xl mx-auto mt-10 flex flex-col gap-5">
            <h1 className="text-white text-5xl font-bold text-center">Add Skill</h1>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-5">
                    <label className="text-2xl font-bold" htmlFor="title">Title</label>
                    <input type="text" placeholder="Enter Skill Title" value={title} onChange={e => setTitle(e.target.value)} className="text-black p-4 rounded-xl text-xl" required />
                </div>
                <div className="flex flex-col gap-5">
                    <label className="text-2xl font-bold" htmlFor="icon">Icon</label>
                    <input name="icon" accept=".png" className="border border-white rounded-xl p-5" type="file" onChange={handleFileChange} />
                </div>
                <button disabled={loading} className="border-white border hover:bg-white transition-colors duration-700 hover:text-black bg-black text-white font-bold px-4 py-2 rounded-xl" type="submit">{loading ? "Loading..." : "Add Certificate"}</button>
            </form>
        </div>
    )
}

export default AddSkillPage;