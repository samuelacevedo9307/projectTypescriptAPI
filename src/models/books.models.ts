export interface BodyResponseGetAllBooks {
    message: string;
    data: Datum[];
}

export interface Datum {
    id: string;
    title: string;
    author: string;
    description: string;
    summary: string;
    publicationDate: string;
    createdBy: string;
    updatedBy: null;
    deletedBy: null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: null;
    files: any[];
}

export interface BodyRequestCreateBook {
    title: string,
    author: string,
    description: string,
    summary: string,
    publicationDate: string
}

export interface BodyResponseCreateBook {
    message: string,
    data: Record<string, string>
}

export interface BodyResponseGetById {
    massage: string,
    data: Record<string, string>
}

export interface BodyRequestUpdateBook {
    title: string,
    author: string,
    description: string,
    summary: string,
    publicationDate: string
}

export interface BodyResponseUpdateBook {
    message: string,
    data: Record<string, string>
}

export interface bodyResponseDeleteBook {
    message: string,
    data: null
}