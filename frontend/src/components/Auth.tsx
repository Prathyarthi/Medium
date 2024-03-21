import { SignupSchema } from "@prathyarthi/common";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../axiosInstance";

export function Auth({ type }: { type: "signup" | "signin" }) {
    const [postInputs, setPostInputs] = useState<SignupSchema>({
        name: "",
        email: "",
        password: ""
    })

    const navigate = useNavigate()
    async function sendRequest() {
        try {
            const response = await axiosInstance.post(`/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs)

            const jwt = response.data.token
            console.log(jwt);
            localStorage.setItem("token", jwt)
            navigate('/blogs')
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex flex-col border rounded-lg ">
                <div className="p-5 flex flex-col gap-2">
                    <h1 className="text-3xl font-bold mb-2">Create an account</h1>
                    {
                        type === "signup" ?
                            <LabelledInput label="Username" placeholder="Ex: Prathyarthi" onchange={(e) => {
                                setPostInputs({
                                    ...postInputs,
                                    name: e.target.value
                                })
                            }} />
                            : null

                    }
                    <LabelledInput label="Email" type={"email"} placeholder="Ex: prathyarthi@gmail.com" onchange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            email: e.target.value
                        })
                    }} />
                    <LabelledInput label="Password" type={"password"} placeholder="Ex: password@123" onchange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value
                        })
                    }} />
                    <button onClick={sendRequest} className="bg-slate-900 text-gray-50 border rounded-md mt-2 p-2">{type === "signup" ? "Sign up!" : "Sign in!"}</button>
                    <p>{type === "signup" ? "Already have an account?" : "Don't have an account?"}<span className="underline m-2">
                        <Link to={type === "signup" ? "/signin" : "/signup"}>{type === "signup" ? "Sign up!" : "Sign in!"}</Link>
                    </span></p>
                </div>
            </div>
        </div>
    )
}


interface LabelledInputProps {
    label: string
    placeholder: string
    onchange: (e: ChangeEvent<HTMLInputElement>) => void
    type?: string
}
function LabelledInput({ label, placeholder, onchange, type }: LabelledInputProps) {
    return (
        <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-xl">{label}</h2>
            <input onChange={onchange} type={type || "text"} className="p-2 border rounded w-full" placeholder={placeholder} required />
        </div>
    )
}