import { Client } from '../client/client.model';

export interface Agreement{
    uuid: string;
    agreementNo: string;
    end: string;
    start: string;
    active: boolean;
    additional?: string;
    agreementType: AgreementType;
    client: Client;
}

export interface AgreementType{
    id: number;
    agrName: string;
    repeatable: boolean;
    obligatory: boolean;
}