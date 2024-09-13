import { Button } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type TLoginData = {
  id: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { register, handleSubmit } = useForm<TLoginData>({
    defaultValues: {
      id: "A-0001",
      password: "admin1234",
    },
  });

  const [login] = useLoginMutation();

  const onSubmit: SubmitHandler<TLoginData> = async (data) => {

    const toastId = toast.loading('Loggin in');

    try {
      const userInfo = {
        id: data.id,
        password: data.password,
      };
  
      const res = await login(userInfo).unwrap();
  
      const token = res.data.accessToken
      const user = verifyToken(token) as TUser;
  
      dispatch(setUser({ user: user, token: token }));
      toast.success('Logged in successfully', { id: toastId, duration: 2000 });
      navigate(`/${user.role}/dashboard`);
    } catch (err) {
      console.log(err);
      
      toast.error("Something went wrong!", { id: toastId, duration: 2000 });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="id">ID: </label>
        <input type="text" id="id" {...register("id")} />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input type="text" id="password" {...register("password")} />
      </div>
      <Button htmlType="submit">Login</Button>
    </form>
  );
};

export default Login;
