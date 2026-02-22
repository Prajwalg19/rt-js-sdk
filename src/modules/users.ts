import { RTClient } from "../client";
import { PaginatedResponse } from "../types/base";
import { SearchOptions } from "../types/search.types";
import { User } from "../types/user.types";
import { UserResource } from "../wrappers/user-wrapper";

export class Users {
    constructor(private client: RTClient) {}

    async searchUsers(options: SearchOptions = {}): Promise<PaginatedResponse<UserResource>> {
        const response = await this.client.post<PaginatedResponse<User>>('/users', options.query);

        return {
            ...response,
            items: response.items.map(user => new UserResource(this.client, user))
        };
    }

    async getUser(id: number | string): Promise<UserResource> {
        const user = await this.client.get<User>(`/user/${id}`);
        return new UserResource(this.client, user);
    }

    async createUser(data: Partial<User>): Promise<UserResource> {
        const result = await this.client.post<{ id: string; type: string; _url: string }>('/user', data);
        return this.getUser(result.id);
    }

    async updateUser(id: number | string, data: Partial<User>, etag?: string): Promise<string[]> {
        const headers: Record<string, string> = {};
        if (etag) {
            headers['If-Match'] = etag;
        }
        return this.client.put<string[]>(`/user/${id}`, data, headers);
    }

    async deleteUser(id: number | string): Promise<any> {
        return this.client.delete(`/user/${id}`);
    }
}
