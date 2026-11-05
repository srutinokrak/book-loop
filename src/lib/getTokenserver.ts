import { headers } from "next/headers";
import { auth } from "./auth";

export const getTokenServer = async () => {

      const jwtToken  = await auth.api.getToken ({
        headers: await headers()
      });
    
    const token = jwtToken?.token;

      console.log("Token:", token);

      return token;
}