# Notification

Notification is a Vue 3 plugin for managing notification.

## Installation

**Note:** this package require `animejs` and `shortid` npm package.

### CDN

This package published as `vNotif` module in umd.

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/@bardoui/vnotif/dist/style.css"
/>
<script src="https://unpkg.com/@bardoui/vnotif"></script>
```

### NPM

```bash
npm i @bardoui/vnotif
```

Install notification container with default name (notification):

```ts
import { createApp } from "vue";
import App from "./App.vue";
import vNotif from "@bardoui/vnotif";

createApp(App)
  .use(vNotif)
  .mount("#app");
```

Install notification container with custom name:

```ts
import { createApp } from "vue";
import App from "./App.vue";
import { Container } from "@bardoui/vnotif";
createApp(App)
  .component("notif-container", Container)
  .mount("#app");
```

## Options

Notification has three level options:

- global options (used by default for all container)
- container options (passed as container property and override global options)
- notification options (passed on creation time and override container and global options)

| Property       | Type                                                | Description                                            | Default        |
| :------------- | :-------------------------------------------------- | :----------------------------------------------------- | :------------- |
| duration       | `number`                                            | duration in millisecond, pass 0 to disable auto close  | `5000` (5 sec) |
| pauseDelay     | `number`                                            | delay in millisecond for wait before active pause mode | `50`           |
| enterAnimation | `AnimeParams`                                       | show animation (animejs animation option)              | slide up       |
| leaveAnimation | `AnimeParams`                                       | hide animation (animejs animation option)              | slide down     |
| onAction       | `(key: string, data?: unknown) => Promise<boolean>` | callback for handle action click                       | `null`         |
| onClose        | `(mode: "auto" \| "click" \| "action") => void`     | callback for called after notification close           | `null`         |

## Usage

### Add Notification Container

To showing notification in your app you need to add notification container component in your template.

```html
<template>
  <notification name="default" :options="{ duration: 7000 }" />
</template>
```

| Property | Type                  | Description                                        | Default   |
| :------- | :-------------------- | :------------------------------------------------- | :-------- |
| name     | `string`              | container name                                     | `default` |
| options  | `NotificationOptions` | default options used for creating new notification | `{}`      |

**Note:** you can have multiple container in your app. every container must have a unique name.

**Note:** you can use `createNotification` and `createSimpleNotification` to creating notification for named container or use `createDefaultNotification` and `createDefaultSimpleNotification` to creating notification for unnamed (default) container.

### Show Simple Notification

**Note:** simple notifications has no actions. if you want notification with actions support you must use custom notification.

**Note:** title is optional and you can create notification without title.

```ts
import { defineComponent } from "vue";
import { createDefaultSimpleNotification } from "@bardoui/vnotif";

