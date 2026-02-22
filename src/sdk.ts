import {RTClient} from "./client";
import {Assets} from "./modules/assets";
import {Queues} from "./modules/queues";
import {Tickets} from "./modules/tickets";
import {Users} from "./modules/users";
import {AuthConfig} from "./types/user.types";

export class RTSDK {
    private client: RTClient;
    public tickets: Tickets;
    public queues: Queues;
    public users: Users;
    public assets: Assets;

    constructor(config: AuthConfig) {
        this.client = new RTClient(config);
        this.tickets = new Tickets(this.client);
        this.queues = new Queues(this.client);
        this.users = new Users(this.client);
        this.assets = new Assets(this.client);
    }
}

// ====== Export Everything ======


