export interface Id  {
    id: string
}

export interface Entity  {
    id: Id;
}

interface HttpResponse {
    status: number;
    data?: [];
}
export interface Repository<T extends Entity> {
    index:() => Promise<T[] | HttpResponse>;
    create:(entity: T) => Promise<T | HttpResponse>;
    show:(id: Id) => Promise<T>;
    update:(id: Id) => Promise<HttpResponse>;
    destroy:(id: Id) => Promise<HttpResponse>;
}

