import * as React from "react";
import { NextPage } from "next";
import Link from "next/link";

const Dashboard: NextPage = (props) => {
  return (
    <div>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link href="/" className="text-primary hover:underline">
            Dashboard
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>Sales</span>
        </li>
      </ul>
    </div>
  );
};

export default Dashboard;
