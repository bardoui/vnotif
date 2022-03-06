<template>
    <div
        class="v-notification is-left-decorated"
        @mouseenter="pause"
        @mouseleave="resume"
        ref="container"
        :class="{ 'is-loading': loading }"
    >
        <div class="content">
            <h4>{{ title }}</h4>
            <p>{{ message }}</p>
            <div class="gaper is-auto">
                <div class="filler"></div>
                <button
                    class="button is-simple"
                    @click.stop="action('no', 'data')"
                >
                    {{ noText || "no" }}
                </button>
                <button
                    class="button is-error"
                    :class="{ 'is-disabled': loading }"
                    @click.stop="action('yes')"
                >
                    {{ yesText || "yes" }}
                </button>
            </div>
        </div>
        <div class="progress" :style="{ width: `${progress}%` }"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { NotificationOptions, useNotification } from "../src/vNotif";
export default defineComponent({
    name: "MyNotification",
    props: {
        globalId: {
            type: String,
            required: true
        },
        options: {
            type: Object as () => NotificationOptions,
            required: true
        },
        // custom props
        title: String,
        message: String,
        yesText: String,
        noText: String
    },
    setup(props) {
        const container = ref<HTMLElement>(); // template ref
        const {
            progress,
            loading,
            action,
            close,
            pause,
            resume
        } = useNotification(props.globalId, props.options, container);

        return { progress, loading, action, close, pause, resume, container };
    }
});
</script>
