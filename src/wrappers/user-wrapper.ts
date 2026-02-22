import { PermissionError } from "../client";
import { PaginatedResponse } from "../types/base";
import { Transaction } from "../types/transactions.types";
import { User } from "../types/user.types";
import { RTResource } from "./entitiy-wrapper";

export class UserResource extends RTResource<User> {
    canEdit(): boolean {
        return this.hasAction('self') || this.canUpdate();
    }

    canDelete(): boolean {
        return this.hasAction('delete');
    }

    canViewHistory(): boolean {
        return this.hasAction('history');
    }

    async updateUser(data: Partial<User>, etag?: string): Promise<string[]> {
        return this.update(data, etag);
    }

    async delete(): Promise<any> {
        if (!this.canDelete()) {
            throw new PermissionError('delete', 'user');
        }

        return this.client.delete(this.data._url!, true);
    }

    async getHistory(): Promise<PaginatedResponse<Transaction>> {
        return this.followHyperlink<PaginatedResponse<Transaction>>('history');
    }
}
