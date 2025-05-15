export const verifyFields = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const regex = {
      email: /((\w)+.?)+@\w{1,}\.\w{2,}/gi,
      name: /.[^!|@|#|$|%|^|&|*|(|)|_|-|=|+|<|>|/|\\|'|"|:|;|[|]|\{|\}]{2,}/gi,
    };
    if (name) {
      if (!regex.name.test(name)) {
        return res.status(400).json({ message: "اسم غير صحيح." });
      }
    }
    if (email) {
      if (!regex.email.test(email)) {
        return res.status(400).json({ message: "البريد الإلكتروني غير صحيح." });
      }
    }
    if (password) {
      if (!(password.length >= 8 && password.length <= 50)) {
        return res.status(400).json({ message: "كلمة المرور غير صحيحة." });
      }
    }

    next();
  } catch {
    return res
      .status(500)
      .json({ message: "An error occurred. Plaese try again later." });
  }
};
