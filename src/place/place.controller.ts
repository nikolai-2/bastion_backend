import { Controller, Delete, Get, Post } from '@nestjs/common';
import { get } from 'http';
import { PlaceService } from './place.service';

@Controller('place')
export class PlaceController {
    constructor(private placeService:PlaceService){

    }

    @Get("/get")
    getPlace(){

    }

    @Post("/new")
    newPlace(){

    }

    @Delete("/remove")
    removePlace(){
        
    }
}
