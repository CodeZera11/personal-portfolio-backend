"use client"

import { ChangeEvent, useState } from "react";
import axios from "axios"
import toast from "react-hot-toast";

const AddCertificatePage = () => {

    const [title, setTitle] = useState<string>("");
    const [link, setLink] = useState<string>("");
    const [image, setImage] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false)

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();

        reader.onload = function (onLoadEvent) {
            if (onLoadEvent && onLoadEvent.target) {
                setImage(onLoadEvent.target.result);
            }
        }

        //@ts-ignore
        reader.readAsDataURL(e.target.files[0]);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            if (!title || !image) {
                return;
            }

            const data = {
                title,
                image,
                link
            }
            setLoading(true);
            const response = await axios.post("/api/certificate", data)
            if (response.status === 200) {
                toast.success("Certificate Added Successfully")
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
            <h1 className="text-white text-5xl font-bold text-center">Add Certificate</h1>
            <form className="flex flex-col gap-5">
                <div className="flex flex-col gap-5">
                    <label className="text-2xl font-bold" htmlFor="title">Title</label>
                    <input id="title" type="text" placeholder="Enter Certificate Title" value={title} onChange={e => setTitle(e.target.value)} className="text-black p-4 rounded-xl text-xl" required />
                </div>
                <div className="flex flex-col gap-5">
                    <label className="text-2xl font-bold" htmlFor="image">Image</label>
                    <input id="image" className="border border-white rounded-xl p-5" type="file" onChange={handleFileChange} />
                </div>
                <div className="flex flex-col gap-5">
                    <label className="text-2xl font-bold" htmlFor="link">Link</label>
                    <input id="link" type="text" placeholder="Enter Certificate Link" value={link} onChange={e => setLink(e.target.value)} className="text-black p-4 rounded-xl text-xl" required />
                </div>
                <button disabled={loading} className="border-white border hover:bg-white transition-colors duration-700 hover:text-black bg-black text-white font-bold px-4 py-2 rounded-xl" type="submit" onClick={handleSubmit}>{loading ? "Loading..." : "Add Skill"}</button>
            </form>
        </div>
    )
}

export default AddCertificatePage;