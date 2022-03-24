import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import badgesService from '../../services/index'
// import dynamoDBClient from '../../model/index'


import { v4 } from "uuid";
// import Badges from "src/model/Badges";
// import Badges from "src/model/Badges";
// const b = new badgesService(dynamoDBClient);
export const getAllBadges = middyfy(async (): Promise<APIGatewayProxyResult> => {
    const badges = await badgesService.getAllBadges(); 
    return formatJSONResponse({
        badges
    })
})

export const createBadges = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const id = v4();
        const parsedBody =  JSON.parse(event.body);
        const badges = await badgesService.createBadges({
            badgesId:id,
            badgeTitle:parsedBody?.title,
            badgeImage:parsedBody?.image,
            badgeStatus:parsedBody?.status,
            isAdmin: true
        })
        return formatJSONResponse({
            badges
        });
    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
})

export const getBadges = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    try {
        const badges = await badgesService.getBadges(id)
        return formatJSONResponse({
            badges, id
        });
    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
})

export const updateBadges = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    const parsedBody = JSON.parse(event.body || '');
    try {
        const badges = await badgesService.updateBadges(id, 
            { 
                badgeTitle:parsedBody?.title,
                badgeImage:parsedBody?.image,
                badgeStatus:parsedBody?.status,
                isAdmin: true 
            })
        return formatJSONResponse({
            badges, id
        });
    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
})

export const deleteBadges = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    try {
        const badges = await badgesService.deleteBadges(id)
        return formatJSONResponse({
            badges, id
        });
    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
})