// components/PostAuthRedirect.tsx
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const PostAuthRedirect = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoaded) return;

    const created = new Date(user.createdAt);
    const updated = new Date(user.updatedAt);
    const isNewUser = Math.abs(updated.getTime() - created.getTime()) < 5000;

    if (isNewUser) {
      navigate("/select-role"); // Redirect to form for new users
    } else {
      navigate("/"); // Or wherever your normal landing is
    }
  }, [isLoaded, user, navigate]);

  return null;
};

export default PostAuthRedirect;
