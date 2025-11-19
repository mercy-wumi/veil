export default function Hero() {
  return (
    <div className="hero">
      <div className="hero__brand-name">
        Ve<span>il</span>
      </div>
      <p className="hero__text">
        A decentralized, anonymous message <br />
        dApp built on <span>Solana</span>
      </p>
      <p className="hero__text hero__text--2">
        Share your link, receive messages privately, and stay completely
        pseudonymous.
      </p>
      <button className="button button--main">Try Now</button>
    </div>
  );
}
