import {
  Transactions,
  GetAllTransData,
  updatetransactionData,
  deleteTransData
} from "../Controllers/Controllers-Transdata.js";

// To Generate TransData

async function generateNewTransData(req, res) {
  const { type, date, category, account, amount, userid } = req.body;

  // Checking if all fields are filled in the form
  //  if(!body) return res.status(400).json({ error: "TransData is required" });
  try {
    await Transactions([
      {
        type: type,
        date: date,
        category: category,
        account: account,
        amount: amount,
        userid:userid,
      },
    ]);
    return res
      .status(200)
      .json({
        type: type,
        message: "TransData create successfull",
        statusCode: 200,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", statusCode: 500 });
  }
}

// To Get All The Transdata
async function AllTranData(req, res) {
  try {
    const transData = await GetAllTransData(req);
    if (transData.length <= 0) {
      res.status(400).json({ data: "TransData Not Found" });
      return;
    }
    res.status(200).json({ transData });
  } catch (error) {
    console.log(error);
    res.send(500).json({ data: "Internal Server Error" });
  }
}

// To get TransData For Specific User
async function getSpecificUserTransData(req, res) {
  var alltransdata = await GetAllTransData(req);
  try {
    if (alltransdata > 0) {
      res.status(400).json({ data: "No Data found" });
    } else {
      const TransactionsData = alltransdata.filter(
        (item) => item.userid == req.params.id
      );
    //   console.log(TransactionsData);
      res.json({
        message: "Transaction Data send successfull",
        statusCode: 200,
        TransactionsData: TransactionsData.reverse(),
      });
    }
  } catch (error) {
    res.json({
      message: "Internal server error ",
      statusCode: 500,
    });
  }
}
// To get TransData For Specific User for sepecific category
async function getSpecificUserTransDataForSpecificCategory(req, res) {
  var alltransdata = await GetAllTransData(req);
  try {
    if (alltransdata > 0) {
      res.status(400).json({ data: "No Data found" });
    } else {
      const TransactionsData = alltransdata.filter(
        (item) => item.userid == req.params.id && item.type == req.body.type
      );
    //   console.log(TransactionsData);
    if(TransactionsData.length>0){
      res.json({
        message: "Transaction Data send successfull",
        statusCode: 200,
        TransactionsData: TransactionsData.reverse(),
      });
    }else{
        res.json({
            message: "Transaction Data send successfull",
            statusCode: 200,
            TransactionsData: "No Transaction Data Found",
          });
    }
    }
  } catch (error) {
    res.json({
      message: "Internal server error ",
      statusCode: 500,
    });
  }
}
// To Edit A Transaction Data
async function updateTransactionsData(req,res){
    try{
        const {id}=req.params;
        const updateTransData=req.body;
        if(!id || !updateTransData){
            return res.status(400).json({data:"Wrong Request"})
        }
          const result=await updatetransactionData(id,updateTransData);
           res.status(200).json({data:{result:result,message:"Updated Sucessfully",statusCode: 200}})
      } catch (error) {
        console.log(error)
        res.status(500).json({data:"Internal Server Error"})
      }
    }
// To Delete A Specific Trans Data
async function deleteTranData(req,res){
  try{
    const id=req.params.id;
    if(!id){
        return res.status(400).json({ data: "Wrong Request" });
    } else {
      const result = await deleteTransData(id);
      console.log(result);
      res
        .status(200)
        .json({ data: { result: result,statusCode:200,
          message:"Transactions Data  deleted successfully" } });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: "Internal Server Error", message:'Internal server error',
    statusCode:500, });
  }
}
export {
  generateNewTransData,
  AllTranData,
  getSpecificUserTransData,
  getSpecificUserTransDataForSpecificCategory,
  updateTransactionsData
  ,deleteTranData
};
