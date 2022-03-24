import Badges from 'src/model/Badges';
import badgesService from 'src/services';
import { BadgesObject, BadgesQueryArgs } from '../typings';

// async function dummyQuery(
//   _: any,
//   args: IDummyQueryArgs,
// ): Promise<IDummyObject> {
//   const { itemId } = args;

//   console.log(`Query object with id ${itemId}`);

//   return {
//     firstItem: 'first',
//     secondItem: 'second',
//   };
// }

// export default dummyQuery;
async function GetBadges(
  _: any,
  args: BadgesQueryArgs,
): Promise<any> {
  console.log(args.badgeId)
  // const { itemId } = args;
  const badges= await badgesService.getBadges(args.badgeId);
  // console.log(`Query object with id ${itemId}`);
  console.log(badges)
  return badges;
}

export const getBadges=GetBadges;

async function GetAllBadges(
  _: any,
): Promise<any>{
  console.log("hi")
  const badges= await badgesService.getAllBadges();
  // console.log(`Query object with id ${itemId}`);
  console.log(badges)
  return badges;
}

export const getAllBadges=GetAllBadges;