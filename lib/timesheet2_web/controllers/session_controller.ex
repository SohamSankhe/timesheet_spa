defmodule Timesheet2Web.SessionController do
  use Timesheet2Web, :controller

  # Ref: http://www.ccs.neu.edu/home/ntuck/courses/2019/09/cs5610/notes/17-spa-users/notes.html

  action_fallback Timesheet2Web.FallbackController

  alias Timesheet2.Users

  def create(conn, %{"email" => email, "password" => password}) do
    user = Users.authenticate_user(email, password)
    if user do
      token = Phoenix.Token.sign(conn, "session", user.id)
      resp = %{token: token, user_id: user.id, user_name: user.name, is_manager: user.is_manager}
      conn
      |> put_resp_header("content-type", "application/json; charset=UTF-8")
      |> send_resp(:created, Jason.encode!(resp))
    else
      resp = %{errors: ["Authentication Failed"]}
      conn
      |> put_resp_header("content-type", "application/json; charset=UTF-8")
      |> send_resp(:unauthorized, Jason.encode!(resp))
    end
  end
end
