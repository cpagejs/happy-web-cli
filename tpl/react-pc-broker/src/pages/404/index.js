import React from "react";
import { Result } from "antd";

function useErrorPage(props) {
  const {
    status = "404",
    errTitle = "404",
    subTitle = "Sorry, the page you visited does not exist.",
  } = props;

  return { status, errTitle, subTitle };
}

function ErrorPage(props) {
  const { status, errTitle, subTitle } = useErrorPage(props);
  return (
    <Result
      status={status}
      title={errTitle}
      subTitle={subTitle}
    />
  );
}

export default ErrorPage;
