//!CAMBIO
export interface DataCards {
    id:string;
    urlImage:string;
    name:string;
    hp:number;
    attack:number;
    defense:number;
    speed:number;
    gender:string;
}
//!CAMBIO
export interface Statistics{
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
//STATS DE CADA CARTA
export interface Stats {
    base_stat:number;
    effort:number;
    stat:Stat
}
export interface Stat {
    name:string;
    url:string;
}