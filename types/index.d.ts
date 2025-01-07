

export interface IAuthContext {
    signIn: (token:string) => void;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
}

export interface CarType {
    make: string;
    model: string;
    year: number;
    deleted: boolean;
    image_path: string | null;
    mechanics: string[];
    drivers: string[];
}

export interface CarTypeID extends CarType {
    _id: string;
}

export interface MechanicType {
    _id: string;
    firstname: string;
    lastname: string;
    age: string;
    deleted: boolean;
    cars: string[];
}

export interface DriverType {
    firstname: string;
    lastname: string;
    age: string;
    deleted: boolean;
}

export interface DriverTypeID extends DriverType {
    _id: string;
}

export interface MechanicTypeID extends MechanicType {
    _id: string;
}



export type IResponseType = CarTypeID
