import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ 
      example: 'batman', 
      description: 'User login',
      type: String  
    })
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'im_batman1952',
    description: 'User password',
    type: String,
  })
  readonly password: string;
}