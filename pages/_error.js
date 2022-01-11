function Error({ statusCode }) {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : "An error occurred on client"}
    </p>
  );
}

export const getServerSideProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  //   return { statusCode };
  return {
    redirect: {
      permanent: false,
      destination: "/pagenotfound",
    },
  };
};

export default Error;
