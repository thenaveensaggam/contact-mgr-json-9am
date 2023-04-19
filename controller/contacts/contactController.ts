import {Request, Response} from "express";
import {validationResult} from "express-validator";
import {IContact} from "../../models/IContact";
import {v4} from "uuid";
import {ContactDBUtil} from "../../util/ContactDBUtil";

/**
 @usage : create a contact
 @method : POST
 @body : name, imageUrl, email, mobile, company, title, groupId
 @url : http://localhost:9000/contacts/
 */
export const createContact = async (request:Request, response:Response) => {
    try{
        // read the form data
        const {name, imageUrl, email, mobile, company, title, groupId} = request.body;

        // create contact Object
        const newContact:IContact = {
            id : v4(),
            name : name,
            imageUrl : imageUrl,
            email : email,
            mobile : mobile,
            company : company,
            title : title,
            groupId : groupId
        };

        const allContacts:IContact[] = await ContactDBUtil.readAllContacts();
        allContacts.push(newContact);
        const isSaved:boolean = await ContactDBUtil.writeAllContacts(allContacts);
        if(isSaved){
            return  response.status(200).json(newContact)
        }
    }
    catch (error:any) {
        return response.status(500).json({errors : [error.message]});
    }
};

/**
 @usage : to get all contacts
 @method : GET
 @body : no-params
 @url : http://localhost:9000/contacts
 */
export const getAllContacts = async (request:Request, response:Response) => {
    try{
        const allContacts:IContact[] = await ContactDBUtil.readAllContacts();
        return  response.status(200).json(allContacts)
    }
    catch (error:any) {
        return response.status(500).json({errors : [error.message]});
    }
};

/**
 @usage : get a contact
 @method : GET
 @body : no-params
 @url : http://localhost:9000/contacts/:contactId
 */
export const getContact = async (request:Request, response:Response) => {
    try{
        const {contactId} = request.params;
        if(contactId){
            const contact:IContact | undefined = await ContactDBUtil.readContact(contactId);
            if(contact){
                return  response.status(200).json(contact)
            }
            else{
                return  response.status(200).json({msg : "No Contact Found!"})
            }
        }
    }
    catch (error:any) {
        return response.status(500).json({errors : [error.message]});
    }
};

/**
 @usage : update a contact
 @method : PUT
 @body : name, imageUrl, email, mobile, company, title, groupId
 @url : http://localhost:9000/contacts/:contactId
 */
export const updateContact = async (request:Request, response:Response) => {
    try{
        const {contactId} = request.params;
        if(contactId){

            // read the form data
            const {name, imageUrl, email, mobile, company, title, groupId} = request.body;

            // create contact Object
            const newContact:IContact = {
                id : contactId,
                name : name,
                imageUrl : imageUrl,
                email : email,
                mobile : mobile,
                company : company,
                title : title,
                groupId : groupId
            };

            const allContacts:IContact[] = await ContactDBUtil.readAllContacts();
            const selectedContact : IContact | undefined = allContacts.find(contact => contact.id === contactId);
            if(selectedContact){
                const contactIndex = allContacts.indexOf(selectedContact);
                if(contactIndex !== -1){
                    allContacts.splice(contactIndex, 1, newContact); // replace
                    const isSaved:boolean = await ContactDBUtil.writeAllContacts(allContacts);
                    if(isSaved){
                        return  response.status(200).json(newContact)
                    }
                }
            }
        }
    }
    catch (error:any) {
        return response.status(500).json({errors : [error.message]});
    }
};

/**
 @usage : delete a contact
 @method : DELETE
 @body : no-params
 @url : http://localhost:9999/contacts/:contactId
 */
export const deleteContact = async (request:Request, response:Response) => {
    try{
        const {contactId} = request.params;
        if(contactId){
            const allContacts:IContact[] = await ContactDBUtil.readAllContacts();
            const selectedContact : IContact | undefined = allContacts.find(contact => contact.id === contactId);
            if(selectedContact){
                const contactIndex = allContacts.indexOf(selectedContact);
                if(contactIndex !== -1){
                    allContacts.splice(contactIndex, 1); // replace
                    const isSaved:boolean = await ContactDBUtil.writeAllContacts(allContacts);
                    if(isSaved){
                        return  response.status(200).json({})
                    }
                }
            }
            else{
                return  response.status(200).json({msg : "No Contact Found!"})
            }
        }
    }
    catch (error:any) {
        return response.status(500).json({errors : [error.message]});
    }
};