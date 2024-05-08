import { Link } from "react-router-dom";

const enum Styles {
  Logo = "self-center text-2xl font-semibold whitespace-nowrap",
  Link = "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0",
  LinkList = "font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8",
  Background = "max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4",
}
const Navbar = () => {
  return (
    <nav>
      <div className={Styles.Background}>
        <a href="#" className={Styles.Logo}>
          Chat App
        </a>
        <ul className={Styles.LinkList}>
          <li>
            <Link className={Styles.Link} to="/signup">
              Sign up
            </Link>
          </li>
          <li>
            <Link className={Styles.Link} to="/login">
              Sign in
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
