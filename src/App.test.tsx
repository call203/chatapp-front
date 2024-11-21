import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("renders login page", () => {
  render(
    <MemoryRouter initialEntries={["/login"]}>
      {" "}
      {/* 테스트 경로 설정 */}
      <App />
    </MemoryRouter>
  );

  // LoginPage의 내용이 제대로 렌더링되었는지 확인
  expect(screen.getByText(/login/i)).toBeInTheDocument();
});
