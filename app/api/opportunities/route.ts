import { desc, eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { auditEvents, opportunities } from "../../../db/schema";

const seed = [
  {company:"Karoo Renewables",sector:"Energy",summary:"Series B capital raise for a 120 MW distributed solar portfolio.",location:"Northern Cape",valueMin:180,valueMax:240,confidence:94,matches:12,status:"Approved" as const,source:"Issuer release · CIPC filing",published:"2026-09-23",owner:"A. Ndlovu"},
  {company:"MobiPay Africa",sector:"Fintech",summary:"Strategic investor sought for cross-border merchant settlement expansion.",location:"Gauteng",valueMin:75,valueMax:110,confidence:88,matches:9,status:"Review" as const,source:"Company newsroom · public tender",published:"2026-09-22",owner:"M. Dlamini"},
  {company:"Ubuntu Fibre",sector:"Infrastructure",summary:"Co-investment opportunity in last-mile fibre across secondary cities.",location:"KwaZulu-Natal",valueMin:310,valueMax:420,confidence:91,matches:7,status:"Approved" as const,source:"Municipal notice · issuer briefing",published:"2026-09-21",owner:"L. Molefe"},
  {company:"Cape Health Systems",sector:"Healthcare",summary:"Acquisition financing for a regional diagnostics network.",location:"Western Cape",valueMin:140,valueMax:190,confidence:76,matches:5,status:"Hold" as const,source:"Competition filing",published:"2026-09-20",owner:"K. Jacobs"},
  {company:"AgriLoop Logistics",sector:"Logistics",summary:"Working-capital facility for temperature-controlled export corridors.",location:"Limpopo",valueMin:55,valueMax:80,confidence:84,matches:8,status:"Review" as const,source:"Public procurement portal",published:"2026-09-19",owner:"P. Mokoena"},
];
function cleanText(value: unknown, max = 500) { return typeof value === "string" ? value.trim().slice(0, max) : ""; }
export async function GET() {
  try {
    const db=getDb(); let rows=await db.select().from(opportunities).orderBy(desc(opportunities.updatedAt),desc(opportunities.id));
    if(!rows.length){await db.insert(opportunities).values(seed);rows=await db.select().from(opportunities).orderBy(desc(opportunities.updatedAt),desc(opportunities.id));}
    const audit=await db.select().from(auditEvents).orderBy(desc(auditEvents.createdAt)).limit(20);
    return Response.json({opportunities:rows,audit});
  } catch(error){return Response.json({error:error instanceof Error?error.message:"Storage unavailable"},{status:500});}
}
export async function POST(request:Request){
  try{
    const b=await request.json() as Record<string,unknown>;const company=cleanText(b.company,120),summary=cleanText(b.summary,600);
    if(!company||!summary)return Response.json({error:"Company and summary are required."},{status:400});
    const db=getDb();const[item]=await db.insert(opportunities).values({company,summary,sector:cleanText(b.sector,80)||"Other",location:cleanText(b.location,120)||"Regional",valueMin:Math.max(0,Number(b.valueMin)||0),valueMax:Math.max(0,Number(b.valueMax)||0),confidence:Math.min(100,Math.max(0,Number(b.confidence)||50)),matches:Math.max(0,Number(b.matches)||0),status:"Review",source:cleanText(b.source,200)||"Manual analyst intake",published:cleanText(b.published,20)||new Date().toISOString().slice(0,10),owner:cleanText(b.owner,100)||"Unassigned"}).returning();
    await db.insert(auditEvents).values({opportunityId:item.id,action:"CREATED",actor:item.owner,detail:"Opportunity submitted for review"});
    return Response.json({opportunity:item},{status:201});
  }catch(error){return Response.json({error:error instanceof Error?error.message:"Unable to create record"},{status:500});}
}
export async function PATCH(request:Request){
  try{
    const b=await request.json() as{id?:number;status?:"Approved"|"Review"|"Hold";actor?:string;detail?:string};
    if(!b.id||!["Approved","Review","Hold"].includes(b.status||""))return Response.json({error:"Valid id and status are required."},{status:400});
    const db=getDb();const[item]=await db.update(opportunities).set({status:b.status!,updatedAt:new Date().toISOString()}).where(eq(opportunities.id,b.id)).returning();
    if(!item)return Response.json({error:"Opportunity not found."},{status:404});
    await db.insert(auditEvents).values({opportunityId:item.id,action:`STATUS_${b.status!.toUpperCase()}`,actor:cleanText(b.actor,100)||"Compliance reviewer",detail:cleanText(b.detail,300)});
    return Response.json({opportunity:item});
  }catch(error){return Response.json({error:error instanceof Error?error.message:"Unable to update record"},{status:500});}
}
