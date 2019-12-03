
export interface Client {
    uuid: string;
    surname: string;
    name: string;
    pesel?: number;
    email: string;
    phone: number;
    regon?: number;
    compName?: string;
}