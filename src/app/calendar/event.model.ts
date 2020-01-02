import { Client } from '../client/client.model';

export interface Event {
    uuid: string;
    start: string;
    finish: string;
    name: string;
    description?: string;
    eventType: EventType;
}

export interface EventType {
    id: number;
    eventTypeName: string;
}

export interface EventClients {
    name: string;
    phone: string;
    client?: Client;
}