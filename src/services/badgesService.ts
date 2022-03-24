import { DocumentClient } from "aws-sdk/clients/dynamodb";

import Badges from "../model/Badges";

export default class badgesService{

    private Tablename = "BadgesTable";

    constructor(private docClient: DocumentClient) { }

    async getAllBadges(){
        try{
            const badges = await this.docClient.scan({
                TableName: this.Tablename,
            }).promise()
            console.log(badges.Items)
            return (badges.Items) ;
        }
        catch(err){
            return err;
        }
    }

    async createBadges(badges: Badges){
        try{
            await this.docClient.put({
                TableName: this.Tablename,
                Item: badges
            }).promise()
            return badges ;
        }
        catch(err){
            return err;
        }

    }

    async getBadges(id: string){
    try {
        const badges = await this.docClient.get({
            TableName: this.Tablename,
            Key: {
                badgeId: id
            }
        }).promise()
        if (!badges.Item) {
            throw new Error("Id does not exit");
        }
        return badges.Item as Badges;
    }
    catch(err){
        return err;
    }
    }

    async updateBadges(id: string, badges: Partial<Badges>): Promise<Badges> {
        try{
            const updated = await this.docClient
                .update({
                    TableName: this.Tablename,
                    Key: { badgeId: id },
                    UpdateExpression:
                        "set badgeTitle = :bt, badgeImage = :bi, badgeStatus = :bs, isAdmin= :iA" ,
                    ExpressionAttributeValues: {
                        ":bt":badges.badgeTitle,
                        ":bi":badges.badgeImage,
                        ":bs":badges.badgeStatus,
                        ":iA":badges.isAdmin
                    },
                    ReturnValues: "ALL_NEW",
                })
                .promise();

            return updated.Attributes as Badges;
        }
        catch(err){
            return err;
        }
    }

    async deleteBadges(id: string): Promise<any> {
       try{
            return await this.docClient.delete({
                TableName: this.Tablename,
                Key: {
                    badgeId: id
                }
            }).promise()
        }
        catch(err){
            return err;
        }
    }
}
