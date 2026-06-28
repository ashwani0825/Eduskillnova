import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
apiKey: process.env.OPENAI_API_KEY
});

app.post("/api/chat", async (req,res)=>{
const {message}=req.body;

const response = await openai.chat.completions.create({
model:"gpt-4o-mini",
messages:[
{role:"system",content:"You are CS Executive tutor"},
{role:"user",content:message}
]
});

res.json({answer:response.choices[0].message.content});
});

app.listen(5000,()=>console.log("Server running"));
