import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.MONGO_PASS) {
  throw new Error('Missing MONGO_PASS in environment variables');
}

const mongoPass = process.env.MONGO_PASS;
const uri = `mongodb+srv://admin:${mongoPass}@teufatest.7oc6wxs.mongodb.net/?retryWrites=true&w=majority&appName=teufatest`;

let client: MongoClient;

export async function connect() {
  if (!client) {
    client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
    await client.connect();
  }
  return client.db("teufatest");
}
