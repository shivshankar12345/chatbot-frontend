import axios from "axios";
import { baseURL } from "../config/config";

export const getInitialChatMessages = async () => {
  const sessionId = localStorage.getItem("sessionId");

  const response = await axios.post(`${baseURL}/api/chat/start`, {
    business: "",
    sessionId: sessionId ? sessionId : "",
  });

  return response;
};

export const getReply = async (sessionId: string, message: string) => {
  const response = await axios.post(`${baseURL}/api/chat/reply`, {
    sessionId: sessionId,
    reply: message,
  });

  return response;
};

export const addBotConfiguration = async (data: any) => {
  const response = await axios.post(`${baseURL}/api/bot/config`, {
    business: data[0].name,
    conversationTree: data[0].conversationTree,
  });

  return response;
};

//Business 1
export const getBotConfiguration = async (business: string = "Business1") => {
  const response = await axios.get(`${baseURL}/api/bot/business/${business}`);

  return response;
};

//Get Initial Businesses

export const getBusinesses = async () => {
  const response = await axios.get(`${baseURL}/api/bot/getBusiness`);

  return response;
};
