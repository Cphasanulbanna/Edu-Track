
export const signup = async (req, res) => {
    const {first_name,last_name, email, mobile_number, passsword} = req.body
    try {
        
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}