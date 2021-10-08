import { Layout } from "antd";

const { Content, Header, Footer } = Layout;

//HOC component to house code around a Layout
export default function LayoutContainer(props) {
  return (
    <Layout>
      <Header className="header">
        <div className="logo">Epic! React Coding Challenge</div>
      </Header>
      <Content>{props.children}</Content>
      <Footer style={{ textAlign: "right" }}>
        ©2021 Created by Paul Laudun
      </Footer>
    </Layout>
  );
}
