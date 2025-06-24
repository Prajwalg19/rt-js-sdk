import {RTClient} from "../client";
import {PaginatedResponse} from "../types/base";
import {Queue} from "../types/queues.types";
import {SearchOptions} from "../types/search.types";
import {QueueResource} from "../wrappers/queue-wrapper";

export class Queues{
    constructor(private client : RTClient){}
    async getAllQueues(): Promise<PaginatedResponse<QueueResource>> {
        const response = await this.client.get<PaginatedResponse<Queue>>('/queues/all');

        return {
            ...response,
            items: response.items.map(queue => new QueueResource(this.client, queue))
        };
    }

    async searchQueues(options: SearchOptions = {}): Promise<PaginatedResponse<QueueResource>> {
        const response = await this.client.post<PaginatedResponse<Queue>>('/queues', options.query);

        return {
            ...response,
            items: response.items.map(queue => new QueueResource(this.client, queue))
        };
    }

    async getQueue(id: number | string): Promise<QueueResource> {
        const queue = await this.client.get<Queue>(`/queue/${id}`);
        return new QueueResource(this.client, queue);
    }

    async createQueue(data: Partial<Queue>): Promise<QueueResource> {
        const result = await this.client.post<{ id: string; type: string; _url: string }>('/queue', data);
        return this.getQueue(result.id);
    }

}

