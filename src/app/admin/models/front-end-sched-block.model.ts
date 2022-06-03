export interface FrontEndSchedBlockModel{

    fullBlocks:SchedBlockModel[]; 
    emptyBlocks:SchedBlockModel[]; 


}

export interface SchedBlockModel{

    startMin:number; 
    endMin:number; 
}