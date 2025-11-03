/**
 * Notification model
 */
export interface Notification {
    id: number;
    title: string;
    message: string;
    createdAt: Date;
    updatedAt: Date;
}