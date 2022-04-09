import postgres from "postgres";
export declare const insertOpeningHours: (restaurantId: string) => postgres.PendingQuery<postgres.Row[]>[];
