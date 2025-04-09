import { Client, Databases, Account } from "node-appwrite";

const createAdminClient = async () => {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT as string)
        .setProject(process.env.NEXT_PUBLIC_PROJECT_ID as string)
        .setKey(process.env.NEXT_PUBLIC_API_KEY as string);

    return {
        get account() {
            return new Account(client);
        },

        get databases() {
            return new Databases(client);
        },
    };
};

// @ts-ignore
const createSessionClient = async (session) => {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT as string)
        .setProject(process.env.NEXT_PUBLIC_PROJECT_ID as string);

    if (session) {
        client.setSession(session);
    }

    return {
        get account() {
            return new Account(client);
        },

        get databases() {
            return new Databases(client);
        },
    };
};

export { createAdminClient, createSessionClient };