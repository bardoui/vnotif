/**
 * generate global id from container name and notification id
 * @param container container name
 * @param notification notification id
 */
export function generateId(container: string, notification: string): string {
    return `${container}:::${notification}`;
}

/**
 * get container name from global id
 * @param id global id
 */
export function getContainer(id: string): string {
    return id.split(":::")[0];
}

/**
 * get notification id from global id
 * @param id global id
 */
export function getNotificationId(id: string): string {
    return id.split(":::")[1];
}

/**
 * detect if global id belongs to container
 * @param id global id
 * @param container container name
 */
export function detectContainer(id: string, container: string): boolean {
    return id.startsWith(`${container}:::`);
}

/**
 * detect if global id is for notification
 * @param id global id
 * @param notification notification id
 */
export function detectNotification(id: string, notification: string): boolean {
    return id.endsWith(`:::${notification}`);
}
