<template>
    <div class="layout is-simple is-centered">
        <div class="content">
            <div class="wrapper">
                <div class="card is-decorated is-primary">
                    <h1 class="is-primary-colored is-normal-sized">
                        Notification Test
                    </h1>
                    <div class="gaper is-mini-gaped">
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
                content: "This is a simple notfication",
            });
        }
        function createSuccessNotif() {
            createDefaultSimpleNotification({
                title: "Test",
                content: "This is a simple notfication",
                class: "is-decorated is-success"
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
@import "@bardoui/termeh/scss/core.scss";
@include _var("font", "family", "calibri");
@include _var("font", "size", 12px);
@import "@bardoui/termeh/scss/reset.scss";
@import "@bardoui/termeh/scss/component/layout.scss";
@import "@bardoui/termeh/scss/component/button.scss";
@import "@bardoui/termeh/scss/component/gaper.scss";
@import "@bardoui/termeh/scss/component/card.scss";
// @import "@/termeh.scss";
@import "../dist/style.css";
#app {
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidder;
    background: _palette("shade", "50");
}
</style>
