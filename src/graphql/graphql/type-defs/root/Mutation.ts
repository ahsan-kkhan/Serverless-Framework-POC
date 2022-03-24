export default `
  type Mutation {
    createBadges(input: BadgesInput!): BadgesObject!
    updateBadges(input: BadgesInput!): BadgesObject!
    deleteBadges(badgeId: ID!): String!
  }
`;
