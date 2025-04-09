import { createSessionClient } from "@/appwrite/appwrite.config";
import { cookies } from "next/headers";
import { ID } from 'node-appwrite';

export async function GET() {
    const sessionCookie = (await cookies()).get("session");

    try {
        const { databases } = await createSessionClient(sessionCookie?.value);
        
        const { documents: orders, total } = await databases.listDocuments(
            process.env.NEXT_PUBLIC_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_COLLECTION_ORDERS as string
        );
        
        return Response.json({ orders, total });
    } catch (error) {
        console.error("ERROR", error);
      
        return Response.json("Access DENIED!", {
            status: 403,
        });
    }
}

export async function POST() {
    const sessionCookie = (await cookies()).get("session");

    try {
        const { databases } = await createSessionClient(sessionCookie?.value);

        let addDocument = {
            status: "DECLINED",
            customer: "bobby",
            customer_email: "bobby@email.com",
            total: 21,
            type: "Refund"
        };
        
        const { $id } = await databases.createDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_COLLECTION_ORDERS as string,
            ID.unique(),
            addDocument
        );
        
        return Response.json({ $id });
    } 
    catch (error) {
        console.error("ERROR", error);
      
        return Response.json("Access DENIED!", {
            status: 403,
        });
    }
}
