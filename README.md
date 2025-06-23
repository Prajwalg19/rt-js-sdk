```
rt-js-sdk/
├── src/
│   ├── index.ts          # Exports the RTSDK main class
│   ├── sdk.ts            # Central RTSDK class: aggregates modules like tickets, users etc.
│   ├── client.ts         # Handles HTTP requests, auth, base URL
│   ├── modules/          # Modular feature-specific folders
│   │   ├── tickets.ts    # Ticket-related API methods
│   │   ├── users.ts      # User-related API methods (future)
│   │   └── queues.ts     # Queue-related methods (future)
│   └── types/            # All shared/custom TypeScript types
│       ├── index.ts      # Main types entry point (re-export)
│       └── ticket.types.ts # Specific ticket types
├── dist/                 # Compiled output (gitignored)
├── tests/                # Unit + integration tests
│   ├── sdk.test.ts
│   └── tickets.test.ts
├── tsconfig.json
├── package.json
├── README.md
└── .gitignore
```
