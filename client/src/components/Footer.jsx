import { Link } from "react-router-dom";
import Layout from "./Layout";

export default function Footer({ classes }) {
  return (
    <footer className={`h-16 bg-secondary-color mt-20 ${classes}`}>
      <Layout classes="flex justify-between text-white items-center px-4 md:px-0">
        <div className="font-primary text-[9px] sm:text-[12px] md:text-base">
          <p>© 2024 MovieAlert. All Rights Reserved.</p>
        </div>

        <div className="flex gap-2 font-secondary text-[10px] sm:text-[12px] md:text-base">
          <Link
            to={"/contact"}
            className="text-white hover:text-[#FCA311] hover:scale-105"
          >
            Contact
          </Link>
          <Link
            to={"/about-us"}
            className="text-white hover:text-[#FCA311] hover:scale-105"
          >
            About Us
          </Link>
        </div>
      </Layout>
    </footer>
  );
}
