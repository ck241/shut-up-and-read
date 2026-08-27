const FullLayout = ({children, header, subheader}: {children: React.ReactNode; header: string; subheader: string}): React.JSX.Element => {
  return (
    <div className="flex grow flex-col justify-center items-center from-cyan-950/95 via-cyan-900/90 to-red-950/80 bg-linear-to-br">
      <div className="flex px-10 items-center w-full max-w-5xl flex-col gap-5">
        <div className="mx-auto w-full max-w-2xl text-center">
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.22em] text-sky-300">{subheader}</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">{header}</h1>
        </div>
        {children}
      </div>
    </div>
  );
};

export default FullLayout;