export default defineComponent({
  setup() {
    function showNotification() {
      const globalId = createDefaultSimpleNotification(
        {
          title: "Greeting",
          content: "Welcome to our app!",
          class: "my-custom-class"
        },
        {
          duration: 10000,
          onClose: (mode: "auto" | "click" | "action") => {
            console.log(`notification closed by ${mode} mode`);
          }
        }
      );
      console.log(`new notification by globalId: ${notificationId} created!`);
    }

    return { showNotification };
  }
});
```

### Custom Notifications

To create custom notification you need define a normal vue component with notification library composition api helpers `useNotification` and create notification instance using `createNotification` function.

**Note:** by default every notification received `globalId` and `options` props. you must define this props in your components and use it to define new notification component.

**Note:** you can define any props in your custom notification component and pass this props when you want create new notification.

#### useNotification Parameters

**Caution:** if root element not passed notification animations doesn't work!

| Parameter | Type                  | Description                                             |
| :-------- | :-------------------- | :------------------------------------------------------ |
| globalId  | `string`              | global notification id (Automatically passed on create) |
| options   | `NotificationOptions` | notification options (Automatically passed on create)   |
| el        | `Ref<HTMLElement>`    | notification root node reference                        |

#### useNotification Return Values

| Name     | Type                                    | Description                                                         |
| :------- | :-------------------------------------- | :------------------------------------------------------------------ |
| progress | `number`                                | current progress value (when auto closed enabled)                   |
| loading  | `boolean`                               | on action, loading state will active until action promise completed |
| action   | `(key: string, data?: unknown) => void` | helper method to call notification action handler                   |
| close    | `() => void`                            | close notification                                                  |
| pause    | `() => void`                            | active pause mode                                                   |
| resume   | `() => void`                            | de-active pause mode                                                |

```vue
<template>
  <div
    class="v-notification"
    @mouseenter="pause"
    @mouseleave="resume"
    ref="container"
  >
    <div class="v-notification-content">
      <p>{{ message }}</p>
      <div v-if="loading">
        Loading...
      </div>
      <p>{{ progress }} <strong>%</strong></p>
      <div class="grid">
        <div class="column"></div>
        <div class="column is-fit">
          <span
            class="v-notification-action"
            @click.stop="action('no', 'data')"
            >{{ noText || "no" }}</span
          >
          <button
            class="v-notification-action is-default"
            :class="{ 'is-disabled': loading }"
            @click.stop="action('yes')"
          >
            {{ yesText || "yes" }}
          </button>
        </div>
      </div>
    </div>
    <div
      class="v-notification-progress"
      :style="{ width: `${progress}%` }"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { NotificationOptions, useNotification } from "@bardoui/vnotif";
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
    message: String,
    yesText: String,
    noText: String
  },
  setup(props) {
    const container = ref<HTMLElement>(); // template ref
    const { progress, loading, action, close, pause, resume } = useNotification(
      props.globalId,
      props.options,
      container
    );

    return { progress, loading, action, close, pause, resume, container };
  }
});
</script>
```

#### Use Custom Notification

`createNotification` method parameters:

**Note:** when using `createDefaultNotification` method, container parameters not exists.

| Parameter | Type                  | Description          |
| :-------- | :-------------------- | :------------------- |
| container | `string`              | container name       |
| com       | `Object`              | component            |
| props     | `Object`              | component props      |
| options   | `NotificationOptions` | notification options |

**Note:** createNotification return new notification global id as result.

```typescript
import { defineComponent } from "vue";
import { createDefaultNotification } from "@bardoui/vnotif";
import MyNotification from "./MyNotification.vue";
export default defineComponent({
  setup() {
    const showNotification = () => {
      createDefaultNotification(
        MyNotification,
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
              const res = await doSomeLongAsyncWork();
              return res ? Promise.resolve(true) : Promise.resolve(false);
            }
          }
        }
      );
    };

    return { showNotification };
  }
});
```

## Styling

for using default styles you must import `style.css` in your app.

```vue
<template>
  <notification />
</template>
<style>
@import "@bardoui/vnotif/dist/style.css";
</style>
```

### Container Styles

| Class            | Description                                                                                           |
| :--------------- | :---------------------------------------------------------------------------------------------------- |
| is-sub           | add this class to container when use container inside some part of ui (for no top-level containers) |
| is-left-top      | position container in top left                                                                        |
| is-right-top     | position container in top right                                                                       |
| is-center-top    | position container in top center                                                                      |
| is-left-bottom   | position container in bottom left                                                                     |
| is-right-bottom  | position container in bottom right                                                                    |
| is-center-bottom | position container in bottom center                                                                   |

**Note:** Parent node of sub containers must have `position: relative;` style!

### Customize Styling

notification plugin use [Termeh](https://www.npmjs.com/package/@bardoui/termeh) for advanced styling. if you use **termeh** in your project you can import `@bardoui/vnotif/dist/style.scss` in your _termeh_ root file and use custom styling.

```scss
// Termeh root file
// ... Other styles
@import "@bardoui/vnotif/dist/style.scss";
```

For overriding default style you must use `set-var('v-notif', $VAR)`. Following vars are used for styling notification plugin:

| Var                 | Description                                                            | Default                  |
| :------------------ | :--------------------------------------------------------------------- | :----------------------- |
| `container-width`   | container width                                                        | `20rem`                  |
| `container-padding` | container padding                                                      | `1rem`                   |
| `container-z-index` | container z-index (by default `.layout` class of termeh has 0 z-index) | `2`                      |
| `background`        | background                                                             | `get-color('container')` |
| `border-width`      | left or right (based on direction) border width of notification         | `3px`                    |
| `padding`           | padding                                                                | `1rem`                   |
| `shadow`            | box-shadow                                                             | a simple shadow          |
| `progress-size`     | progress bar size                                                      | `1px`                    |

**Note:** by default you can use all defined iterable colors with `is-` prefix for coloring notification. e.g: `is-primary`, `is-success`

you can override box-shadow of colored notification by defining `shadow-{iterable color}`. e.g:

```scss
@include set-var(
  "v-notif",
  "shadow-error",
  rgba(palette("error", "900"), 0.05) 0px 0.25em 1em
);
@import "@bardoui/vnotif/dist/style.scss";
```

**Note:** When using **Termeh** you can add `v-notification-action` class to action buttons. also you can add `is-default` class to your action and style action as default action. actions also support disable state with `disable` attribute or `is-disabled` class.
