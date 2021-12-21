import { defineComponent } from "vue";
const testComponent = defineComponent({
  props: {
    text: {
      type: String,
      default: "Hello World",
    },
  },
  setup(props) {
    return () => <div>{props.text}</div>;
  },
});

export default testComponent;
