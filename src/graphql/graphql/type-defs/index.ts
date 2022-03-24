import { gql } from 'apollo-server-lambda';

// Inputs
import BadgesInput from './inputs/BadgesInput';
// Objects
import BadgesObject from './objects/BadgesObject';
// Root types
import Mutation from './root/Mutation'; // tslint:disable-line ordered-imports
import Query from './root/Query'; // tslint:disable-line ordered-imports

const typeDefStrings = [
  // Inputs
  BadgesInput,
  // Objects
  BadgesObject,
  // Root types
  Mutation,
  Query,
];

const typeDefs = typeDefStrings.map(typeDef => gql(typeDef));

export default typeDefs;
