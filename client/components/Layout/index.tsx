import React from "react";

import Header from "@components/Header";

interface LayoutProps {
  children: JSX.Element;
}

const Layout = (props: LayoutProps) => {
  const { children } = props;
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default Layout;
