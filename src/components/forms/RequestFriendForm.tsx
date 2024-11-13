import { FC } from "react";
import { MainButton } from "../MainButton";
import { useForm } from "react-hook-form";
import {
  CreateConversationParams,
  RequestFriendParams
} from "../../utils/types";
import { ErrorMessage } from "@hookform/error-message";
import { useToast } from "../../utils/hooks/useToast";
import { useMutation } from "react-query";
import { postRequestFriend } from "../../utils/apis/apis";
import useFriendStore from "../../store/friendStore";

type Props = {
  onClose: () => void;
};
export const RequestFriendForm: FC<Props> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateConversationParams>({});
  const { success, showError } = useToast();
  const { addFriendRequest } = useFriendStore();
  const { mutate: createFriendRequestMutate } = useMutation(postRequestFriend, {
    onSuccess: (res) => {
      addFriendRequest(res);
      success("send!");
      onClose();
    },
    onError: (err) => {
      const errorMsg = err as string;
      showError(errorMsg);
    }
  });

  const onSubmit = async (data: RequestFriendParams) => {
    createFriendRequestMutate(data);
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <section>
        <div className="bg-b_131313 rounded-md py-4 px-5 mb-2">
          <div className="text-xsm mb-1 text-gray-200">Email</div>
          <input
            className="bg-inherit text-white text-sm w-full"
            style={{ border: "none", outline: "none" }}
            {...register("email", { required: "Email is required" })}
          />
        </div>
        <div className="pb-5 text-my_orange">
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => <p>{message}</p>}
          />
        </div>
      </section>
      <MainButton>Send</MainButton>
    </form>
  );
};
