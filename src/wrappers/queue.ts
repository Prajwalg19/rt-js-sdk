import {PermissionError} from "../client";
import {TicketCreateRequest} from "../types";
import {PaginatedResponse} from "../types/base";
import {Queue} from "../types/queues.types";
import {Transaction} from "../types/transactions.types";
import {RTResource} from "./entitiy-wrapper";

export class QueueResource extends RTResource<Queue> {
  canCreateTicket(): boolean {
    return this.hasAction('create', 'ticket');
  }

  canViewHistory(): boolean {
    return this.hasAction('history');
  }

  async createTicket(request: TicketCreateRequest): Promise<{ id: string; type: string; _url: string }> {
    if (!this.canCreateTicket()) {
      throw new PermissionError('create ticket', 'queue');
    }

    const link = this.getHyperlink('create', 'ticket')!;
    return this.client.post(link._url, request, true);
  }

  async getHistory(): Promise<PaginatedResponse<Transaction>> {
    return this.followHyperlink<PaginatedResponse<Transaction>>('history');
  }
}
