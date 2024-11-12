import defaultImg from "../../Assets/DefaultProfile.png";
import closeImg from "../../Assets/Close.png";
import editImg from "../../Assets/Pencil.png";
import { format } from "date-fns";
import {
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
  MouseEvent
} from "react";
import { AuthContext } from "../../utils/context/AuthContext";
import { useToast } from "../../utils/hooks/useToast";
import { MainButton } from "../MainButton";
import { patchUpdateProfile } from "../../utils/apis/apis";
import { User } from "../../utils/types";

import useProfileStore from "../../store/ProfileStore";

export const ProfileContainer = () => {
  const { updateAuthUser } = useContext(AuthContext);
  const [active, setActive] = useState<Boolean>(true);
  const [image, setImage] = useState<string>(defaultImg);
  const [about, setAbout] = useState<string>("");
  const { success, showError } = useToast();
  const [change, setChange] = useState(false);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [changedFile, setChangedFile] = useState<File | null>(null);
  const profile = useProfileStore((state) => state);

  useEffect(() => {
    if (profile.info?.profile) {
      setImage(profile.info?.profile.image);
      setAbout(profile.info?.profile.about);
    }

    const handleFocus = () => {
      setActive(true);
    };
    const handleBlur = () => {
      setActive(false);
      // socket.emit('offline')
    };

    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const changeImage = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileUploaded = event.target.files?.[0];
    setChange(true);
    if (!fileUploaded) return;

    if (fileUploaded.size > 1000000) {
      alert("File size should be less than 1MB");
      return;
    }

    if (!fileUploaded.type.includes("image")) {
      alert("Only image files are allowed");
      return;
    }

    if (!event.target.files) {
      return;
    }
    setChangedFile(fileUploaded);
    const fileReader = new FileReader();
    fileReader.addEventListener("load", () => {
      setImage(fileReader?.result as string);
    });
    if (fileUploaded) {
      fileReader.readAsDataURL(fileUploaded);
    }
  };

  const handleSubmit = async (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!change) return;
    const formData = new FormData();
    if (changedFile) {
      formData.append("file", changedFile);
    }

    formData.append("about", about);

    patchUpdateProfile(formData)
      .then((res: { data: User }) => {
        if (res?.data) {
          updateAuthUser(res.data);
          success("Saved!");
          setChange(false);
        }
      })
      .catch(() => {
        showError("Try agin :(");
      });
  };

  /**** 프로필 저장하고 화면 리프레시 해야만 바뀐 &&& About me */
  return (
    <div className="h-full absolute right-0 z-10 bg-background_dark2 w-full md:w-6/12 lg:w-4/12 ">
      <div className="p-5 ">
        <div className="flex flex-row justify-between">
          <div className=" font-bold pb-8" style={{ fontSize: 20 }}>
            Profile
          </div>
          <img
            src={closeImg}
            className="w-7 h-7"
            onClick={() => profile.toggleProfile()}
          />
        </div>

        <div className="flex justify-center pb-8">
          <div className="relative">
            <img
              src={image ? image : defaultImg}
              className="w-56 h-56 rounded-full"
            />
            <div className="absolute right-5 bottom-1 right-8bg-my_blue p-2 rounded-full bg-my_blue">
              <img
                src={editImg}
                className="w-6 h-6"
                onClick={changeImage}
                style={{ cursor: "pointer" }}
              />
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={imageRef}
                onChange={handleChange}
                className="bg-slate-200"
              />
            </div>
          </div>
        </div>
        <div className="pb-8">
          <div className=" flex flex-row items-center pb-5">
            <p className="font-semibold mr-2">Active</p>

            <p
              className={`h-2.5 w-2.5 ${
                active ? "bg-green-300" : "bg-gray-200"
              } rounded-full`}
            ></p>
          </div>
          <div className="pb-5">
            <p className="font-semibold mb-2">Local time</p>
            <p>{format(new Date(), "yyyy-MM-dd HH:mm")}</p>
          </div>
          <div className="pb-5">
            <div className="flex flex-row ">
              <div className="text-6xl font-bold mr-5 mb-2">About me</div>
              <img src={editImg} className="w-5 h-5" />
            </div>
            <input
              className="bg-inherit text-white w-full text-base"
              style={{ border: "none", outline: "none" }}
              defaultValue={profile.info?.profile.about}
              onChange={(e) => {
                setAbout(e.target.value);
                if (e.target.value !== profile.info?.profile.about) {
                  setChange(true);
                } else setChange(false);
              }}
            />
          </div>
        </div>
        <div>
          <div className="py-6" onClick={handleSubmit}>
            <MainButton className={`${change ? "bg-my_blue" : "bg-gray-300"} `}>
              Save change
            </MainButton>
          </div>
        </div>
      </div>
    </div>
  );
};
