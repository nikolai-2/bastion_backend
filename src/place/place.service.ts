import { Injectable } from '@nestjs/common';

@Injectable()
export class PlaceService {
    getPlace(){
        return "Place here"
    }

    newPlace(){
        return "Create place"
    }

    removePlace(){
        return "Remove place"
    }
}
