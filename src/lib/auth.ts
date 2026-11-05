import { betterAuth} from "better-auth";
import { MongoClient } from "mongodb";
import { jwt } from "better-auth/plugins"
import { mongodbAdapter } from "@better-auth/mongo-adapter";
const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db('booknook');
export { db };
export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

    emailAndPassword: { 
    enabled: true, 
  },
   plugins: [
        jwt(),
    ],
    session: {
      cookieCache : {
        enabled: true,
        strategy: 'jwt',
        maxAge: 60 * 60 * 24 * 7 
      }
    }
});
