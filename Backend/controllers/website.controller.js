
 import { generateResponce } from '../config/openRouter.js'
import User from '../models/user.model.js';
import Website from '../models/website.model.js';
import { exstractJson } from '../utils/extractJson.js';
 
 
 const masterPrompt = `
YOU ARE A PRINCIPAL FRONTEND ARCHITECT
AND A SENIOR UI/UX ENGINEER
SPECIALIZED IN RESPONSIVE DESIGN SYSTEMS.

YOU BUILD HIGH-END, REAL-WORLD, PRODUCTION-GRADE WEBSITES
USING ONLY HTML, CSS, AND JAVASCRIPT
THAT WORK PERFECTLY ON ALL SCREEN SIZES.

THE OUTPUT MUST BE CLIENT-DELIVERABLE WITHOUT ANY MODIFICATION.

❌ NO FRAMEWORKS
❌ NO LIBRARIES
❌ NO BASIC SITES
❌ NO PLACEHOLDERS
❌ NO NON-RESPONSIVE LAYOUTS

--------------------------------------------------
USER REQUIREMENT:
{USER_PROMPT}
--------------------------------------------------

GLOBAL QUALITY BAR (NON-NEGOTIABLE)
--------------------------------------------------
- Premium, modern UI (2026–2027)
- Professional typography & spacing
- Clean visual hierarchy
- Business-ready content (NO lorem ipsum)
- Smooth transitions & hover effects
- SPA-style multi-page experience
- Production-ready, readable code

--------------------------------------------------
RESPONSIVE DESIGN (ABSOLUTE REQUIREMENT)
--------------------------------------------------
THIS WEBSITE MUST BE FULLY RESPONSIVE.

YOU MUST IMPLEMENT:

✔ Mobile-first CSS approach
✔ Responsive layout for:
  - Mobile (<768px)
  - Tablet (768px–1024px)
  - Desktop (>1024px)

✔ Use:
  - CSS Grid / Flexbox
  - Relative units (%, rem, vw)
  - Media queries

✔ REQUIRED RESPONSIVE BEHAVIOR:
  - Navbar collapses / stacks on mobile
  - Sections stack vertically on mobile
  - Multi-column layouts become single-column on small screens
  - Images scale proportionally
  - Text remains readable on all devices
  - No horizontal scrolling on mobile
  - Touch-friendly buttons on mobile

IF THE WEBSITE IS NOT RESPONSIVE → RESPONSE IS INVALID.

--------------------------------------------------
IMAGES (MANDATORY & RESPONSIVE)
--------------------------------------------------
- Use high-quality images ONLY from:
  https://images.unsplash.com/
- EVERY image URL MUST include:
  ?auto=format&fit=crop&w=1200&q=80

- Images must:
  - Be responsive (max-width: 100%)
  - Resize correctly on mobile
  - Never overflow containers

--------------------------------------------------
TECHNICAL RULES (VERY IMPORTANT)
--------------------------------------------------
- Output ONE single HTML file
- Exactly ONE <style> tag
- Exactly ONE <script> tag
- NO external CSS / JS / fonts
- Use system fonts only
- iframe srcdoc compatible
- SPA-style navigation using JavaScript
- No page reloads
- No dead UI
- No broken buttons
--------------------------------------------------
SPA VISIBILITY RULE (MANDATORY)
--------------------------------------------------
- Pages MUST NOT be hidden permanently
- If .page { display: none } is used,
  then .page.active { display: block } is REQUIRED
- At least ONE page MUST be visible on initial load
- Hiding all content is INVALID


--------------------------------------------------
REQUIRED SPA PAGES
--------------------------------------------------
- Home
- About
- Services / Features
- Contact

--------------------------------------------------
FUNCTIONAL REQUIREMENTS
--------------------------------------------------
- Navigation must switch pages using JS
- Active nav state must update
- Forms must have JS validation
- Buttons must show hover + active states
- Smooth section/page transitions

--------------------------------------------------
FINAL SELF-CHECK (MANDATORY)
--------------------------------------------------
BEFORE RESPONDING, ENSURE:

1. Layout works on mobile, tablet, desktop
2. No horizontal scroll on mobile
3. All images are responsive
4. All sections adapt properly
5. Media queries are present and used
6. Navigation works on all screen sizes
7. At least ONE page is visible without user interaction

IF ANY CHECK FAILS → RESPONSE IS INVALID

--------------------------------------------------
OUTPUT FORMAT (RAW JSON ONLY)
--------------------------------------------------
{
  "message": "Short professional confirmation sentence",
  "code": "<FULL VALID HTML DOCUMENT>"
}

--------------------------------------------------
ABSOLUTE RULES
--------------------------------------------------
- RETURN RAW JSON ONLY
- NO markdown
- NO explanations
- NO extra text
- FORMAT MUST MATCH EXACTLY
- IF FORMAT IS BROKEN → RESPONSE IS INVALID
`;




// export const generateWebsite = async (req, res) => {

//     try {

//         const { prompt } = req.body;
//         if(!prompt){
//             return res.status(400).json({message: "prompt is required"})
//         }

//         const user = await User.findById(req.user._id);
//         if(!user){
//             return res.status(400).json({message: "User not found"});
//         } 

//         if(user.credits < 50){
//            return res.status(400).json({message: "Insufficient Credit!!!"});
//         }
        
//         const finalPropmt = masterPrompt.replace("{USER_PROMPT}",prompt);

//         //here the responce comes in raw version with lots of message from the openRoute ....choice[0].message.content;
//         let rawData = ""; 
//         let parseData = null;
        
