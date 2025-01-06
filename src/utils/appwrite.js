import { Client, Databases } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.PROJECT_ID);

const databases = new Databases(client);

export { client, databases };
