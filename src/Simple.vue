<template>
    <div
        class="v-notification"
        @click="close"
        @mouseenter="pause"
        @mouseleave="resume"
        ref="container"
    >
        <div class="content">
            <h1 v-if="title">{{ title }}</h1>
            <p v-html="content"></p>
        </div>
        <div class="progress" :style="{ width: `${progress}%` }"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { NotificationOptions } from "./types";
import { useNotification } from "./useNotification";
export default defineComponent({
    name: "SimpleNotification",
    props: {
        globalId: {
            type: String,
            required: true
        },
        options: {
            type: Object as () => NotificationOptions,
            required: true
        },
        title: String,
        content: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const container = ref<HTMLElement>();
        const { progress, close, pause, resume } = useNotification(
            props.globalId,
            props.options,
            container
        );

        return { progress, close, pause, resume, container };
    }
});
</script>
