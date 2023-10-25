import { client } from "../Database/Db.js";
import { ObjectId } from "mongodb";

// Adding Data To Transactions

export function Transactions(TransData){
    return client
    .db("Money_Manager")
    .collection("Transactions")
    .insertMany(TransData)
 }

// To Get AllTransData

export function GetAllTransData(req){
    return client
    .db("Money_Manager")
    .collection("Transactions")
    .find(req.query)
    .toArray();
 }
//To Edit the transaction Data
export function updatetransactionData(id,updatedTransData){
    return client
    .db("Money_Manager")
    .collection("Transactions")
   .findOneAndUpdate({_id:new ObjectId(id)},{$set:updatedTransData})
}
//  To delete a Specific TransData 

export function deleteTransData(id){
    return client
    .db("Money_Manager")
    .collection("Transactions")
    .deleteOne({_id:new ObjectId(id)}); // Use findOneAndDelete to find and delete the document
}