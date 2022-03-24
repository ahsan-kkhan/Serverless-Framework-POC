export default `
  type BadgesObject{
    badgeTitle: String,
    badgeImage: String,
    badgeId: String,
    badgeStatus: String,
    isAdmin:Boolean,
  }
  type BadgesAllObject{
    Items:[BadgesObject]
  }
`;
