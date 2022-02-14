import { defineComponent } from "vue";
const testComponent = defineComponent({
  props: {
    text: {
      type: String,
      default: "Hello World",
    },
  },
  setup(props) {
    return () => (
      <div>
        <>
          <div>{props.text}</div>
          <div>{props.text}</div>
          <div>{props.text}</div>
        </>
        <>
          <div>{props.text}</div>
        </>
      </div>
    );
  },
});

export default testComponent;
