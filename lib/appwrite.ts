import { Client, Databases } from "appwrite";

// Initialize the Appwrite client
const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT) // Your Appwrite endpoint
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID); // Your Project ID

const databases = new Databases(client);

export { client, databases };
