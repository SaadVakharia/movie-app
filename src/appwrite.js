import { Client, Databases, ID, Query } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const ENDPOINT_URL = import.meta.env.VITE_APPWRITE_ENDPOINT_URL;

const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_URL;

const client = new Client()
  .setEndpoint(ENDPOINT_URL)
  .setProject(PROJECT_ID);


const database = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [Query.equal("searchTerm", searchTerm)]);

        if (result.documents.length > 0) {
           const doc = result.documents[0];
           await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
                count: doc.count + 1,         
            });
        }
        else {
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm,
                count: 1,
                movie_id: movie.id,
                poster_url: IMAGE_BASE_URL + movie.poster_path,
            });
        }
    } catch (error) {
        console.error("Error updating search count:", error);
    }
}

export const getTrendingMovies = async () => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc("count")], 10);
        
        return result.documents;
    } catch (error) {
        console.error("Error fetching trending movies:", error);
    }
}