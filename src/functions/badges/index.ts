import { handlerPath } from '@libs/handler-resolver';

export const getAllBadges = {
    handler: `${handlerPath(__dirname)}/handler.getAllBadges`,
    events: [
        {
            http: {
                method: 'get',
                path: 'badges/',
            },
        },
    ],
};

export const createBadges = {
    handler: `${handlerPath(__dirname)}/handler.createBadges`,
    events: [
        {
            http: {
                method: 'post',
                path: 'bages',
            },
        },
    ],
};

export const getBadges = {
    handler: `${handlerPath(__dirname)}/handler.getBadges`,
    events: [
        {
            http: {
                method: 'get',
                path: 'bages/{id}',
            },
        },
    ],
};

export const updateBadges = {
    handler: `${handlerPath(__dirname)}/handler.updateBadges`,
    events: [
        {
            http: {
                method: 'put',
                path: 'badges/{id}',
            },
        },
    ],
};

export const deleteBadges = {
    handler: `${handlerPath(__dirname)}/handler.deleteBadges`,
    events: [
        {
            http: {
                method: 'delete',
                path: 'badges/{id}',
            },
        },
    ],
};

