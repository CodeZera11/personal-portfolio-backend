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

            const data = {
                title,
                icon
            }
            setLoading(true);
            await axios.post("/api/skill", data)
            toast.success("Skill Created Successfully")
        } catch (error: any) {
            toast.error(error.message)
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-black max-w-2xl mx-auto mt-10">
            <form className="flex flex-col gap-5">
                <div className="flex flex-col gap-5">
                    <label className="text-2xl font-bold" htmlFor="title">Title</label>
                    <input type="text" placeholder="Enter Skill Title" value={title} onChange={e => setTitle(e.target.value)} className="text-black p-4 rounded-xl text-xl" required />
                </div>
                <div className="flex flex-col gap-5">
                    <label className="text-2xl font-bold" htmlFor="icon">Icon</label>
                    <input accept=".png" className="border border-white rounded-xl p-5" type="file" onChange={handleFileChange} />
                </div>
                <button disabled={loading} className="border-white border hover:bg-white transition-colors duration-700 hover:text-black bg-black text-white font-bold px-4 py-2 rounded-xl" type="submit" onClick={handleSubmit}>{loading ? "Loading..." : "Add Skill"}</button>
            </form>
        </div>
    )
}

export default AddSkillPage;