const enum Styles {
  Button = "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full w-auto px-5 py-2.5 text-center",
}

interface Props {
  children: string;
}

const Button = ({ children }: Props) => {
  return (
    <button type="submit" className={Styles.Button}>
      {children}
    </button>
  );
};

export default Button;
