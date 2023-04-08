import mongoose from "mongoose";
import LeaveBalance from "../models/LeaveBalance.js";
import LeaveType from "../models/leaveType.js";
import leaveTypesMap from "../constants/leaveTypes.js";
// import LeaveType from "../models/leaveType.js"

// this function will be a part of cron job action.
const updateLeaveBalance = async (req, res) =>{
    const responseData = {
        status: 0,
        data: null,
        message: ""
    }
    try{
        /**
         * If today is 1st of a month then only proceed else leave it ?
         */
        const { isNewYear } = req.body;
        var leaveBalances = null;
        if(!isNewYear)
        {
            leaveBalances = await LeaveBalance.aggregate( 
                [
                    {
                        $lookup:{
                            from: "leavetypes",
                            localField: "leaveType",
                            foreignField: "_id",
                            as : "leaveTypeData",
                            pipeline:[
                               {
                                $match: { "leaveType": {$eq: leaveTypesMap.Annual} },
                               }
                            ]
                        }   
                    },
                    {
                        $match: {
                            $and : [
                                {"leaveTypeData.leaveType" : leaveTypesMap.Annual},
                                {"leaveBalanceUpdatedForMonth" : {$ne : new Date().getMonth() } }
                            ]
                        }
                    },
                ]
            )  
            for(let index = 0 ; index < leaveBalances.length; index++){
                leaveBalances[index].leaveBalance += ( leaveBalances[index].leaveTypeData[0].leavesAllowed / 12);
                leaveBalances[index].leaveBalanceUpdatedForMonth = new Date().getMonth();
            }
        }  
        else
        {
            leaveBalances = await LeaveBalance.aggregate( 
                [
                    {
                        $lookup:{
                            from: "leavetypes",
                            localField: "leaveType",
                            foreignField: "_id",
                            as : "leaveTypeData",
                        }   
                    },
                ]
            ) 
            for(let index = 0 ; index < leaveBalances.length; index++){
                if(leaveBalances[index].leaveTypeData[0].leaveType == leaveTypesMap.Annual){
                    leaveBalances[index].leaveBalance += ( leaveBalances[index].leaveTypeData[0].leavesAllowed / 12);
                    if(leaveBalances[index].leaveBalance >= 30 ){
                        leaveBalances[index].leaveBalance -= ( leaveBalances[index].leaveTypeData[0].leavesAllowed / 12);
                    }
                }else{
                    leaveBalances[index].leaveBalance = ( leaveBalances[index].leaveTypeData[0].leavesAllowed);
                }
                leaveBalances[index].leaveBalanceUpdatedForMonth = new Date().getMonth();
            }
        }
        let count = 0;
        for(let index = 0 ; index < leaveBalances.length; index++){
            let id = leaveBalances[index]._id;
            delete leaveBalances[index]._id;
            let updatedLeaveBalance = await LeaveBalance.findOneAndUpdate({_id : id},leaveBalances[index]);
            if(updatedLeaveBalance !=null){
                count++;
            }
        }
        if(leaveBalances.length == 0){
            responseData.data={
                cronJobExecuted : false
            };
            responseData.message ="no records found in leave balance";
            responseData.status = 404;
            return res.send(responseData);
        }else{
            responseData.data={
                cronJobExecuted : true
            };
            responseData.message =`Leave balance updated. Total records updated : ${count}`;
            responseData.status = 200;
            return res.send(responseData);
        }
    }catch(e){
        responseData.data={
            cronJobExecuted : false
        };
        responseData.message ="There is some server error .please contact admin."+e.message;
        responseData.status = 500;
        return res.send(responseData);
    }
}
const createLeaveBalance = async(req, res)=>{
    const responseData = {
        status: 0,
        data: null,
        message: ""
    }
    try{
        const {
            userId,
            leaveTypeId,
            leaveBalance,
            leaveBalanceUpdatedForMonth
         } =  req.body;
        //validate the data 

       const createdLEaveBalance  =  await LeaveBalance.create({
            user : new mongoose.Types.ObjectId(userId),
            leaveType: new mongoose.Types.ObjectId(leaveTypeId),
            leaveBalance: leaveBalance,
            leaveBalanceUpdatedForMonth: leaveBalanceUpdatedForMonth
        });
        if(createdLEaveBalance!=null){
            responseData.status  =201;
            responseData.data = createdLEaveBalance;
            responseData.message="Leave balance created";
            return res.send(responseData);
        }else{
            responseData.status = 500;
            responseData.message = "Could not create leave balance";
            responseData.data = null;
            return res.send(responseData);
        }
    }catch(e){
        responseData.status = 500;
        responseData.message = "Could not create leave balance " + e.message;
        responseData.data = null;
        return res.send(responseData);
    }
}
export {updateLeaveBalance, createLeaveBalance}