import { generate } from "shortid";
import { h, ref } from "vue";
import {
    ComponentType,
    NotificationRecord,
    NotificationOptions
} from "./types";
import { generateId } from "./globalId";
import { getContainerOptions, getGlobalOptions, mergeOptions } from "./options";
import SimpleNotification from "./Simple.vue";

/**
 * modals list
 */
export const notifications = ref<NotificationRecord[]>([]);

/**
 * remove notification by id
 * @param globalId global id
 */
export function destroyNotification(globalId: string): void {
    notifications.value = notifications.value.filter(
        i => i.globalId !== globalId
    );
}

/**
 * create new notification
 *
 * this function pass following props to component by default:
 * globalId:string notification unique id
 * options:NotificationOption notification options
 *
 * @param container container name
 * @param com component instance
 * @param props components props list
 * @param options notification options (optional)
 */
export function createNotification(
    container: string,
    com: ComponentType,
    props: { [k: string]: any },
    options: NotificationOptions = {}
): string {
    props["globalId"] = generateId(container, generate());
    props["options"] = mergeOptions(
        getGlobalOptions(),
        getContainerOptions(container),
        options
    );
    notifications.value.push({
        globalId: props["globalId"],
        component: h(com, props)
    });
    return props["globalId"];
}

/**
 * create new simple notification
 *
 * @param container container name
 * @param props components props list
 * @param options notification options (optional)
 */
export function createSimpleNotification(
    container: string,
    props: {
        content: string;
        title?: string;
        [key: string]: any;
    },
    options: NotificationOptions = {}
): string {
    return createNotification(container, SimpleNotification, props, options);
}

/**
 * create new notification for default container
 *
 * @param com component instance
 * @param props components props list
 * @param options notification options (optional)
 */
export function createDefaultNotification(
    com: ComponentType,
    props: { [k: string]: any },
    options: NotificationOptions = {}
): string {
    return createNotification("default", com, props, options);
}

/**
 * create new simple notification for default container
 *
 * @param props components props list
 * @param options notification options (optional)
 */
export function createDefaultSimpleNotification(
    props: {
        content: string;
        title?: string;
        [key: string]: any;
    },
    options: NotificationOptions = {}
): string {
    return createSimpleNotification("default", props, options);
}
