import {RTClient} from "./client";
import {Queues} from "./modules/queues";
import {Tickets} from "./modules/tickets";
import {Ticket, TicketCreateRequest, TicketUpdateRequest} from "./types";
import {PaginatedResponse} from "./types/base";
import {Queue} from "./types/queues.types";
import {SearchOptions} from "./types/search.types";
import {AuthConfig} from "./types/user.types";

export class RTSDK {
    private client: RTClient;
    public tickets : Tickets
    public queues : Queues
    constructor(config: AuthConfig) {
        this.client = new RTClient(config);
        this.tickets = new Tickets(this.client)
        this.queues = new Queues(this.client);
    }

    // // ====== User Operations ======

    // async searchUsers(options: SearchOptions = {}): Promise<PaginatedResponse<UserResource>> {
    //   const response = await this.client.post<PaginatedResponse<User>>('/users', options.query);

    //   return {
    //     ...response,
    //     items: response.items.map(user => new UserResource(this.client, user))
    //   };
    // }

    // async getUser(id: number | string): Promise<UserResource> {
    //   const user = await this.client.get<User>(`/user/${id}`);
    //   return new UserResource(this.client, user);
    // }

    // async createUser(data: Partial<User>): Promise<UserResource> {
    //   const result = await this.client.post<{ id: string; type: string; _url: string }>('/user', data);
    //   return this.getUser(result.id);
    // }

    // // ====== Asset Operations ======

    // async searchAssets(options: SearchOptions = {}): Promise<PaginatedResponse<AssetResource>> {
    //   const response = await this.client.post<PaginatedResponse<Asset>>('/assets', options.query);

    //   return {
    //     ...response,
    //     items: response.items.map(asset => new AssetResource(this.client, asset))
    //   };
    // }

    // async getAsset(id: number | string): Promise<AssetResource> {
    //   const asset = await this.client.get<Asset>(`/asset/${id}`);
    //   return new AssetResource(this.client, asset);
    // }

    // async createAsset(data: Partial<Asset>): Promise<AssetResource> {
    //   const result = await this.client.post<{ id: string; type: string; _url: string }>('/asset', data);
    //   return this.getAsset(result.id);
    // }

    // // ====== Transaction Operations ======

    // async searchTransactions(options: SearchOptions = {}): Promise<PaginatedResponse<Transaction>> {
    //   return this.client.post<PaginatedResponse<Transaction>>('/transactions', options.query);
    // }

    // async getTransaction(id: number | string): Promise<Transaction> {
    //   return this.client.get<Transaction>(`/transaction/${id}`);
    // }

    // // ====== Utility Methods ======

    // async getSystemInfo(): Promise<any> {
    //   return this.client.get<any>('/rt');
    // }

    // // Helper method to build search conditions
    // static buildSearch(...conditions: SearchCondition[]): SearchCondition[] {
    //   return conditions;
    // }

    // // Helper method to create search condition
    // static searchCondition(
    //   field: string,
    //   value: any,
    //   operator: string = '=',
    //   aggregator?: 'AND' | 'OR'
    // ): SearchCondition {
    //   const condition: SearchCondition = { field, operator, value };
    //   if (aggregator) {
    //     condition.entry_aggregator = aggregator;
    //   }
    //   return condition;
    // }
}

// ====== Export Everything ======


