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
        // console.log(event.pathParameters.query)
        // const badges= await graphql({schema,source:event.pathParameters.query}) 
        const badges = await badgesService.getAllBadges();
        // return formatJSONResponse({
        //     badges
        // })
        return badges;
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
        // console.log(event)
        const parsedBody =  (event["args"]["input"]);
        // const badges= await graphql({schema,source: parsedBody.query})
        // console.log(parsedBody.badgeImage)
        const data={
            badgeId:v4(),
            badgeTitle:parsedBody.badgeTitle,
            badgeStatus:parsedBody.badgeStatus,
            badgeImage:parsedBody.badgeImage,
            isAdmin:true
        };
        const badges= await badgesService.createBadges(data);
        // console.log(badges)
        // return formatJSONResponse({
        //     badges
        // });
        return badges
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
        console.log(event["args"]["badgeId"])
        const id =event["args"]["badgeId"];
        const badges=await badgesService.getBadges(id);
        // const badges= await graphql({schema,source:id})
        // console.log(badges)
        // return formatJSONResponse({
        //     // badges
        // });
        return badges.Item;
    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
})

export const updateBadges = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        // const parsedBody =  JSON.parse(event.body);
        const parsedBody =  (event["args"]["input"]);
        // const badges= await graphql({schema,source: parsedBody.query})
        const data={
            // badgeId:v4(),
            badgeTitle:parsedBody.badgeTitle,
            badgeStatus:parsedBody.badgeStatus,
            badgeImage:parsedBody.badgeImage,
            isAdmin:true
        };
        const badges = await badgesService.updateBadges(parsedBody.badgeId, data)
        // return formatJSONResponse({
        //     badges
        // });
        return badges;
    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
})

export const deleteBadges = middyfy(async (event: APIGatewayProxyEvent): Promise<string> => {
    try {
        const parsedBody =  (event["args"]["badgeId"]);
        console.log(parsedBody)
        // const parsedBody = JSON.parse(event.body);
        // await graphql({schema,source: parsedBody.query})
        await badgesService.deleteBadges(parsedBody);
        // const res ="deleted";
        // return formatJSONResponse({
        //     res:"s"
        // });
        return "Deleted";
    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
})