import "../assets/tailwind.css";

const ButtonComponent = ({
  label,
  action,
  image,
  buttonClass,
  ImgClass,
  textStyles,
}: any) => {
  return (
    <button
      onClick={action}
      className={`${buttonClass} flex items-center`}
    >
      <img src={image} className={ImgClass} />
      <p className={textStyles}>{label}</p>
    </button>
  );
};

export default ButtonComponent;
