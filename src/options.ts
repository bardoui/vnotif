import { ContainerOptions, NotificationOptions } from "./types";

// global notification options (internal)
const globalOptions: NotificationOptions = {
    duration: 5000,
    pauseDelay: 50,
    enterAnimation: {
        translateY: [50, 0],
        opacity: [0, 1],
        easing: "cubicBezier(0.165, 0.840, 0.440, 1.000)",
        duration: 300
    },
    leaveAnimation: {
        translateY: [0, 50],
        opacity: [1, 0],
        easing: "cubicBezier(0.165, 0.840, 0.440, 1.000)",
        duration: 300
    }
};

/**
 * set global notification options
 * @param option new options
 */
export function setGlobalOptions(option: NotificationOptions): void {
    const res = mergeOptions(globalOptions, option);
    globalOptions.pauseDelay = res.pauseDelay;
    globalOptions.duration = res.duration;
    globalOptions.enterAnimation = res.enterAnimation;
    globalOptions.leaveAnimation = res.leaveAnimation;
    globalOptions.onAction = res.onAction;
    globalOptions.onClose = res.onClose;
}

/**
 * get global notification options
 */
export function getGlobalOptions(): NotificationOptions {
    return globalOptions || {};
}

/**
 * container Options
 */
const containerOptions: ContainerOptions = {};

/**
 * set container options
 * @param container container name
 * @param option new options
 */
export function setContainerOptions(
    container: string,
    option: NotificationOptions | null | undefined
): void {
    containerOptions[container] = option || {};
}

/**
 * get container options
 * @param container container name
 */
export function getContainerOptions(container: string): NotificationOptions {
    return containerOptions[container] || {};
}

/**
 * merge multiple notification options
 * ignore undefined value
 * latest option value is selected
 *
 * @param options options list to merge
 * @returns merged options
 */
export function mergeOptions(
    ...options: NotificationOptions[]
): NotificationOptions {
    const res: NotificationOptions = {};
    for (const option of options) {
        if (option.duration !== undefined) {
            res.duration = option.duration;
        }
        if (option.pauseDelay !== undefined) {
            res.pauseDelay = option.pauseDelay;
        }
        if (option.enterAnimation !== undefined) {
            res.enterAnimation = option.enterAnimation;
        }
        if (option.leaveAnimation !== undefined) {
            res.leaveAnimation = option.leaveAnimation;
        }
        if (option.onAction !== undefined) {
            res.onAction = option.onAction;
        }
        if (option.onClose !== undefined) {
            res.onClose = option.onClose;
        }
    }
    return res;
}
