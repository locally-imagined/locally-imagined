import styles from "../../styles";

const SliderDot = (props) => {
  const classes = styles();
  return (
    <div className={classes.sliderDotBox}>
      {props.images.length > 0 &&
        props.images.map((_, index) => {
          return (
            <span
              className={classes.sliderDot}
              key={index}
              color={props.color}
              style={index === props.offset ? props.currSlideStyle : {}}
            >
              ⬤
            </span>
          );
        })}
    </div>
  );
};
export default SliderDot;
