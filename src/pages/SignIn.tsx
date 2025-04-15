import { SignIn } from "@clerk/clerk-react";
const Signup = () => {
  return (
    <div>
      <div className="grid h-screen grid-cols-2 ">
        <div className="col-span-1 hidden flex-col justify-between bg-blueVar p-8 text-black lg:flex">
          <div className="flex items-center text-3xl font-black text-white">Doc-in</div>
          <blockquote className="space-y-2">
            <p className="text-lg font-medium text-white">
              With great power comes great responsibility
            </p>
            <footer className="text-sm text-white">Uncle Ben</footer>
          </blockquote>
        </div>
        <div className="col-span-2 bg-white flex flex-col justify-center items-center p-8 lg:col-span-1">
          <div className="flex justify-center items-center">
            <SignIn forceRedirectUrl="/post-auth-redirect"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
