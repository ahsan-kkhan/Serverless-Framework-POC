import { BadgesMutationArgs, BadgesQueryArgs } from '../typings';
import badgesService from '../../../../services/index';
import {v4} from 'uuid';
import Badges from 'src/model/Badges';
// async function dummyMutation(
//   _: any,
//   args: IDummyMutationArgs,
// ): Promise<boolean> {
//   const { input: { firstInput, secondInput } } = args;

//   console.log(`Mutation with inputs firstInput=${firstInput} and secondInput=${secondInput}`);

//   return true;
// }

// export default dummyMutation;

async function CreateBadges(
  _: any,
  args: BadgesMutationArgs,
): Promise<Badges> {
  // const { input: { badgeTitle, badgeImage,badgesId,badgeStatus,isAdmin} } = args;
  args.input.badgeId=v4();
  args.input.isAdmin=true;
  const badges = await badgesService.createBadges(args.input)
  // console.log(`Mutation with inputs firstInput=${firstInput} and secondInput=${secondInput}`);

  return badges;
}

export const createBadges = CreateBadges;

async function UpdateBadges(
  _: any,
  args: BadgesMutationArgs,
): Promise<Badges> {
  // const { input: { badgeTitle, badgeImage,badgesId,badgeStatus,isAdmin} } = args;
  // args.input.badgeId=v4();
  args.input.isAdmin=true;
  const badges = await badgesService.updateBadges(args.input.badgeId, args.input)
  // console.log(`Mutation with inputs firstInput=${firstInput} and secondInput=${secondInput}`);

  return badges;
}

export const updateBadges = UpdateBadges;

async function DeleteBadges(
  _: any,
  args: BadgesQueryArgs,
): Promise<any> {
  // const { input: { badgeTitle, badgeImage,badgesId,badgeStatus,isAdmin} } = args;
  // args.input.badgeId=v4();
  // args.input.isAdmin=true;
  await badgesService.deleteBadges(args.badgeId)
  // console.log(`Mutation with inputs firstInput=${firstInput} and secondInput=${secondInput}`);

  return "Deleted";
}

export const deleteBadges = DeleteBadges;
