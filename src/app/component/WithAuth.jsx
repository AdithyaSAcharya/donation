import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const username = localStorage.getItem("username");
      const expiry = localStorage.getItem("loginExpiry");

      if (username && expiry && new Date(expiry) > new Date()) {
        setIsAuthenticated(true);
      } else {
        router.replace("/");
      }
    }, [router]);

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
