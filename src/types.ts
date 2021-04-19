import { AnimeParams } from "animejs";

/**
 * Simple function
 */
export type MinimalFunction = () => void;

// Action handler callback
export type ActionHandler = (key: string, data?: unknown) => Promise<boolean>;

// Close handler callback
export type CloseHandler = (mode: "auto" | "click" | "action") => void;

// Notification options interface
export interface NotificationOptions {
    duration?: number;
    pauseDelay?: number;
    enterAnimation?: AnimeParams | null;
    leaveAnimation?: AnimeParams | null;
    onAction?: ActionHandler | null;
    onClose?: CloseHandler | null;
}

/**
 * Container options
 */
export interface ContainerOptions {
    [container: string]: NotificationOptions;
}

/**
 * Vue component type
 */
export interface ComponentType {
    [k: string]: any;
}

/**
 * Notification record interface
 */
export interface NotificationRecord {
    globalId: string;
    component: ComponentType;
}
