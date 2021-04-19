<template>
    <div class="v-notification-container" v-show="hasNotification">
        <component
            v-for="n in containerNotifications"
            :key="n.globalId"
            :is="n.component"
        />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, watchEffect } from "vue";
import { setContainerOptions } from "./options";
import { NotificationOptions } from "./types";
import { notifications } from "./notification";
import { detectContainer } from "./globalId";
export default defineComponent({
    props: {
        name: {
            type: String,
            default: "default"
        },
        options: {
            type: Object as () => NotificationOptions,
            default: () => ({})
        }
    },
    setup(props) {
        watchEffect(() => {
            if (props.options) {
                setContainerOptions(props.name, props.options);
            }
        });

        const containerNotifications = computed(() =>
            notifications.value.filter(i =>
                detectContainer(i.globalId, props.name)
            )
        );
        const hasNotification = computed(
            () => containerNotifications.value.length > 0
        );

        return {
            containerNotifications,
            hasNotification
        };
    }
});
</script>
