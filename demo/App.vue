<template>
    <div class="layout">
        <div class="content is-centered">
            <div class="wrapper">
                <div class="card is-bottom-decorated is-primary">
                    <h1 class="is-primary-colored is-normal-sized">
                        Notification Test
                    </h1>
                    <div class="gaper is-auto is-mini-gaped">
                        <button @click="createSimpleNotif">
                            Simple Notification
                        </button>
                        <button @click="createSuccessNotif">
                            Success notification
                        </button>
                        <button
                            class="is-primary"
                            @click="createCustomNotification"
                        >
                            Custom notification
                        </button>
                    </div>
                </div>
            </div>
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
                content: "This is a simple notfication"
            });
        }
        function createSuccessNotif() {
            createDefaultSimpleNotification({
                title: "Test",
                content: "This is a <strong>simple</strong> notfication",
                class: "is-left-decorated is-success"
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
        return {
            createSimpleNotif,
            createSuccessNotif,
            createCustomNotification
        };
    }
});
</script>

<style lang="scss">
@use "@bardoui/termeh/termeh.scss" as T;
@use "var";
@use "@bardoui/termeh/styles.scss";
@use "@bardoui/termeh/layout/layout.scss";
@use "@bardoui/termeh/layout/content.scss";
@use "@bardoui/termeh/layout/gaper.scss";
@use "@bardoui/termeh/components/button.scss";
@use "@bardoui/termeh/components/card.scss";
@use "@/termeh.scss";
#app {
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: T.color("alternative");
}
</style>
