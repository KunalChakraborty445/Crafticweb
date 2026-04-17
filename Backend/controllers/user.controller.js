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