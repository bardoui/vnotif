import { App } from "vue";
import Container from "./Container.vue";
import "./style.scss";

/**
 * install notification plugin
 */
export default {
    install: (app: App) => {
        app.component("notification", Container);
    }
};
export { Container };
export {
    detectContainer,
    detectNotification,
    getContainer,
    getNotificationId
} from "./globalId";
export {
    createNotification,
    createSimpleNotification,
    createDefaultNotification,
    createDefaultSimpleNotification
} from "./notification";
export {
    getContainerOptions,
    getGlobalOptions,
    setContainerOptions,
    setGlobalOptions
} from "./options";
export { ActionHandler, CloseHandler, NotificationOptions } from "./types";
export { useNotification } from "./useNotification";
