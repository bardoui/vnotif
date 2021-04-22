<template>
    <div class="layout is-simple is-centered">
        <div>
            <h1>Notification Test</h1>
            <button @click="createSimpleNotif">
                Create a simple notification
            </button>
            <button class="is-primary" @click="createCustomNotification">
                Create custom notification
            </button>
        </div>
    </div>
    <notification />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
    createDefaultNotification,
    createDefaultSimpleNotification
} from "../src/vNotif";
import MyNotif from "./MyNotif.vue";
export default defineComponent({
    setup() {
        function createSimpleNotif() {
            createDefaultSimpleNotification({
                title: "Test",
                content: "This is a simple notfication",
                class: "is-success"
            });
        }
        function createCustomNotification() {
            createDefaultNotification(
                MyNotif,
                {
                    message: "are you want to delete record?",
                    yesText: "Delete",
                    noText: "Cancel",
                    class: "is-error"
                },
                {
                    onAction: async (k, _) => {
                        if (k === "no") {
                            return Promise.resolve(true);
                        } else {
                            var promise = new Promise<boolean>(function(
                                resolve,
                                _
                            ) {
                                window.setTimeout(function() {
                                    resolve(true);
                                }, 5000);
                            });
                            return promise;
                        }
                    }
                }
            );
        }
        return { createSimpleNotif, createCustomNotification };
    }
});
</script>

<style lang="scss">
@import "@bardoui/termeh/scss/core.scss";
@include set-var("font", "family", "calibri");
@include set-var("font", "size", 12px);
@import "@bardoui/termeh/scss/reset.scss";
@import "@bardoui/termeh/scss/component/layout.scss";
@import "@bardoui/termeh/scss/component/button.scss";
@import "../src/termeh.scss";
#app {
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidder;
}
</style>
