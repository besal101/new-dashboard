import Image from "next/image";
import * as React from "react";

interface ILoadingProps {}

const Loading: React.FunctionComponent<ILoadingProps> = (props) => {
  return (
    <div className="w-full h-screen flex justify-center items-center ">
      <Image src="/images/loading.gif" alt="loading" width="100" height="100" />
    </div>
  );
};

export default Loading;
