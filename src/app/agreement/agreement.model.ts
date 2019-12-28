
export interface Agreement{
    uuid: string;
    agreementNo: string;
    end: string;
    start: string;
    active: boolean;
    additional?: string;
}

export interface AgreementType{
    id: number;
    agrName: string;
    repeatable: boolean;
    obligatory: boolean;
}