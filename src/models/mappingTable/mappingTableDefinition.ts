export enum MappableIfcClasses {
    IfcBuildingStorey = "IfcBuildingStorey",
    IfcColumn = "IfcColumn",
    IfcBeam = "IfcBeam",
    IfcWallStandardCase = "IfcWallStandardCase"
}

export type UserArgsMap = {
    [MappableIfcClasses.IfcColumn]: IfcColumnArgs;
    [MappableIfcClasses.IfcBeam]: IfcBeamArgs;
    [MappableIfcClasses.IfcBuildingStorey]: IfcBuildingStoreyArgs;
    [MappableIfcClasses.IfcWallStandardCase]: IfcWallStandardCaseArgs;
}

export interface IfcColumnArgs {
    coordinate: string,
    height: string,
    rotation: string,
    targetStorey: string
}

export interface IfcBeamArgs {
    startPt: string,
    endPt: string,
    height: string,
    targetStorey: string,
}

export interface IfcWallStandardCaseArgs {
    startPt: string,
    endPt: string,
    height: string,
    targetStorey: string,
    zOffset: string,
    thickness: string
}

export interface IfcBuildingStoreyArgs {
    name: string,
    height: string
}

export interface UserArgs<T extends MappableIfcClasses> {
    ifcClass: T;
    userKey: string;
    userArgs: UserArgsMap[T];
}

export interface MappingTableDefinition {
    mappingEntity: {
        [K in MappableIfcClasses]: UserArgs<K>;
    };
}