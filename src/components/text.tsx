import { defineComponent } from "vue";
import "./text.scss";
const TestComponent = defineComponent({
  props: {
    text: {
      type: String,
      default: "Hello World",
    },
    number: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    let number = props.number;
    number++;
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
        <>
          <div class="title">递归子组件</div>
          {number < 2 ? (
            <TestComponent number={number} text="递归子组件内容" />
          ) : null}
        </>
      </div>
    );
  },
});

export default TestComponent;
