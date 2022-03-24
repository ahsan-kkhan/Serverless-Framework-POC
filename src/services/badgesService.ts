import { DocumentClient } from "aws-sdk/clients/dynamodb";

import Badges from "../model/Badges";

export default class badgesService{

    private Tablename = "BadgesTable";

    constructor(private docClient: DocumentClient) { }

    async getAllBadges(): Promise<Badges[]> {
        const badges = await this.docClient.scan({
            TableName: this.Tablename,
        }).promise()
        return badges.Items as Badges[];
    }

    async createBadges(badges: Badges): Promise<Badges> {
        await this.docClient.put({
            TableName: this.Tablename,
            Item: badges
        }).promise()
        return badges as Badges;

    }

    async getBadges(id: string): Promise<Badges> {

        const badges = await this.docClient.get({
            TableName: this.Tablename,
            Key: {
                badgesId: id
            }
        }).promise()
        if (!badges.Item) {
            throw new Error("Id does not exit");
        }
        return badges.Item as Badges;

    }

    async updateBadges(id: string, badges: Partial<Badges>): Promise<Badges> {
        const updated = await this.docClient
            .update({
                TableName: this.Tablename,
                Key: { badgesId: id },
                UpdateExpression:
                    // "set #status = :status",
                    "set badgeTitle = :bt, badgeImage = :bi, badgeStatus = :bs, isAdmin: :iA" ,
                // ExpressionAttributeNames: {
                //     "#status": "status",
                // },
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

    async deleteBadges(id: string): Promise<any> {
        return await this.docClient.delete({
            TableName: this.Tablename,
            Key: {
                BadgesId: id
            }
        }).promise()

    }
}