//         //if the data won't come out i user's need we nee to use the for loop in order to call the json it repeatedly until the precise result come..
//         for (let i = 0; i < 2 && !parseData; i++) {
//            rawData =  await generateResponce(finalPropmt);
//            parseData = await exstractJson(rawData);
            
//            if(!parseData){
//              rawData =  await generateResponce(finalPropmt + "\n\nRETURN ONLY RAW JSON.");
//               parseData = await exstractJson(rawData);
//            }
//            console.log(rawData);
//            console.log(parseData);
           
//         }
        

//         if(!parseData || !parseData.code){
//             console.log("ai returned invalid responce");
//             return res.status(400).json({message: "ai returned invalid responce"});
//         }

//         const createWebsite = await Website.create({
//             user: user._id,
//             title: prompt.slice(0,60),
//           latestCode: parseData.code,
//           slug: (() => {
//             const text = prompt.slice(0,60) || 'untitled';
//             const base = text.toString().toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
//             const suffix = Math.random().toString(36).slice(2,8);
//             return `${base}-${suffix}`;
//           })(),
//             conversation: [
//                 {
//                     role: "ai",
//                     content: parseData.message
//                 },
//                 {
//                     role: "user",
//                     content: prompt
//                 }
//             ],
//         })

//         user.credits -= 50;
//         await user.save();

//         return res.status(201).json({
//             websiteId: createWebsite._id,
//             leftOverCredits: user.credits
//         })


//     } catch (error) {
//          return res.status(500).json({message: `generate website error ${error}`});
//     }
// }

export const generateWebsite = async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ message: "prompt is required" });
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (user.credits < 50) {
            return res.status(400).json({ message: "Insufficient Credit!!!" });
        }

        const finalPrompt = masterPrompt.replace("{USER_PROMPT}", prompt);

        let parseData = null;

        // Try up to 3 times to get valid JSON back
        for (let i = 0; i < 3; i++) {
            const retryPrompt = i === 0
                ? finalPrompt
                : finalPrompt + "\n\nCRITICAL: Return ONLY raw JSON. No markdown. No explanation. Just the JSON object.";

            const rawData = await generateResponce(retryPrompt);
            console.log(`Attempt ${i + 1} raw:`, rawData?.slice(0, 200));//test

            parseData = await exstractJson(rawData);

            if (parseData?.code) break; 
        }

        if (!parseData || !parseData.code) {
            console.error("AI returned invalid response after retries");
            return res.status(500).json({ message: "AI returned invalid response. Please try again." });
        }

        const slug = (() => {
            const base = prompt.slice(0, 60)
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '');
            const suffix = Math.random().toString(36).slice(2, 8);
            return `${base}-${suffix}`;
        })();

        const createWebsite = await Website.create({
            user: user._id,
            title: prompt.slice(0, 60),
            latestCode: parseData.code,
            slug,
            conversation: [
                { role: "user", content: prompt },
                { role: "ai", content: parseData.message || "Website generated successfully." },
            ],
        });

        user.credits -= 50;
        await user.save();

        return res.status(201).json({
            websiteId: createWebsite._id,
            leftOverCredits: user.credits,
        });

    } catch (error) {
        console.error("generateWebsite error:", error); // ✅ log full error server-side
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
};

export const getUserWebsiteById = async (req, res) => {
    
    try {
        const website = await Website.findOne({
            _id: req.params.id,
            user: req.user._id
        })

        if(!website){
            return res.status(400).json({message: "website not foound"});
        }

        return res.status(200).json(website);        
    } catch (error) {
        return res.status(500).json({message: `get website by id ${error}`});
    }
}

export const changes = async (req, res) => {


    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ message: "prompt is required" });
        }

        const websiteId = req.params.id;
        const website = await Website.findOne({
            _id: req.params.id,
            user: req.user._id
        })

        if(!website){
            return res.status(400).json({message: "website not foound"});
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (user.credits < 25) {
            return res.status(400).json({ message: "Insufficient Credit!!!" });
        }

        const updatePrompt = `
        UPDATE THIS HTML WEBSITE.
        
        CURRENT CODE:
        ${website.latestCode}

        USER REQUEST:
        ${prompt}
        
        RETURN RAW JSON ONLY:
        {
            "message": "Short comfirmation message",
            "code": "<UPDATED FULL HTML CODE>"
        }
        `;

         let parseData = null;

        // Try up to 3 times to get valid JSON back
        for (let i = 0; i < 3; i++) {
            const retryPrompt = i === 0
                ? updatePrompt
                : updatePrompt + "\n\nCRITICAL: Return ONLY raw JSON. No markdown. No explanation. Just the JSON object.";

            const rawData = await generateResponce(retryPrompt);

            parseData = await exstractJson(rawData);

            if (parseData?.code) break; 
        }

        if (!parseData || !parseData.code) {
            console.error("AI returned invalid response after retries");
            return res.status(500).json({ message: "AI returned invalid response. Please try again." });
        }


        website.conversation.push(
            {role: "user", content: prompt},        
            {role: "ai", content: parseData.message || "Website updated successfully."},

        )
       
        website.latestCode = parseData.code;
        await website.save();




        user.credits -= 25;
        await user.save();

        return res.status(200).json({
            message: parseData.message,
            code: parseData.code,
            leftOverCredits: user.credits,
        });

    } catch (error) {
        return res.status(500).json({ message: error.message || "Internal update server error" });
    }
}



export const getAllWebsites = async (req, res) => {
    try {
        const allWebsites =await Website.find({user: req.user._id})
        return res.status(200).json(allWebsites);
    } catch (error) {
        return res.status(500).json({ message: error.message || "get all website Internal server error" });
    }
}