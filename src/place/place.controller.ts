import { Controller, Delete, Get, Post } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { get } from 'http';
import { PlaceService } from './place.service';

@Controller('place')
@ApiTags('place')
export class PlaceController {
    constructor(private placeService:PlaceService){

    }

    @Get("get")
    getPlace(){
        return this.placeService.getPlace()
    }

    @Post("new")
    newPlace(){
        return this.placeService.getPlace()
    }

    @Get("remove")
    removePlace(){
        return this.placeService.removePlace()
    }
}
