import styles from "../../styles";
import "./SliderDot.css";
/**
 * SliderDot
 * @return {object} JSX
 */
const SliderDot = (props) => {
  const classes = styles();
  return (
    <div className="sliderDot-box">
      {props.images.length > 0 &&
        props.images.map((_, index) => {
          return (
            <span
              className="sliderDot"
              key={index}
              style={
                index === props.offset
                  ? props.currSlideStyle
                  : {
                      color: props.color,
                    }
              }
            >
              ⬤
            </span>
          );
        })}
    </div>
  );
};
export default SliderDot;
