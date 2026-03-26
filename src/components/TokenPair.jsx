
const TokenPair = ({ token0, token1, icon0, icon1, size = 14 }) => (
  <div className="flex items-center gap-2">
    <div className="flex items-center">
      <span style={{ fontSize: size + 4 }}>{icon0}</span>
      <span style={{ fontSize: size + 4, marginLeft: -4 }}>{icon1}</span>
    </div>

    <span
      className="font-semibold tracking-[0.02em] text-foreground"
      style={{ fontSize: size }}
    >
      {token0} <span className="text-muted-foreground">/</span> {token1}
    </span>
  </div>
);

export default TokenPair;
