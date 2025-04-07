import {neon} from '@neondatabase/serverless';

{/*

    API Routes are server-side functions that allow you to handle backend logic directly within your Expo project. These routes are defined in your app directory using files with the +api.ts extension.
       
*/}
export async function POST(request:Request){
try{
    const sql = neon(`${process.env.DATABASE_URL}`);
const {name,email,clerkId}=await request.json();
if(!name || !email || !clerkId){
    Response.json({
        error:"Missing required fields",
        init:{status:400}
    })
}
const response = await sql`
INSERT INTO users (
  name, 
  email, 
  clerk_id
) 
VALUES (
  ${name}, 
  ${email},
  ${clerkId}
);`;

    return new Response(JSON.stringify({data:response}), {status:201})


    }
    catch(error){
        console.log(error);
        return new Response(JSON.stringify({error:error}),{status:500})

    }

}
