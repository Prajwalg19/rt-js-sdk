import { RTClient } from "../client";
import { PaginatedResponse } from "../types/base";
import { Asset, AssetCreateRequest, AssetUpdateRequest } from "../types/assets.types";
import { SearchOptions } from "../types/search.types";
import { AssetResource } from "../wrappers/asset-wrapper";

export class Assets {
    constructor(private client: RTClient) {}

    async searchAssets(options: SearchOptions = {}): Promise<PaginatedResponse<AssetResource>> {
        const response = await this.client.post<PaginatedResponse<Asset>>('/assets', options.query);

        return {
            ...response,
            items: response.items.map(asset => new AssetResource(this.client, asset))
        };
    }

    async getAsset(id: number | string): Promise<AssetResource> {
        const asset = await this.client.get<Asset>(`/asset/${id}`);
        return new AssetResource(this.client, asset);
    }

    async createAsset(data: AssetCreateRequest): Promise<AssetResource> {
        const result = await this.client.post<{ id: string; type: string; _url: string }>('/asset', data);
        return this.getAsset(result.id);
    }

    async updateAsset(id: number | string, data: AssetUpdateRequest, etag?: string): Promise<string[]> {
        const headers: Record<string, string> = {};
        if (etag) {
            headers['If-Match'] = etag;
        }
        return this.client.put<string[]>(`/asset/${id}`, data, headers);
    }

    async deleteAsset(id: number | string): Promise<any> {
        return this.client.delete(`/asset/${id}`);
    }
}
