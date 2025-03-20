import axios from "axios";
export const verifyCaptcha = async (req, res, next) => {
  const { captcha } = req.body;
  if (!captcha) {
    return res.status(400).json({ message: "Please complete captcha" });
  }
  const secretKey = process.env.GOOGLE_CAPTCHA_SECRET_KEY;
  try {
    const responseData = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}`,
    );
    console.log({responseData});
    
    if (responseData.data.success) {
      next();
    } else {
      return res.status(400).json({ message: "CAPTCHA verification failed" });
    }
  } catch (error) {
    console.log({error});
    
    return res.status(500).json({ message: "CAPTCHA verification error" });
  }
};
