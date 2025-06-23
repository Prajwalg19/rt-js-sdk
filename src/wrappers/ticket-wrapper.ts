import {PermissionError} from "../client";
import {CommentRequest, CorrespondRequest, Ticket, TicketUpdateRequest} from "../types";
import {PaginatedResponse} from "../types/base";
import {Transaction} from "../types/transactions.types";
import {RTResource} from "./entitiy-wrapper";

export class TicketResource extends RTResource<Ticket> {
  // Ticket-specific action checks
  canComment(): boolean {
    return this.hasAction('comment');
  }

  canCorrespond(): boolean {
    return this.hasAction('correspond');
  }

  canEdit(): boolean {
    return this.hasAction('self') || this.canUpdate();
  }

  canDelete(): boolean {
    return this.hasAction('delete');
  }

  canViewHistory(): boolean {
    return this.hasAction('history');
  }

  // Ticket-specific actions
  async comment(request: CommentRequest): Promise<any> {
    if (!this.canComment()) {
      throw new PermissionError('comment', 'ticket');
    }

    const link = this.getHyperlink('comment')!;
    return this.client.post(link._url, request, true);
  }

  async correspond(request: CorrespondRequest): Promise<any> {
    if (!this.canCorrespond()) {
      throw new PermissionError('correspond', 'ticket');
    }

    const link = this.getHyperlink('correspond')!;
    return this.client.post(link._url, request, true);
  }

  async getHistory(): Promise<PaginatedResponse<Transaction>> {
    return this.followHyperlink<PaginatedResponse<Transaction>>('history');
  }

  async updateTicket(request: TicketUpdateRequest, etag?: string): Promise<string[]> {
    return this.update(request, etag);
  }

  async delete(): Promise<any> {
    if (!this.canDelete()) {
      throw new PermissionError('delete', 'ticket');
    }

    return this.client.delete(this.data._url!, true);
  }

  // Get available lifecycle actions
  getLifecycleActions(): string[] {
    if (!this.data._hyperlinks) return [];

    // Lifecycle actions typically don't have a specific pattern in RT
    // but we can filter out known non-lifecycle actions
    const nonLifecycleRefs = ['self', 'history', 'comment', 'correspond', 'create'];

    return this.data._hyperlinks
      .filter(link => !nonLifecycleRefs.includes(link.ref))
      .map(link => link.ref);
  }

  // Execute lifecycle action (like 'resolve', 'open', etc.)
  async executeLifecycleAction(action: string, data?: any): Promise<any> {
    const link = this.getHyperlink(action);
    if (!link) {
      throw new PermissionError(action, 'ticket');
    }

    // Lifecycle actions are typically POST requests
    return this.client.post(link._url, data, true);
  }
}
