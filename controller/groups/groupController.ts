import {Request, Response} from "express";
import {validationResult} from "express-validator";
import {v4} from "uuid";
import {IGroup} from "../../models/IGroup";
import {GroupDBUtil} from "../../util/GroupDBUtil";
import {IContact} from "../../models/IContact";
import {ContactDBUtil} from "../../util/ContactDBUtil";

/**
 @usage : create a Group
 @method : POST
 @body : name
 @url : http://localhost:9999/groups/
 */
export const createGroup = async (request:Request, response:Response) => {
    try{
        // read the form data
        const {name} = request.body;

        // create contact Object
        const newGroup:IGroup = {
            id : v4(),
            name : name
        };

        const allGroups:IGroup[] = await GroupDBUtil.readAllGroups();
        allGroups.push(newGroup);
        const isSaved:boolean = await GroupDBUtil.writeAllGroups(allGroups);
        if(isSaved){
            return  response.status(200).json(newGroup);
        }
    }
    catch (error:any) {
        return response.status(500).json({errors : [error.message]});
    }
};

/**
 @usage : to get all groups
 @method : GET
 @body : no-params
 @url : http://localhost:9999/groups
 */
export const getAllGroups = async (request:Request, response:Response) => {
    try{
        const allGroups:IGroup[] = await GroupDBUtil.readAllGroups();
        return  response.status(200).json(allGroups)
    }
    catch (error:any) {
        return response.status(500).json({errors : [error.message]});
    }
};

/**
 @usage : to get a group
 @method : GET
 @body : no-params
 @url : http://localhost:9999/groups/:groupId
 */
export const getGroup = async (request:Request, response:Response) => {
    try{
        const {groupId} = request.params;
        if(groupId){
            const group:IGroup | undefined = await GroupDBUtil.readGroup(groupId);
            if(group){
                return  response.status(200).json(group)
            }
            else{
                return  response.status(200).json({msg : "No Group Found!"})
            }
        }
    }
    catch (error:any) {
        return response.status(500).json({errors : [error.message]});
    }
};