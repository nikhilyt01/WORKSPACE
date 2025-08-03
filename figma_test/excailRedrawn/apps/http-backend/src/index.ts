import express, { text } from "express";
import { Request,response } from "express";
import {CreateUserSchema,SigninSchema,CreateRoomSchema} from "@repo/common/types";
import jwt from "jsonwebtoken";;
import {JWT_SECRET} from "@repo/back-common/config";
import bcrypt from "bcrypt";
import {prismaClient} from "@repo/db/client"
import { middleware } from "./middleware";
import cors from "cors";
import dotenv from "dotenv"
import { GoogleGenAI, Modality } from "@google/genai";
// import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const app = express();
app.use(cors());
app.use(express.json());

declare global{
    namespace Express{
        interface Request{
            userId ?:string
        }
    }
}

app.post("/signup",async(req,res)=>{
    const ParsedData = CreateUserSchema.safeParse(req.body);
    if(!ParsedData.success){
        res.status(401).json({
            message:"Incorrect Inputs!"
        });
        return;
    } 

    try{
        const hashedpass= await bcrypt.hash(ParsedData.data.password,10)
        const user =await prismaClient.user.create({
            data:{
                email:ParsedData.data.username,
                password:hashedpass,
                name:ParsedData.data.name
            }
        })
        res.status(200).json({message:"Signup Success",UserId:user.id})

    }catch(e){
          res.status(401).json({message:"Username Already exists !"})
    }
    

})
app.post("/signin",async(req,res)=>{
     const ParsedData = SigninSchema.safeParse(req.body);

     if(!ParsedData.success){
        res.status(401).json({
            message:"Incorrect Inputs !",
            error:ParsedData.error.errors
        });
        return;
     }
try{
     const user = await prismaClient.user.findFirst({
         where:{ email:ParsedData.data.username}
     })
     if(!user){
        res.status(401).json({
            message:"Signup First ",
        });
        return;
     }

     const PassMatch = await bcrypt.compare(ParsedData.data.password,user.password!);
     if(!PassMatch){
        res.status(404).json({message:"Wrong Credential !"})
     }
     const token = jwt.sign({
        userId:user?.id
     },JWT_SECRET,{expiresIn:"7h"})

     res.status(200).json({
        message:"Signin Success !",
        token:token
    })
}catch{
    res.status(404).json({message:"some internal error occured either in DB or something"})
}

})
//creation of room endpoint 
app.post("/room",middleware,async(req,res)=>{
    const data = CreateRoomSchema.safeParse(req.body);
    if(!data.success){
        res.status(401).json({message:"Incorrecr Inputs!"})
        return;
    }

   const userId=req.userId
   if(!userId){
    return;
   }
try{
  const room= await prismaClient.room.create({
    data:{
        slug:data.data.name,
        adminId:userId
    }
   })
   res.status(200).json({
        message:"Room Created !",
        room:room
   })
}catch{
   res.status(400).json({message:"Room with This name already Exists"})
}
})

app.delete("/room/:id",middleware,async(req,res)=>{
    const id = Number(req.params.id) ;
    const userId=req.userId;

    try{
        const room = await prismaClient.room.findUnique({
            where:{id:id}
        })
        if(!room){
            res.status(401).json({message:"Room does not exists !"});
            return;
        }
        if(room.adminId != userId){   // agar admin nhi h wo room ka
            res.status(401).json({message:"UnAuthorized To delete"})
        }

        await prismaClient.room.delete({
            where:{id:id,adminId:userId}
        })

        res.status(200).json({message:"Room Deletion Success !"})
    }catch{
        res.status(500).json({message:"Failed To delete Room,Internal server error"})
    }
})
// to get all available room of User
app.get("/user",middleware,async(req,res)=>{
    const userId = req.userId;

    try{
        const room = await prismaClient.room.findMany({
            // where:{adminId:userId},  we want user to see all room available
             orderBy:{
               createdat:"desc"
          }
        })
        if(!room){
            res.status(401).json({message:"No Room Found !"})
        }
        res.status(200).json({room:room})

    }catch{
        res.status(500).json({message:"Internal Error"})
    }

})

app.get("/chat/:roomId",async(req,res)=>{
    const roomId= Number(req.params.roomId)
    const userId=req.userId;

    try{
        const message= await prismaClient.chat.findMany({
            where:{
                roomId:roomId
            },
            orderBy:{
                id:"desc"
            },
            take:400
        })
        res.json({message})
    }catch{
        res.json({message:[]})
    }
})
app.get("/room/:slug",async (req,res)=>{
     const slug=req.params.slug;
     const room=await prismaClient.room.findFirst({
          where:{
               slug
          }
     })
     res.json({
          room
     })
})

