import { onMounted, ref, Ref } from "vue";
import { destroyNotification } from "./notification";
import { NotificationOptions } from "./types";
import anime, { AnimeInstance } from "animejs";

/**
 * composition api for notification component
 *
 * @param globalId global id (passed as `globalId` props to component by constructor function)
 * @param options notification options (passed as props to component by constructor function)
 * @param el notification container element ref
 */
export function useNotification(
    globalId: string,
    options: NotificationOptions,
    el: Ref<HTMLElement | undefined>
) {
    // animations
    let enterAnimation: AnimeInstance | null = null;
    let leaveAnimation: AnimeInstance | null = null;
    onMounted(() => {
        if (!el.value) return;
        if (options.enterAnimation) {
            enterAnimation = anime({
                ...options.enterAnimation,
                ...{
                    targets: el.value,
                    autoplay: false
                }
            });
        }
        if (options.leaveAnimation) {
            leaveAnimation = anime({
                ...options.leaveAnimation,
                ...{
                    targets: el.value,
                    autoplay: false
                }
            });
        }

        enterAnimation?.play();
    });

    // vars
    let interval: number;
    let timeout: number;
    let paused = false;

    // internal functions
    const doClear = (mode: "auto" | "click" | "action") => {
        clearInterval(interval);
        destroyNotification(globalId);
        if (options.onClose) {
            options.onClose(mode);
        }
    };
    const doClose = (mode: "auto" | "click" | "action") => {
        enterAnimation?.pause();
        if (leaveAnimation) {
            leaveAnimation.restart();
            leaveAnimation.finished
                .then(() => doClear(mode))
                .catch(() => doClear(mode));
        } else {
            doClear(mode);
        }
    };

    // states and methods
    const progress = ref(0);
    const loading = ref(false);
    function action(key: string, data?: unknown): void {
        if (options.onAction) {
            loading.value = true;
            options
                .onAction(key, data)
                .then(res => {
                    loading.value = false;
                    if (res) {
                        doClose("action");
                    }
                })
                .catch(() => {
                    loading.value = false;
                });
        }
    }
    function close(): void {
        clearTimeout(timeout);
        doClose("click");
    }
    function pause(): void {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            paused = true;
        }, options.pauseDelay || 0);
    }
    function resume(): void {
        clearTimeout(timeout);
        paused = false;
    }

    // Auto close
    if (options.duration && options.duration > 0) {
        interval = setInterval(() => {
            if (progress.value >= 100) {
                clearInterval(interval);
                doClose("auto");
            } else if (!loading.value && !paused) {
                progress.value++;
            }
        }, options.duration / 100);
    }

    return { progress, loading, action, close, pause, resume };
}
