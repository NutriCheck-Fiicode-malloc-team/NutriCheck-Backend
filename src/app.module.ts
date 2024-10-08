import { Module } from '@nestjs/common';
import * as schema from './drizzle/schema';
import { DrizzlePGModule } from '@knaadh/nestjs-drizzle-pg';
import { AuthModule } from './routes/auth/auth.module';
import { ClsModule } from 'nestjs-cls';
import { ProfileModule } from './routes/profile/profile.module';
import { AuthGuard } from './routes/auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { ProductModule } from './routes/product/product.module';
import { PostModule } from './routes/post/post.module';
import { SubmissionModule } from './routes/submission/submission.module';
import { db_url } from './core/constants';
import { CommentModule } from './routes/comment/comment.module';
import { AiModule } from './routes/ai/ai.module';
import { BadgeModule } from './routes/badge/badge.module';
import { ChallengeModule } from './routes/challenge/challenge.module';
import { RedeemModule } from './routes/redeem/redeem.module';
import { DailyIntakeModule } from './routes/daily-intake/daily-intake.module';
import { TeamModule } from './routes/team/team.module';
import { TeamInviteModule } from './routes/team-invite/team-invite.module';

@Module({
	imports: [
		DrizzlePGModule.register({
			tag: 'DB',
			pg: {
				connection: 'client',
				config: {
					user: 'postgres.zqxqbceqanuyqniwjtqs',
					password: 'ehWMvfPT#7JKdXg',
					host: 'aws-0-eu-central-1.pooler.supabase.com',
					port: 6543,
					database: 'postgres'
				}
			},
			config: { schema: { ...schema } }
		}),
		ClsModule.forRoot({
			global: true,
			middleware: {
				mount: true
			}
		}),
		AuthModule,
		ProfileModule,
		ProductModule,
		PostModule,
		SubmissionModule,
		CommentModule,
		AiModule,
		BadgeModule,
		ChallengeModule,
		RedeemModule,
		DailyIntakeModule,
		TeamModule,
		TeamInviteModule
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: AuthGuard
		}
	]
})
export class AppModule {}
