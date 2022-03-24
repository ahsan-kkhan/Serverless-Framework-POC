export interface BadgesObject {
  badgeTitle: string;
  badgeImage: string;
  badgeId: string;
  badgeStatus: string;
  isAdmin:boolean;
}

export interface BadgesQueryArgs {
  badgeId: string;
}

export interface BadgesMutationArgs {
  input: {
    badgeTitle: string;
    badgeImage: string;
    badgeId: string;
    badgeStatus: string;
    isAdmin:boolean;
  };
}
