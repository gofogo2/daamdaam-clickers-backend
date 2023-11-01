import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

@ApiExtraModels()
export class CreateGateDto {
  @ApiProperty({ example: '1' })
  name: string;
  @ApiProperty({ example: '2022-12-18' })
  date: Date;
  @ApiProperty()
  sum: number;
  @ApiProperty()
  count: number;
  @ApiProperty({ example: 18 })
  day: number;
}

@ApiExtraModels()
export class UpdateGateDto {
  @ApiProperty()
  count: number;
}
