

// export const exstractJson = async (rawText) => {
//     if(!rawText) return;


//     //cleaning the rawData using this function
//     const cleanedData = rawText
//             .replace(/```json/gi, "")
//             .replace(/```/g, "")
//             .trim();

//         const removeOpenCurlibrace = cleanedData.indexOf('{');
//         const removeCloseCurlibrace = cleanedData.lastIndexOf('}');

//         if(removeOpenCurlibrace === -1 || removeCloseCurlibrace === -1) return null;

//         //we have to configure that the model calcute the data between open and close braces and go till close braces
//         //  and add 1 more character inorder to restrcit from any misiing character
//         const jsonString = cleanedData.slice(removeOpenCurlibrace, removeCloseCurlibrace + 1);

//         return JSON.parse(jsonString);



// }

export const exstractJson = async (rawText) => {
    if (!rawText) return null;

    const cleanedData = rawText
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

    const start = cleanedData.indexOf('{');
    const end = cleanedData.lastIndexOf('}');

    if (start === -1 || end === -1) return null;

    try {
        return JSON.parse(cleanedData.slice(start, end + 1));
    } catch (e) {
        console.error("JSON parse failed:", e.message);
        return null;
    }
}