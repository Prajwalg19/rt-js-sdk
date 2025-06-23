import { HypermediaLink} from "./types/base";
import { AuthConfig } from "./types/user.types";

export class RTClient {
    private baseUrl : string ;
    private authConfig : AuthConfig
    constructor(
        private config : AuthConfig
    ) {
        this.baseUrl = config.baseUrl.replace(/\/$/, '') + '/REST/2.0';
        this.authConfig = config;
    }

    private getAuthHeaders() : Record <string, string>{
        let headers : Record<string, string> = {};
        if(this.authConfig.token){
            headers["Authorization"]  = `token ${this.authConfig.token}`
        }else if (this.authConfig.password && this.authConfig.username){
            headers["Authorization"] = `Basic ${this.authConfig.username}:${this.authConfig.password}`
        }else if(this.authConfig.cookie){
            headers["Cookie"] = this.authConfig.cookie
        }
        return headers;
    }

    private async request<T>(
        method: string,
        endpoint: string,
        isFullUrl = false,
        headers : Record <string,string> = {},
        data?: any
    ): Promise<T> {
        const url = isFullUrl ? endpoint : `${this.baseUrl}${endpoint}`;

        const requestHeaders = {
            ...this.getAuthHeaders(),
            ...headers
        }


        if (data && !headers['Content-Type']) {
            requestHeaders['Content-Type'] = 'application/json';
        }

        const config: RequestInit = {
            method,
            headers: requestHeaders,
        };


        if (data) {
            config.body = typeof data === 'string' ? data : JSON.stringify(data);
        }


        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                const errorData = await response.text();
                let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

                try {
                    const parsedError = JSON.parse(errorData);
                    errorMessage = parsedError.message || errorMessage;
                } catch {
                    // Use default error message
                }

                throw new RTError(errorMessage, response.status, errorData);
            }

            const contentType = response.headers.get('content-type');
            if (contentType?.includes('application/json')) {
                return await response.json();
            } else {
                return await response.text() as unknown as T;
            }
        } catch (error) {
            if (error instanceof RTError) {
                throw new RTError(`Network error: ${error.message}`);
            }
            throw error;
        }
    }

    async get<T>(endpoint: string, isFullUrl = false): Promise<T> {
        return this.request<T>('GET', endpoint, isFullUrl, {}, undefined);
    }

    async post<T>(endpoint: string, data?: any, isFullUrl = false): Promise<T> {
        return this.request<T>('POST', endpoint,isFullUrl, {}, data);
    }

    async put<T>(endpoint: string, data?: any, headers: Record<string, string> = {}, isFullUrl = false): Promise<T> {
        return this.request<T>('PUT', endpoint, isFullUrl, headers, data);
    }

    async delete<T>(endpoint: string, isFullUrl = false): Promise<T> {
        return this.request<T>('DELETE', endpoint,isFullUrl, {}, undefined);
    }

    async head(endpoint: string, isFullUrl = false): Promise<Response> {
        const url = isFullUrl ? endpoint : `${this.baseUrl}${endpoint}`;
        return fetch(url, {
            method: 'HEAD',
            headers: this.getAuthHeaders(),
        });
    }

    async followLink<T>(link: HypermediaLink): Promise<T> {
        return this.get<T>(link._url, true);
    }
}



export class RTError extends Error {
    constructor(
        message: string,
        public statusCode?: number,
        public response?: any
    ) {
        super(message);
        this.name = 'RTError';
    }
}

export class PermissionError extends RTError {
    constructor(action: string, resource?: string) {
        super(`Permission denied for action '${action}'${resource ? ` on ${resource}` : ''}`);
        this.name = 'PermissionError';
    }
}
