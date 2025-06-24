import {PermissionError, RTClient} from "../client";
import {HypermediaLink, HypermediaResponse} from "../types/base";

export class RTResource<T extends HypermediaResponse> {
    protected client: RTClient;
    protected data: T;

    constructor(client: RTClient, data: T) {
        this.client = client;
        this.data = data;
    }

    getData(): T {
        return this.data;
    }

    getId(): string | number {
        return this.data.id!;
    }

    getUrl(): string | undefined {
        return this.data._url
            ?? this.data._hyperlinks?.find(link => link.ref === "self")?._url;
    }

    hasAction(ref: string, type?: string): boolean {
        if (!this.data._hyperlinks) return false;

        return this.data._hyperlinks.some(link =>
            link.ref === ref && (!type || link.type === type)
        );
    }

    getHyperlink(ref: string, type?: string): HypermediaLink | undefined {
        if (!this.data._hyperlinks) return undefined;

        return this.data._hyperlinks.find(link =>
            link.ref === ref && (!type || link.type === type)
        );
    }

    getAvailableActions(): string[] {
        if (!this.data._hyperlinks) return [];
        return [...new Set(this.data._hyperlinks.map(link => link.ref))];
    }

    async followHyperlink<R>(ref: string, type?: string): Promise<R> {
        const link = this.getHyperlink(ref, type);
        if (!link) {
            throw new PermissionError(ref, this.data.type);
        }
        return this.client.followLink<R>(link);
    }

    canUpdate(): boolean {
        return this.hasAction('self') || !!this.data._url;
    }

    protected async update(data: Partial<T>, etag?: string): Promise<string[]> {
        if (!this.canUpdate()) {
            throw new PermissionError('update', this.data.type);
        }

        const headers: Record<string, string> = {};
        if (etag) {
            headers['If-Match'] = etag;
        }

        const url = this.data._url!;
        return this.client.put<string[]>(url, data, headers, true);
    }
}
