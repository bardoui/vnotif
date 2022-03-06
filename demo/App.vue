<template>
    <div class="layout">
        <div class="content is-centered">
            <div class="wrapper">
                <div class="card is-bottom-decorated is-primary">
                    <div></div>
                    <div class="section is-attached">
                        <div class="header is-left-decorated is-primary">
                            <h3>
                                Notification Test
                            </h3>
                        </div>
                    </div>
                    <div class="section is-secondary">
                        <div class="gaper is-auto is-mini-gaped">
                            <button class="button" @click="createSimpleNotif">
                                Simple Notification
                            </button>
                            <button class="button is-success" @click="createSuccessNotif">
                                Success notification
                            </button>
                            <button
                                class="button is-primary"
                                @click="createCustomNotification"
                            >
                                Custom notification
                            </button>
                        </div>
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
                    title: "Delete Record",
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
@use "@bardoui/termeh/components/header.scss";
@use "@bardoui/termeh/components/button.scss";
@use "@bardoui/termeh/components/card.scss";
@use "@/termeh.scss";
#app {
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: T.variant("base", "section");
}
</style>
