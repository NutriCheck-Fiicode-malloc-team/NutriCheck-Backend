import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../drizzle/schema';
import { productDetails, productReviews } from '../../drizzle/schema';
import { and, count, eq } from 'drizzle-orm';
import { ClsService } from 'nestjs-cls';
import { AuthClsStore } from '../auth/auth.guard';
import { ReviewProductDto } from './dto/review-product.dto';

@Injectable()
export class ProductService {
	constructor(
		@Inject('DB') private db: NodePgDatabase<typeof schema>,
		private cls: ClsService<AuthClsStore>
	) {}

	async review(ean: string, reviewProductDto: ReviewProductDto) {
		await this.db
			.insert(productReviews)
			.values({
				productEAN: ean,
				userID: this.cls.get('userID'),
				like: reviewProductDto.like
			})
			.onConflictDoUpdate({
				target: [productReviews.userID, productReviews.productEAN],
				set: {
					like: reviewProductDto.like
				}
			});
	}

	async findOne(ean: string) {
		return {
			body: (
				await this.db
					.select()
					.from(productDetails)
					.where(eq(productDetails.ean, ean))
			)[0],
			...(
				await this.db
					.select({
						likes: count()
					})
					.from(productReviews)
					.where(
						and(
							eq(productReviews.productEAN, ean),
							eq(productReviews.like, true)
						)
					)
			)[0],
			...(
				await this.db
					.select({
						dislikes: count()
					})
					.from(productReviews)
					.where(
						and(
							eq(productReviews.productEAN, ean),
							eq(productReviews.like, false)
						)
					)
			)[0]
		};
	}

	async deleteReview(ean: string) {
		await this.db
			.delete(productReviews)
			.where(eq(productReviews.productEAN, ean));
	}
}
