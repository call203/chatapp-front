import { FC, PropsWithChildren } from "react";

interface MainButtonProps extends PropsWithChildren {
  className?: string;
  backgroundColor?: string;
  disabled?: boolean;
}

export const MainButton: FC<MainButtonProps> = ({
  children,
  className,
  backgroundColor,
  disabled
}) => {
  return (
    <>
      <button
        type="submit"
        className={`py-3 text-center bg-my_blue w-full text-lg rounded-md font-semibold ${className}`}
        disabled={disabled}
        style={{ backgroundColor: backgroundColor }}
      >
        {children}
      </button>
    </>
  );
};
