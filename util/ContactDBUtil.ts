import jsonfile from "jsonfile";
import path from "path";
import {IContact} from "../models/IContact";

export class ContactDBUtil {

    private static filePath = path.join(process.cwd(), "database", "contacts.json");

    public static readAllContacts(): Promise<IContact[]>{
        return new Promise((resolve, reject) => {
            jsonfile.readFile(this.filePath, (err, data) => {
                if(err){
                    reject(err);
                }
                else {
                    resolve(data);
                }
            })
        })
    }

    public static readContact(contactId: string): Promise<IContact | undefined> {
        return new Promise((resolve, reject) => {
            jsonfile.readFile(this.filePath, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    const contactList: IContact[] = data;
                    const contact: IContact | undefined = contactList.find(item => item.id === contactId);
                    resolve(contact);
                }
            })
        })
    }

    public static writeAllContacts(contacts:IContact[]): Promise<boolean>{
        return new Promise((resolve, reject) => {
            jsonfile.writeFile(this.filePath, contacts, (err) => {
                if(err){
                    reject(false);
                }
                else{
                    resolve(true);
                }
            })
        })
    }
}