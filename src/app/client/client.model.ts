
export interface Client {
    uuid: string;
    surname: string;
    name: string;
    pesel?: number;
    email: string;
    phone: number;
    regon?: number;
    compName?: string;
    address: Address[];
}

export interface Address{
    uuid: string;
    addressType: string;
    street: string;
    houseNumber: number;
    localNumber?: number;
    postalCode: string;
    city: string;
}