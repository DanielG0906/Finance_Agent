import {Account, Client, Databases, ID, Models, Query} from "react-native-appwrite";
import {UserDetails} from "@/interfaces/interfaces";

const DATABASE_ID: string = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_USERS = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID_USERS!;


const client = new Client()
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
    .setPlatform("com.daniel.financeAgent")


const database = new Databases(client);



export const createEmailPasswordSession = async (email: string, password: string): Promise<Models.Session> => {
    try {
        const account = new Account(client);

        return await account.createEmailPasswordSession({
            email: email,
            password: password
        });
    } catch (e) {
        throw e;
    }
};
// הוספת סימן שאלה אחרי id או הגדרת ערך ברירת מחדל
export const deleteSession = async (id: string = 'current'): Promise<void> => {
    const account = new Account(client);
    try {
        await account.deleteSession(id);
    } catch (e) {
        throw e;
    }
}

export const getCurrentSession = async () => {
    try {
        const account = new Account(client);
        return await account.getSession('current');
    } catch (e) {
        return null; // No session exists
    }
}

export const getCurrentUser = async (): Promise<UserDetails> => {
    try {
        const account = new Account(client);
        const currentAccount = await account.get();

        const result = await database.listDocuments(
            DATABASE_ID as string,
            COLLECTION_USERS as string,
            [Query.equal('userId', currentAccount.$id)])

        return result.documents[0] as unknown as UserDetails;
    } catch (e) {
        console.log("No active session (Guest)");
        throw e;
    }
}

export const createNewAccount = async (email: string, password: string, userName: string, gender: string): Promise<Models.User> => {

    try {
        const account = new Account(client);
        const newAccount = await account.create({
            userId: ID.unique(),
            email: email,
            password: password,
            name: userName
        });

        await database.createDocument(DATABASE_ID, COLLECTION_USERS, ID.unique(), {
            userId: newAccount.$id,
            username: userName,
            email: email,
            gender: gender
        });


        return newAccount;
    } catch (e) {
        //need to add a delete account
        throw e;
    }
}






