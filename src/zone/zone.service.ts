import { Injectable } from '@nestjs/common';

@Injectable()
export class ZoneService {

    get(){
        return "Zone here"
    }

    check(){
        return "Check yes"
    }

}
