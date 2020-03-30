import {
  AccountRepositoryLoginResponseLogged_in_user,
  IgApiClient
} from "instagram-private-api";
import { translate } from "./mapChars";

const ig = new IgApiClient();

function makeBio(
  follower1: string,
  follower2: string,
  currentFollowers: number
) {
  return `Followed by ${translate(follower1)}, ${translate(
    follower2
  )} and ${translate(currentFollowers - 2 + " others")}`;
}

export async function getFollowers(pk: number): Promise<number> {
  let followers = -1;

  try {
    followers = (await ig.feed.accountFollowers(pk).items()).length;
  } catch (_) {
    return -1;
  }

  return followers;
}

async function preLogin(): Promise<
  AccountRepositoryLoginResponseLogged_in_user
> {
  if (!ig.state.deviceId) {
    ig.state.generateDevice(process.env.IG_USERNAME);
  }

  await ig.simulate.preLoginFlow();

  return await ig.account.login(
    process.env.IG_USERNAME,
    process.env.IG_PASSWORD
  );
}

async function postLogin() {
  process.nextTick(async () => await ig.simulate.postLoginFlow());
}

export async function updateBio() {
  const loggedInUser = await preLogin();

  ig.account.setBiography(
    makeBio(
      process.env.IG_FOLLOWER1,
      process.env.IG_FOLLOWER2,
      await getFollowers(loggedInUser.pk)
    )
  );

  await postLogin();

  if (!process.env.IS_CRON) {
    const delay = Math.random() * 1000 * 60 * 60;
    console.log(`Next update in ${delay / 1000 / 60} minutes!`);

    setTimeout(updateBio, delay);
  }
}
