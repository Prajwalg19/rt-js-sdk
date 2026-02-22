import { PermissionError } from "../client";
import { PaginatedResponse } from "../types/base";
import { Asset, AssetUpdateRequest } from "../types/assets.types";
import { Transaction } from "../types/transactions.types";
import { RTResource } from "./entitiy-wrapper";

export class AssetResource extends RTResource<Asset> {
    canEdit(): boolean {
        return this.hasAction('self') || this.canUpdate();
    }

    canDelete(): boolean {
        return this.hasAction('delete');
    }

    canViewHistory(): boolean {
        return this.hasAction('history');
    }

    async updateAsset(request: AssetUpdateRequest, etag?: string): Promise<string[]> {
        return this.update(request as unknown as Partial<Asset>, etag);
    }

    async delete(): Promise<any> {
        if (!this.canDelete()) {
            throw new PermissionError('delete', 'asset');
        }

        return this.client.delete(this.data._url!, true);
    }

    async getHistory(): Promise<PaginatedResponse<Transaction>> {
        return this.followHyperlink<PaginatedResponse<Transaction>>('history');
    }
}
