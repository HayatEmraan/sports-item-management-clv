import React from "react";
import { Button, Result } from "antd";


const NotFound: React.FC = () => (
  <>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button href="/" type="primary">
            Back Home
          </Button>
        }
      />
    </div>
  </>
);

export default NotFound;
