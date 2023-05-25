import "./styles.scss";
import GithubSvg from "./../../../assets/github.svg";
import LinkedinSvg from "./../../../assets/linkedin.svg";

const Footer = (): JSX.Element => {
  return (
    <footer className="footer">
      <div className="footer__alert">
        <span>© Todos os Diretos Reservados - João Godinho.</span>
      </div>
      <nav className="footer__social">
        <ul>
          <li>
            <a target="_blank" href="https://github.com/godinhojoao" rel="noreferrer"><img src={GithubSvg} /></a>
          </li>
          <li>
            <a target="_blank" href="https://www.linkedin.com/in/jo%C3%A3o-godinho/" rel="noreferrer"><img src={LinkedinSvg} /></a>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export { Footer };
