import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from 'dotenv'

dotenv.config()
const mongoPass = process.env.MONGO_PASS
const uri = `mongodb+srv://admin:${mongoPass}@teufatest.7oc6wxs.mongodb.net/?retryWrites=true&w=majority&appName=teufatest`;

const mongodb = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const client = async () => {
	try {
		await mongodb.connect()
	} catch (error) {
		console.log(error);
	}
}

export { client }