export interface Id  {
    id: string
}

export interface Entity  {
    id: Id;
}

export interface HttpResponse {
    status: number;
    data?: [];
}
export interface Repository<T extends Entity> {
    index:() => Promise<T[]>;
    create:(payload: T) => Promise<T>;
    show:(id: Id) => Promise<T>;
    update:(payload: T) => Promise<T>;
    destroy:(id: Id) => Promise<HttpResponse>;
}