app.get("/rooms/:id",middleware, async (req, res) => {     //  this was not working probaably due to prisma schema 
     const id = Number(req.params.id);
     const userId=req.userId;
   
     try {
       const roomexists = await prismaClient.room.findUnique({
         where: { id }, //,adminId:userId bcoz only the creator was able to join room earlier but it should be open for all
       });
   
       if (!roomexists) {
        // console.log("No room found with ID", id);
       } else {
        // console.log("Room found:", roomexists);
       }
   
       res.status(200).json({ room: roomexists });  // it will either return room:null ya fir room:details  we require null also
     } catch (e) {
       console.error("Error validating room", e);
       res.status(500).json({ message: "Failed to validate room" });
     }
   });
//end point to delete all chats or shapes of Room
   app.delete("/delchats/:roomId",middleware,async(req,res)=>{
     const roomId=Number(req.params.roomId);
     const userId=req.userId;

     try{
         const clear= await prismaClient.chat.deleteMany({
          where:{
               roomId
             //  userId   bcoz room me koi bhi user ho pura del krske middleware is just for authetication 
          }
         })
         res.json({message:"Cleared all "})
     }catch{
           res.status(400).json({message:"failed to clear"})
     }
})

const genAI = new GoogleGenAI({apiKey: GEMINI_API_KEY});
app.post("/improveDrawing", async (req,res) =>{
    console.log("aiendpoint called1")
    const {imageData,prompt}=req.body
    if (!imageData || !prompt) {
     res.status(400).json({ error: 'Missing imageData or prompt' });
     return;
  }
  

  try {
    
    const contents = [
  {
    inlineData: {
      mimeType: "image/jpeg",
      data: imageData.split(',')[1]
    },
  },
  { text: prompt },
];

    const response = await genAI.models.generateContent({
    model: "gemini-2.0-flash-preview-image-generation",
    contents: contents,
    config: {
      responseModalities: [Modality.TEXT, Modality.IMAGE],
    },
  });
    console.log(response)
    const parts = response.candidates?.[0]?.content?.parts;
    console.log(response.candidates?.[0]?.content)
    // Assuming the AI returns an image directly in the response
    const improvedImagePart = parts?.find(part => 'inlineData' in part);
    // console.log(improvedImagePart)
    if (improvedImagePart && 'inlineData' in improvedImagePart) {
      res.json({ improvedImage: `data:${improvedImagePart?.inlineData?.mimeType};base64,${improvedImagePart?.inlineData?.data}` });
    } else {
      // If AI doesn't return an image, it might return text describing the improvement
      const textPart = parts?.find(part => 'text' in part && typeof part.text === 'string');
       res.status(200).json({ message:  "AI completed, but no image returned. Try a different prompt." });
    }
  } catch (error) {
    //console.error('Error improving drawing:', error);
    res.status(500).json({ error: 'Failed to improve drawing with AI. or please check ur imageData properly' });
  }
})


