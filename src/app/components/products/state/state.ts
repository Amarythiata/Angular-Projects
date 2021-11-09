export enum DataStateEnum {
    LOADING,
    LOADED,
    ERROR
}

export  interface AppDataStage<T> {
    dataState? : DataStateEnum;
    data?: T;
    errorMessage? : string

}