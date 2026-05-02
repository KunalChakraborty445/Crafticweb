// import { generateResponce } from "../config/openRouter.js"
// import { exstractJson } from "../utils/extractJson.js"

export const getCurrentUser = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ user: null })
        }

        return res.status(200).json({ user: req.user })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}



//test run
// export const generateDemo = async (req, res) => {
//     try {
//        const result = await generateResponce("hello dev");
//        const data = await exstractJson(result)
//        return res.status(200).json(data);
//     } catch (error) {
//         return res.status(500).json({error});
//     }
// }//mainly creaed to fetch the raw responce from the model API