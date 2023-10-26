import express from "express";
import {
  generateNewTransData,
  AllTranData,
  getSpecificUserTransData,
  getSpecificUserTransDataForSpecificCategory,
  deleteTranData,
  updateTransactionsData,
} from "../Transaction/Trans_URL.js";
//initalize the router
const router = express.Router();
// To add new transData
router.post("/", generateNewTransData);
// To get all TransData
router.get("/allTransData", AllTranData);
// To get transData For specific User
router.get("/specificUser/:id", getSpecificUserTransData);
// To Get TransData For Specific User for Specific Category
router.post(
  "/categoryForSpecificUser/:id",
  getSpecificUserTransDataForSpecificCategory
);
// To Edit Tansaction data
router.put("/edit/:id", updateTransactionsData);

// to delete a Specidic Trans data
router.delete("/deleteTransData/:id", deleteTranData);

export const TransdataRouter = router;
