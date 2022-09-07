
export interface DataCards {
    id:string;
    urlImage:string;
    name:string;
    // statistics?:Statistics;
    gender:string;
}

interface Statistics{
    hp:number;
    attack:number;
    Defense:string;
    speed:string;
}

export interface DataApi {
    count:number;
    next:string;
    previous:null;
results:Array<Results>;
}

export interface Results {
    name:string;
    url:string;
}