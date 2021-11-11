import './FooterComponent.css';

const FooterComponent = () => {
  return (
    <div>
      <div id="footer-link-container">
        <span>
          Created by: Ash Tucker{'   '}
          <a
            href="https://github.com/ashleighctucker"
            target="_blank"
            rel="noreferrer"
          >
            <i class="fab fa-github"></i>
          </a>
          {'   '}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.linkedin.com/in/ashleighctucker/"
          >
            <i class="fab fa-linkedin"></i>
          </a>
        </span>
      </div>
    </div>
  );
};

export default FooterComponent;
