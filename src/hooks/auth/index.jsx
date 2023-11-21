import { verifyJwtToken } from "@/libs/auth";
import getUserInformation from "@/libs/getUserInformation";
import Cookies from "universal-cookie";

const fromServer = async () => {
  const cookies = require("next/headers").cookies;
  const cookieList = cookies();

  const { value: token } = cookieList.get("token") ?? { value: null };

  const verifyToken = await verifyJwtToken(token);

  if (!verifyToken) {
    return {isLoginned: false,userInformation:{ id:"",email:"",username:"",firstName:"",lastName:"",profilePicture:"",links: [] }};
  }

  const userInformation = await getUserInformation(verifyToken.payload.username);
  
  return {isLoginned: true,userInformation};
};

export const useAuth = async () => {
  const getVerifiedToken = async () => {
    const cookies = new Cookies();

    const token = cookies.get("token") ?? null;

    const verifyToken = await verifyJwtToken(token);

    return verifyToken;
  };

  if (await getVerifiedToken()) {
    return true;
  } else {
    return false;
  }
};

useAuth.fromServer = fromServer;
