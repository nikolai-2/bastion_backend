import { Controller, Delete, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { get } from 'http';
import { PlaceService } from './place.service';

@Controller('place')
@ApiTags('place')
export class PlaceController {
    constructor(private placeService:PlaceService){

    }
		
    @Get("get")
		@ApiOperation({summary:"Возвращает объект охраны"})
    getPlace(){
        return this.placeService.getPlace()
    }

    @Post("new")
		@ApiOperation({summary:"Создает новый объект охраны"})
    newPlace(){
        return this.placeService.getPlace()
    }

    @Get("remove")
		@ApiOperation({summary:"Удаляет объект охраны"})
    removePlace(){
        return this.placeService.removePlace()
    }
}
