function Header({ lives, score }) {
  return (
    <div className="header">
      <div className="lives">Lives: {"❤".repeat(lives)}</div>
      <div className="score">Score: {score}</div>
    </div>
  );
}
export default Header;
