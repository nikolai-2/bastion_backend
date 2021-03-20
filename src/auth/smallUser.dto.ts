import { ApiProperty } from "@nestjs/swagger"

export class smallUser {
    @ApiProperty()
    name:string
    @ApiProperty()
    avatar_src:string
    @ApiProperty()
    role:string
}