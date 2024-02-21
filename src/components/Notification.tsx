import { createApp, ref, defineComponent, h, App } from 'vue'

interface NotificationProps {
  message: string;
  onClose?: Function;
}

const NotificationComponent = defineComponent({
  props: {
    message: {
      type: String,
      required: true,
    },
    onClose: Function
  },
  setup(props: NotificationProps) {
    return () => (
      <div class="custom-notification">
        { props.message }
        <div class="close-btn" onClick={ props.onClose }>关闭</div>
      </div>
    );
  },
});

let notificationApp: App;

export const notify = (message: string) => {
    const notificationContainer = document.createElement('div');
    notificationContainer.className = 'custom-notification-wrp'
    document.body.appendChild(notificationContainer);
  
    const notificationRef = ref<HTMLElement | null>(null);
  
    const onClose = () => {
      if (notificationRef.value) {
        // @ts-ignore
        notificationApp.unmount(notificationRef.value);
        document.body.removeChild(notificationContainer);
      }
    };
  
    notificationApp = createApp({
      render: () => {
        const ret = h(NotificationComponent, { message, onClose })
        notificationRef.value = ret as any
        return ret
      }
    });
  
    notificationApp.mount(notificationContainer);
  
    setTimeout(() => { onClose() }, 3000)
};
  
export const NotificationPlugin = {
    install(app: App) {
        app.component('Notification', NotificationComponent);
        app.config.globalProperties.$notify = notify;
    },
};