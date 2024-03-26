import { Avatar } from "./BlogCard";

export function Appbar() {
    return (
        <div className="flex justify-between p-3 border-b-2">
            <h1 className="flex justify-center items-center text-2xl font-semibold">Medium</h1>
            <Avatar name="Prathyarthi"/>
        </div>
    )
}