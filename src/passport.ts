import passport from 'passport';
import { Strategy as LineStrategy, Profile } from 'passport-line-auth';
import { prisma } from './config/prisma';

passport.use(
  new LineStrategy(
    {
      channelID: process.env.LINE_CHANNEL_ID!,
      channelSecret: process.env.LINE_CHANNEL_SECRET!,
      callbackURL: 'http://localhost:3000/auth/line/callback',
      scope: ['profile', 'openid', 'email'],
      botPrompt: 'normal',
    },
    async (
      accessToken: string,
      refreshToken: string,
      params: any,
      profile: Profile,
      done: (error: any, user?: any) => void
    ) => {
      try {
        const { userId, displayName, pictureUrl, email } = profile._json;

        const user = await prisma.user.upsert({
          where: { lineId: userId },
          update: {
            name: displayName,
            avatar: pictureUrl,
            email: email,
          },
          create: {
            lineId: userId,
            name: displayName,
            avatar: pictureUrl,
            email: email,
          },
        });

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
