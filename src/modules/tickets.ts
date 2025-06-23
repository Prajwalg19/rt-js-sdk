import {RTClient} from "../client";
import {Ticket, TicketCreateRequest, TicketUpdateRequest} from "../types";
import {PaginatedResponse} from "../types/base";
import {SearchOptions} from "../types/search.types";
import {TicketResource} from "../wrappers/ticket-wrapper";

export class Tickets {
    constructor(private client : RTClient){}
    async searchTickets(options: SearchOptions = {}): Promise<PaginatedResponse<TicketResource>> {
        const response = await this.client.post<PaginatedResponse<Ticket>>('/tickets', options.query, false);

        return {
            ...response,
            items: response.items.map(ticket => new TicketResource(this.client, ticket))
        };
    }

    async getTicket(id: number | string): Promise<TicketResource> {
        const ticket = await this.client.get<Ticket>(`/ticket/${id}`);
        return new TicketResource(this.client, ticket);
    }

    async createTicket(request: TicketCreateRequest): Promise<TicketResource> {
        const result = await this.client.post<{ id: string; type: string; _url: string }>('/ticket', request);
        return this.getTicket(result.id);
    }

    async bulkCreateTickets(requests: TicketCreateRequest[]): Promise<{ id: string; type: string; _url: string }[]> {
        return this.client.post<{ id: string; type: string; _url: string }[]>('/tickets/bulk', requests);
    }

    async bulkUpdateTickets(updates: Array<{ id: number } & TicketUpdateRequest>): Promise<any> {
        return this.client.put('/tickets/bulk', updates);
    }


}

