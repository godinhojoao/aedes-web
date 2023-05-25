import "./styles.scss";
import CatchMosquitoPng from "./../../../assets/catch-mosquito.png";

const ErrorContent = (): JSX.Element => {
  return <div className="error">Houve um erro inesperado <img src={CatchMosquitoPng} alt="Mosquito da dengue capturado" /></div>;
};

export { ErrorContent };
