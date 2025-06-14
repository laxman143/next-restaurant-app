"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const DeleteButton = ({ id }: { id: string }) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (status === "unauthenticated" || !session?.user.isAdmin) {
        return;
    }

    const handleDelete =  async() => {
        const res = await fetch(`http://localhost:3000/api/products/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })

        if(res.status === 200) {
            router.push("/menu");
            toast.success("Product has been deleted successfully!");
        } else {
            const data = await res.json();
            toast.error(data.message || "Something went wrong!");
        }
    }
    return (
        <button className="bg-red-400 p-2 rounded-full absolute top-4 right-4"  onClick={handleDelete}>
            <Image src="/delete.png" alt="Delete" width={20} height={20} />
        </button>
    )
}

export default DeleteButton