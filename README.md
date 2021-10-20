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
    <div class="content">
      <p>{{ message }}</p>
      <div v-if="loading">
        Loading...
      </div>
      <p>{{ progress }} <strong>%</strong></p>
      <div class="actions">
        <span class="action" @click.stop="action('no', 'data')">{{
          noText || "no"
        }}</span>
        <button
          class="action is-default"
          :class="{ 'is-disabled': loading }"
          @click.stop="action('yes')"
        >
          {{ yesText || "yes" }}
        </button>
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

for using default styles you can use one of static (CSS) or termeh (SCSS) predefined files.

**Note**: advanced feature (change default vars, padding classes and color classes) only available in termeh version of style.

```SCSS
// Static
@import "@bardoui/vnotif/dist/style.css";
// Termeh
@import "@bardoui/vnotif/dist/style.scss";
```

### Container Styles

- **is-left-top**: position container to left top.
- **is-right-top**: position container to right top.
- **is-center-top**: position container to center top.
- **is-left-bottom**: position container to left bottom.
- **is-right-bottom**: position container to right bottom.
- **is-center-bottom**: position container to center bottom.
- **is-sub**: add this class to container when use container inside some part of ui (for non-fullscreen containers).

**Note:** Parent node of sub containers must have `position: relative;` style!

### Notification Styles

Notification by default can contains following parts:

- **content**: contains notification content (headers, actions, etc).
- **progress**: progress element.

**Note**: this elements must placed directly as child.

```html
<div class="v-notification">
  <div class="content">
    <h1>{{ header }}</h1>
    <p>{{ content }}</p>
    <div class="actions">
      <button class="action">Cancel</button>
      <button class="action is-default">Approve</button>
    </div>
  </div>
  <div class="progress"></div>
</div>
```

#### Notification Classes

You could style your custom component by `v-notification` class.

- **is-left-decorated**: add left decorated border to notification.
- **is-right-decorated**: add right decorated border to notification.
- **is-loading**: add loading ui to notification.
- **is-{gap}-gaped**: set notification gap (padding and spacing) to registered iterable gaps (Termeh only).
- **is-{color}**: set notification color scheme to registered iterable colors (Termeh only).

#### Content Styles

Notification content by default can contains following parts:

- **<h1> ... <h6>** or **header**: notification header.
- **actions**: container for notification actions.

#### Action Classes

to use pre-defined actions in your custom component you should define container with `actions` class and action buttons with `action` class inside your actions container.

- **action**: create a action button.
- **is-default**: default action button.
- **is-disabled**: disabled action button.

#### Customize Styling

You can override following pre-defined component variable to override default notification styling.

```scss
@include _var("notification", "width", 30rem);
@include _var("notification", "primary-border", (1px solid _color("primary")));
```

| Variable       | Description                                                   | Default       |
| :------------- | :------------------------------------------------------------ | :------------ |
| width          | notification container width                                  | `20rem`       |
| z-index        | notification container z-index                                | `2`           |
| border         | default notification border                                   | `none`        |
| shadow         | default notification shadow                                   | a soft shadow |
| progress       | notification progress size                                    | `1px`         |
| gaps           | list of non-iterable gaps to include in notification gaps     | `()`          |
| colors         | list of non-iterable colors to include in notification colors | `()`          |
| {color}-border | colored notification border                                   | `null`        |
| {color}-shadow | colored notification shadow                                   | `null`        |
