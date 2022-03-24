import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import badgesService from '../../services/index'
import schema from '../../model/badgesCon'
// const { graphql  } = require('graphql');
import {graphql} from 'graphql';
// import dynamoDBClient from '../../model/index'


import { v4 } from "uuid";
// import Badges from "src/model/Badges";
// import Badges from "src/model/Badges";
// const b = new badgesService(dynamoDBClient);
export const getAllBadges = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try{
        console.log(event.pathParameters.query)
        const badges= await graphql({schema,source:event.pathParameters.query}) 
        return formatJSONResponse({
            badges
        })
    } 
    catch (e) {
        console.log(e)
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
})

export const createBadges = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const parsedBody =  JSON.parse(event.body);
        const badges= await graphql({schema,source: parsedBody.query})

        return formatJSONResponse({
            badges
        });
    } catch (e) {
        console.log(e)
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
})

export const getBadges = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        console.log(event.pathParameters.query)
        const badges= await graphql({schema,source:event.pathParameters.query})
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

export const updateBadges = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const parsedBody =  JSON.parse(event.body);
        const badges= await graphql({schema,source: parsedBody.query})
        // const badges = await badgesService.updateBadges(id, 
        //     { 
        //         badgeTitle:parsedBody?.title,
        //         badgeImage:parsedBody?.image,
        //         badgeStatus:parsedBody?.status,
        //         isAdmin: true 
        //     })
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

export const deleteBadges = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const parsedBody = JSON.parse(event.body);
        await graphql({schema,source: parsedBody.query})
        return formatJSONResponse({
            res:"deleted"
        });
    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
})