app.post("/solveExpression",async(req , res)=>{
   const prompt =
    'f"You have been given an image that contains various mathematical, graphical, abstract problems, or event descriptions. Your task is to analyze the image and either solve, interpret, or provide recommendations based on its content. The image will clearly fall into exactly one of the following categories, each with specific handling requirements:\\n\\n' +
    "1. Simple Mathematical Expression:\\n" +
    "   - Examples: 2 + 2, 3 * 4, 5 / 6, 7 - 8, etc.\\n" +
    "   - Solve the expression using the PEMDAS rule (i.e., Parentheses, Exponents, Multiplication/Division left-to-right, Addition/Subtraction left-to-right).\\n" +
    "   - Return your answer as a list containing a single dictionary formatted as: [{'expr': <original expression>, 'result': <calculated answer>}].\\n\\n" +
    "2. Set of Equations:\\n" +
    "   - Examples: x^2 + 2x + 1 = 0, 3y + 4x = 0, 5x^2 + 6y + 7 = 12, etc.\\n" +
    "   - Solve for all variables present. For each variable, return a dictionary formatted as: {'expr': '<variable>', 'result': <calculated value>, 'assign': True}.\\n" +
    "   - Return the results as a comma-separated list of dictionaries.\\n\\n" +
    "3. Variable Assignment:\\n" +
    "   - Examples: x = 4, y = 5, z = 6, etc.\\n" +
    "   - Directly assign the provided values to their respective variables.\\n" +
    "   - Return the assignments as a list of dictionaries (each with 'assign': True), e.g., [{'expr': 'x', 'result': 4, 'assign': True}].\\n\\n" +
    "4. Graphical Math Problems:\\n" +
    "   - These include word problems depicted as drawings (e.g., collisions, trigonometric setups, Pythagorean problems, or sports scenarios).\\n" +
    "   - Pay close attention to visual details, including color coding and annotations.\\n" +
    "   - Return your answer as a list containing a single dictionary formatted as: [{'expr': <description>, 'result': <calculated answer>}].\\n\\n" +
    "5. Abstract Concept Interpretation with Interactive Suggestions:\\n" +
    "   - This category combines abstract concept interpretation with interactive suggestions. It covers images representing abstract ideas (e.g., love, hate, jealousy, patriotism), historical references, or additional interactive drawings that imply further actions.\\n" +
    "   - Analyze the drawing and provide a clear explanation of the underlying concept.\\n" +
    "   - Additionally, if the image suggests further actions or interactive elements, include actionable suggestions or next steps.\\n" +
    "   - Format your answer as a list containing a single dictionary, e.g., [{'expr': <explanation>, 'result': <abstract concept>, 'suggestion': <next steps>}] (the 'suggestion' key is optional if not applicable).\\n\\n" +
    "6. Complex Systems of Equations and Advanced Mathematical Problems:\\n" +
    "   - This category includes systems with multiple variables, complex functions (trigonometric, logarithmic, exponential), and expressions requiring symbolic manipulation.\\n" +
    "   - Solve the system or expression, including intermediate computation steps where necessary. For unique solutions, return each variable’s result as in category 2. For systems with multiple or infinite solutions, provide a parameterized solution or include an 'error' key with an explanation.\\n" +
    "   - For advanced expressions, include a 'steps' key that lists intermediate computation steps.\\n" +
    "   - Format the answer as a list of dictionaries, e.g., [{'expr': <original expression>, 'result': <calculated answer>, 'steps': [<step1>, <step2>, ...]}].\\n\\n" +
    "7. Multi-Part or Ambiguous Problems:\\n" +
    "   - If the image contains multiple distinct problems spanning different categories, separate each problem's response clearly.\\n" +
    "   - For each distinct problem, include a key indicating the problem type and return the answer in the appropriate format as defined above.\\n" +
    "   - If any problem is ambiguous or incomplete, return a dictionary with an 'error' key and a detailed message explaining the ambiguity.\\n\\n" +
    "8. Event or Abstract Scenario Analysis with Next Steps:\\n" +
    "   - If the image depicts a specific event or abstract scenario (e.g., an event description, social gathering, protest, or any scene conveying a situation), analyze and interpret the event.\\n" +
    "   - Provide a clear explanation of the event or scenario, and include actionable suggestions or next steps.\\n" +
    "   - Format your answer as a list containing a single dictionary with keys: 'expr' for your interpretation, 'result' for the summary or abstract concept, and 'suggestion' for your recommended next steps.\\n\\n" +
    "RULES :\\n" +
    "   - Use extra backslashes for escape characters (e.g., \\f becomes \\\\f and \\n becomes \\\\n).\\n" +
    "   - Do NOT include any double quotes inside the string values. If the image content contains double quotes, either remove them or replace them with single quotes.\\n\\n" +
    "   - DO NOT USE BACKTICKS OR MARKDOWN FORMATTING in your output.\\n" +
    "   - Replace any variables in the expression with their actual values from the provided dictionary: ${dict_of_vars_str}.\\n" +
    "   - Ensure all keys and values in your returned dictionaries are properly quoted to facilitate parsing with Python's ast.literal_eval.\\n\\n" +
    'Analyze the image content thoroughly and return your answer following these rules, including detailed intermediate steps, robust error handling, and actionable suggestions or next steps when applicable."';
    const {imageData} = req.body;
    const contents = 
    {
    inlineData: {
      mimeType: "image/jpeg",
      data: imageData.split(',')[1]
    }
   }
   
   
    try{
        const response = await genAI.models.generateContent({
            model: "gemini-2.0-flash",   //preview-image-generation
             config: {
              systemInstruction: prompt,
            },
            contents: contents,
           
        })
        const result :string =(await response).text as string ;
        console.log(result);

        // Clean up the response by removing markdown formatting and normalizing quotes
    const cleanedResponse = result
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .replace(/'/g, '"')
      .replace(/\bTrue\b/g, "true")
      .replace(/\bFalse\b/g, "false")
      .replace(
        /:\s*"([^"]*?)"(?=\s*[},])/g,
        (match, p1) => `: "${p1.replace(/"/g, '\\"')}"`
      ); // Escape quotes inside values

      let ans :Object=[];
        try{
           ans= JSON.parse(cleanedResponse);
        }catch{
          console.log(" cannot parse  ")
        }
        res.status(200).json({solveResult:ans})
    }catch(error){
        console.log(error);

        res.status(500).json({ error: " Error while solving" });

    }

})

app.listen(3001);
