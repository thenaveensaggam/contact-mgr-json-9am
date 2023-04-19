import jsonfile from "jsonfile";
import path from "path";
import {IContact} from "../models/IContact";
import {IGroup} from "../models/IGroup";

export class GroupDBUtil {

    private static filePath = path.join(process.cwd(), "database", "groups.json");

    public static readAllGroups(): Promise<IGroup[]>{
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

    public static readGroup(groupId: string): Promise<IGroup | undefined> {
        return new Promise((resolve, reject) => {
            jsonfile.readFile(this.filePath, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    const groupList: IGroup[] = data;
                    const group: IGroup | undefined = groupList.find(item => item.id === groupId);
                    resolve(group);
                }
            })
        })
    }

    public static writeAllGroups(groups:IGroup[]): Promise<boolean>{
        return new Promise((resolve, reject) => {
            jsonfile.writeFile(this.filePath, groups, (err) => {
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