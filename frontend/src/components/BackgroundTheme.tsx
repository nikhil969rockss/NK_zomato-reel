const BackgroundTheme = () => {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-red-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(249,115,22,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(239,68,68,0.06),transparent_50%)]" />
    </>
  );
};

export default BackgroundTheme;
