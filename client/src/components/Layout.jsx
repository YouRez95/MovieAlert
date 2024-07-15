export default function Layout({ children, ...props }) {
  const { classes } = props;
  return <div className={`container m-auto h-full ${classes}`}>{children}</div>;
}
