import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubmissionDto {
	@IsNotEmpty()
	@IsString()
	@ApiProperty()
	body: string;

	@IsNotEmpty()
	@IsNumber()
	@ApiProperty()
	ean: number;
}
