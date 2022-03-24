export default `
  type Query {
    getBadges(badgeId: ID!): BadgesObject!
    getAllBadges: BadgesAllObject!
  }
`;
