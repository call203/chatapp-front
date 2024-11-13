import { FC } from "react";
import { MainButton } from "../MainButton";
import { CreateConversationParams } from "../../utils/types";
import { useForm } from "react-hook-form";
import useConversationStore from "../../store/conversationStore";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { postNewConversation } from "../../utils/apis/apis";

type Props = {
  onClose: () => void;
};
export const CreateConversationForm: FC<Props> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateConversationParams>({});
  const { addConversation } = useConversationStore();
  const navigate = useNavigate();
  const { mutate: mutateNewConversation } = useMutation(postNewConversation, {
    onSuccess: (response) => {
      addConversation(response.data);
      onClose();
      navigate(`/conversations/${response?.data.id}`);
    },
    onError: (err) => {
      console.log(err);
    }
  });

  const onSubmit = (data: CreateConversationParams) => {
    mutateNewConversation(data);
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
      </section>

      <MainButton>Create Conversation</MainButton>
    </form>
  );
};
