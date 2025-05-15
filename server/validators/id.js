import { Types } from "mongoose";

const validateObjectId = async (req, res, next) => {
  const { ObjectId } = Types;

  if (req.query.id) {
    if (!ObjectId.isValid(req.query.id)) {
      return res.status(400).send({ message: "Invalid ObjectId" });
    }
  }
  if (req.query._id) {
    if (!ObjectId.isValid(req.query._id)) {
      return res.status(400).send({ message: "Invalid ObjectId" });
    }
  }
  next();
};

export default validateObjectId;
