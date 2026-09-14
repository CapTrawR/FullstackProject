import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router";

function PublicRoute({ children }: { children: ReactNode }) {
  const [isChecking, setIsChecking] = useState(true);
  const navigate = useNavigate();
  const cookie = document.cookie;

  useEffect(() => {
    if (cookie) {
      const cookies = cookie.split("; ");
      const userCookies = cookies.find((c) => c.startsWith("user="));

      if (userCookies) {
        navigate("/", { replace: true });
        return;
      }
    }
    setIsChecking(false);
  }, [navigate]);

  if (isChecking) {
    return <p>A Carregar</p>;
  }

  return <div>{children}</div>;
}

export default PublicRoute;
